import logoUrl from '../assets/logo.png'

const WA = import.meta.env.VITE_WA_NUMBER || '917987239233'
const IG = import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/aditya_dryfruits'

export default function Footer() {
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="site-footer" id="contact">
      <div className="foot-grid">
        {/* Brand */}
        <div>
          <div className="foot-logo-row">
            <img className="foot-logo" src={logoUrl} alt="Aditya Dryfruits" onError={e => e.target.style.display = 'none'} />
            <span className="foot-brand-name">ADITYA DRYFRUITS</span>
          </div>
          <p className="foot-desc">
            Premium dry fruits, nuts &amp; seeds from Maheshwar, Madhya Pradesh.
            Quality you can taste, freshness you can trust.
          </p>
          <div className="foot-socials">
            <a className="fsoc" href={IG} target="_blank" rel="noreferrer" title="Instagram">📸</a>
            <a className="fsoc" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" title="WhatsApp">💬</a>
            <a className="fsoc" href="#" title="Facebook">📘</a>
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <div className="foot-col-h">Popular Categories</div>
          <div className="foot-links">
            {['Nuts', 'Dry Fruits', 'Seeds', 'Makhana', 'Flavoured', 'Spices'].map(c => (
              <a key={c} href="#shop" onClick={e => { e.preventDefault(); scrollToShop() }}>{c}</a>
            ))}
          </div>
        </div>

        {/* Know Us */}
        <div>
          <div className="foot-col-h">Know Us</div>
          <div className="foot-links">
            <a href="#about">About Us</a>
            <a href={IG} target="_blank" rel="noreferrer">Instagram</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp Us</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="foot-col-h">Policies</div>
          <div className="foot-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Return Policy</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
          <div className="foot-contact" style={{ marginTop: 20 }}>
            <p>📍 Maheshwar, Madhya Pradesh</p>
            <p>📞 <a href="tel:+917987239233">+91 79872 39233</a></p>
            <p>🕐 Mon–Sat: 9 AM – 9 PM</p>
          </div>
        </div>
      </div>

      <div className="foot-bottom">
        <span className="foot-copy">© 2024 Aditya Dryfruits. All rights reserved.</span>
        <span className="foot-copy">Made with ❤️ in Maheshwar, MP</span>
      </div>
    </footer>
  )
}
