import { useState } from 'react'
import { useCart } from '../context/AppContext'
import { useAuth } from '../context/AppContext'
import { useUI } from '../context/AppContext'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const WA = import.meta.env.VITE_WA_NUMBER || '917987239233'

export default function CheckoutModal() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { checkoutOpen, closeCheckout, showToast } = useUI()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [locSuggestions, setLocSuggestions] = useState([])
  const [locTimer, setLocTimer] = useState(null)

  const [form, setForm] = useState({
    name:    user?.displayName || '',
    phone:   '',
    email:   user?.email || '',
    address: '',
    city:    'Maheshwar',
    pincode: '',
    state:   'Madhya Pradesh',
    locSearch: '',
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const delivery = cartTotal >= 1999 ? 0 : 50
  const grand    = cartTotal + delivery

  /* ── Location search via Nominatim (free, no API key) ── */
  const searchLoc = async val => {
    set('locSearch', val)
    if (locTimer) clearTimeout(locTimer)
    if (val.length < 3) { setLocSuggestions([]); return }
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val + ', India')}&limit=5&addressdetails=1`)
        const data = await r.json()
        setLocSuggestions(data)
      } catch { setLocSuggestions([]) }
    }, 420)
    setLocTimer(t)
  }

  const pickLoc = d => {
    const addr = d.display_name
    const city = d.address?.city || d.address?.town || d.address?.village || ''
    const pin  = d.address?.postcode || ''
    setForm(p => ({ ...p, address: addr.slice(0, 80), city, pincode: pin, locSearch: addr.slice(0, 60) }))
    setLocSuggestions([])
  }

  /* ── Step 1 → 2 ── */
  const next1 = () => {
    if (!form.name.trim() || !form.phone.trim()) { setErr('Name and phone are required'); return }
    setErr(''); setStep(2)
  }

  /* ── Step 2 → 3 ── */
  const next2 = () => {
    if (!form.address.trim() || !form.city.trim() || !form.pincode.trim()) { setErr('Please complete your address'); return }
    setErr(''); setStep(3)
  }

  /* ── Place order via Firestore ── */
  const placeOrder = async () => {
    setLoading(true)
    const orderData = {
      customer: { name: form.name, phone: form.phone, email: form.email },
      delivery:  { address: form.address, city: form.city, pincode: form.pincode, state: form.state },
      items:     cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      subtotal:  cartTotal,
      delivery_charge: delivery,
      total:     grand,
      status:    'pending',
      uid:       user?.uid || 'guest',
      createdAt: serverTimestamp(),
    }
    try {
      await addDoc(collection(db, 'orders'), orderData)
      clearCart()
      closeCheckout()
      showToast('Order placed! 🎉 We will contact you shortly.')
    } catch {
      /* Firebase not configured — fallback to WA */
      sendViaWA()
    }
    setLoading(false)
  }

  /* ── WhatsApp fallback ── */
  const sendViaWA = () => {
    const lines = cart.map(i => `• ${i.name} x${i.qty} — ₹${(i.price * i.qty).toFixed(0)}`).join('\n')
    const msg = encodeURIComponent(
      `🛍️ *New Order — Aditya Dryfruits*\n\n*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}, ${form.city} — ${form.pincode}\n\n*Items:*\n${lines}\n\n*Delivery:* ₹${delivery}\n*Grand Total: ₹${grand.toFixed(2)}*`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
    clearCart()
    closeCheckout()
    showToast('Order sent via WhatsApp! 🎉')
  }

  const handleClose = () => { closeCheckout(); setStep(1); setErr('') }

  if (!checkoutOpen) return null

  const StepBar = () => (
    <div className="step-bar">
      {['Details', 'Delivery', 'Confirm'].map((s, i) => (
        <div key={i} className={`step-item ${step === i+1 ? 'active' : step > i+1 ? 'done' : ''}`}>
          {step > i+1 ? '✓ ' : `${i+1}. `}{s}
        </div>
      ))}
    </div>
  )

  const OrderSummary = () => (
    <>
      <div className="order-items-box">
        {cart.map(i => (
          <div className="oi-row" key={i.id}>
            <span>{i.name} ×{i.qty}</span>
            <strong>₹{(i.price * i.qty).toFixed(0)}</strong>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <div className="os-row"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
        <div className="os-row"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
        <div className="os-row total"><span>Grand Total</span><span>₹{grand.toFixed(2)}</span></div>
      </div>
    </>
  )

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal checkout-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>
        <StepBar />

        {err && <div className="modal-msg err">{err}</div>}

        {/* ── STEP 1: Contact ── */}
        {step === 1 && (
          <>
            <div className="modal-title">Contact Details</div>
            <OrderSummary />
            <div className="inp-group">
              <label className="inp-label">Full Name *</label>
              <input className="inp" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Phone *</label>
              <input className="inp" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Email</label>
              <input className="inp" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <button className="btn-full" onClick={next1}>Continue to Delivery →</button>
          </>
        )}

        {/* ── STEP 2: Delivery ── */}
        {step === 2 && (
          <>
            <div className="modal-title">Delivery Address</div>
            <div className="inp-group">
              <label className="inp-label">Search Location</label>
              <div className="loc-wrap">
                <input
                  className="inp"
                  value={form.locSearch}
                  onChange={e => searchLoc(e.target.value)}
                  placeholder="Type your address…"
                />
                {locSuggestions.length > 0 && (
                  <div className="loc-suggestions">
                    {locSuggestions.map((d, i) => (
                      <div key={i} className="loc-opt" onClick={() => pickLoc(d)}>
                        📍 {d.display_name.slice(0, 72)}{d.display_name.length > 72 ? '…' : ''}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="inp-group">
              <label className="inp-label">Full Address *</label>
              <input className="inp" value={form.address} onChange={e => set('address', e.target.value)} placeholder="House No., Street, Area" />
            </div>
            <div className="two-col">
              <div className="inp-group">
                <label className="inp-label">City *</label>
                <input className="inp" value={form.city} onChange={e => set('city', e.target.value)} />
              </div>
              <div className="inp-group">
                <label className="inp-label">Pincode *</label>
                <input className="inp" value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="451224" />
              </div>
            </div>
            <div className="inp-group">
              <label className="inp-label">State</label>
              <input className="inp" value={form.state} onChange={e => set('state', e.target.value)} />
            </div>
            <button className="btn-full" onClick={next2}>Review Order →</button>
            <button onClick={() => setStep(1)} style={{ width: '100%', padding: '10px', fontWeight: 600, fontSize: '.82rem', color: 'var(--gray5)', marginTop: 6 }}>← Back</button>
          </>
        )}

        {/* ── STEP 3: Confirm ── */}
        {step === 3 && (
          <>
            <div className="modal-title">Confirm Order</div>
            <div style={{ background: 'var(--gray1)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray4)', marginBottom: 8 }}>Delivering To</div>
              <div style={{ fontWeight: 700, fontSize: '.88rem' }}>{form.name}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--gray5)', marginTop: 3 }}>{form.address}, {form.city} — {form.pincode}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--gray5)' }}>📞 {form.phone}</div>
            </div>
            <OrderSummary />
            <button className="btn-full" onClick={placeOrder} disabled={loading}
              style={{ background: 'var(--black)', marginBottom: 9 }}>
              {loading ? 'Placing…' : '✅ Place Order'}
            </button>
            <button className="btn-full" onClick={sendViaWA}
              style={{ background: 'var(--wa)', marginBottom: 9 }}>
              💬 Order via WhatsApp
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '10px', fontWeight: 600, fontSize: '.82rem', color: 'var(--gray5)' }}>← Back</button>
          </>
        )}
      </div>
    </div>
  )
}
