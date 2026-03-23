import { useCart } from '../context/AppContext'
import { useUI } from '../context/AppContext'

const WA = import.meta.env.VITE_WA_NUMBER || '917987239233'

export default function CartDrawer() {
  const { cart, removeItem, changeQty, cartTotal, cartCount } = useCart()
  const { cartOpen, closeCart, openCheckout } = useUI()

  const freeShipLeft = 1999 - cartTotal
  const grandTotal   = cartTotal + (cartTotal >= 1999 ? 0 : 50)

  const waMessage = () => {
    const items = cart.map(i => `${i.name} x${i.qty} — ₹${(i.price * i.qty).toFixed(0)}`).join('\n')
    return encodeURIComponent(`Hello Aditya Dryfruits! 🙏\n\nMy Order:\n${items}\n\nTotal: ₹${grandTotal.toFixed(2)}\n\nPlease confirm!`)
  }

  return (
    <>
      <div className={`drawer-bg ${cartOpen ? 'open' : ''}`} onClick={closeCart} />

      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="drawer-hd">
          <span className="drawer-title">Your Cart ({cartCount} items)</span>
          <button className="drawer-close" onClick={closeCart}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🛒</div>
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '.8rem', color: 'var(--gray4)', marginTop: 4 }}>Add some products to get started!</p>
              <button onClick={closeCart}>Continue Shopping</button>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img className="ci-img" src={item.img} alt={item.name} onError={e => e.target.src = item.fallback} />
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{item.price.toFixed(2)} INR</div>
                  <div className="ci-qty">
                    <button onClick={() => changeQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                  <div className="ci-remove" onClick={() => removeItem(item.id)}>Remove</div>
                </div>
                <div className="ci-line-total">₹{(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-ft">
            <div className="cart-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-row">
              <span>Delivery</span>
              <span>{cartTotal >= 1999 ? 'FREE' : '₹50'}</span>
            </div>
            <div className="cart-row" style={{ fontWeight: 700, fontSize: '.9rem' }}>
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="cart-free-ship" style={{ marginTop: 6, marginBottom: 14 }}>
              {freeShipLeft > 0
                ? `Add ₹${freeShipLeft.toFixed(0)} more for FREE shipping!`
                : '✅ You qualify for FREE shipping!'}
            </div>
            <button className="checkout-btn" onClick={openCheckout}>Proceed to Checkout →</button>
            <a
              className="wa-order-btn"
              href={`https://wa.me/${WA}?text=${waMessage()}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  )
}
