import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/AppContext'
import { useAuth } from '../context/AppContext'
import { useUI } from '../context/AppContext'
import logoUrl from '../assets/logo.png'

const WA = import.meta.env.VITE_WA_NUMBER || '917987239233'

export default function Header({ onSearch, onCategoryClick }) {
  const { cartCount, cartTotal } = useCart()
  const { user, logout } = useAuth()
  const { openCart, openAuth, showToast } = useUI()
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    setDropOpen(false)
    showToast('Signed out. See you soon!')
  }

  const name = user?.displayName || user?.email?.split('@')[0] || ''
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <header className="site-header">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-track">
          {[
            '🚚 Dispatch in 24 hours',
            '⭐ Free shipping on orders above ₹1999',
            '🌿 100% Natural & Preservative Free',
            '📦 Premium Hygienic Packaging',
            '💬 WhatsApp: +91 79872 39233',
            '🚚 Dispatch in 24 hours',
            '⭐ Free shipping on orders above ₹1999',
            '🌿 100% Natural & Preservative Free',
            '📦 Premium Hygienic Packaging',
            '💬 WhatsApp: +91 79872 39233',
          ].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* Main header */}
      <div className="header-main">
        <a href="/" className="brand">
          <img className="brand-logo" src={logoUrl} alt="Aditya Dryfruits" onError={e => e.target.style.display='none'} />
          <div>
            <div className="brand-name">Aditya Dryfruits</div>
            <div className="brand-tag">Premium &amp; Natural</div>
          </div>
        </a>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for..."
            onChange={e => onSearch?.(e.target.value)}
          />
        </div>

        <div className="header-actions">
          {user ? (
            <div className="acc-wrap" ref={dropRef}>
              <div className="user-pill" onClick={() => setDropOpen(p => !p)}>
                <div className="user-avatar">
                  {user.photoURL
                    ? <img src={user.photoURL} alt={name} />
                    : initials}
                </div>
                {name}
              </div>
              <div className={`acc-dropdown ${dropOpen ? 'open' : ''}`}>
                <div className="acc-dd-hd">
                  <div className="acc-dd-name">{name}</div>
                  <div className="acc-dd-email">{user.email}</div>
                </div>
                <div className="acc-dd-item" onClick={openCart}>🛒 My Cart</div>
                <div className="acc-dd-item" onClick={() => { setDropOpen(false) }}>📦 My Orders</div>
                <div className="acc-dd-item danger" onClick={handleLogout}>🚪 Sign Out</div>
              </div>
            </div>
          ) : (
            <button className="btn-account" onClick={() => openAuth('login')}>
              👤 Account
            </button>
          )}

          <button className="btn-cart" onClick={openCart}>
            🛒 ₹{cartTotal.toFixed(2)} INR ({cartCount})
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="sub-nav-inner">
          <nav className="nav-links">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link" href="#shop" onClick={e => { e.preventDefault(); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Products</a>
            <a className="nav-link" href="#about">About Us</a>
            <a className="nav-link" href={import.meta.env.VITE_INSTAGRAM || '#'} target="_blank" rel="noreferrer">Instagram</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
          <div className="nav-delivery">
            🚚 <span>Need delivery? <strong>Read More</strong></span>
          </div>
        </div>
      </div>
    </header>
  )
}
