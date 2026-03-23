import { useState, useEffect, useRef } from 'react'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/products'

/* ── Lazy image with shimmer ── */
function LazyImg({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false)
  const [err,    setErr]    = useState(false)
  return (
    <img
      className={`${className || ''} ${!loaded ? 'img-loading' : ''}`}
      style={style}
      src={err ? 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&q=60' : src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => { setErr(true); setLoaded(true) }}
    />
  )
}

/* ── Testimonial carousel ── */
function Testimonials() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="testimonials-box">
      <div className="tslides-wrap">
        <div className="tslides" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {TESTIMONIALS.map((t, i) => (
            <div className="tslide" key={i}>
              <p className="tquote">"{t.quote}"</p>
              <div className="tauthor">— {t.author}, {t.location}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="t-dots">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} className={`tdot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  )
}

/* ── Main Home ── */
export default function Home() {
  const [activeCat,  setActiveCat]  = useState('all')
  const [searchQ,    setSearchQ]    = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const shopRef = useRef(null)

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: 'smooth' })

  /* filter products */
  const filtered = PRODUCTS.filter(p => {
    const matchCat  = activeCat === 'all' || p.cat === activeCat
    const matchQ    = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase())
    return matchCat && matchQ
  })

  const visible = filtered.slice(0, visibleCount)

  /* reset visible count on filter change */
  useEffect(() => setVisibleCount(12), [activeCat, searchQ])

  /* expose search to header via window event */
  useEffect(() => {
    const handler = e => setSearchQ(e.detail)
    window.addEventListener('ad-search', handler)
    return () => window.removeEventListener('ad-search', handler)
  }, [])

  return (
    <main>
      {/* ── HERO ── */}
      <HeroSlider onShopClick={scrollToShop} />

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-track">
          {[
            '🏪 Maheshwar\'s #1 Dry Fruits Shop',
            '·',
            '📦 Since 2018',
            '·',
            '🌿 80+ Premium Products',
            '·',
            '⭐ 100% Natural Quality',
            '·',
            '🚚 Fast Local Delivery',
            '·',
            '🏪 Maheshwar\'s #1 Dry Fruits Shop',
            '·',
            '📦 Since 2018',
            '·',
            '🌿 80+ Premium Products',
            '·',
            '⭐ 100% Natural Quality',
            '·',
            '🚚 Fast Local Delivery',
          ].map((s, i) => (
            s === '·'
              ? <span key={i} className="stat-sep">·</span>
              : <div key={i} className="stat-item">{s}</div>
          ))}
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="cat-grid">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <div
                key={key}
                className={`cat-card ${activeCat === key ? 'active' : ''}`}
                onClick={() => { setActiveCat(key); scrollToShop() }}
              >
                <div className="cat-img-wrap">
                  <LazyImg src={cat.img} alt={cat.label} className="cat-img" />
                </div>
                <div className="cat-name">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP PICKS (main shop) ── */}
      <section className="section section-alt" id="shop" ref={shopRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Picks</h2>
            <a href="#" className="see-all" onClick={e => { e.preventDefault(); setActiveCat('all') }}>
              {activeCat !== 'all' ? 'Clear filter ×' : `${filtered.length} products`}
            </a>
          </div>

          {/* Filter pills */}
          <div className="filter-row">
            <button
              className={`fpill ${activeCat === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCat('all')}
            >
              All
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                className={`fpill ${activeCat === key ? 'active' : ''}`}
                onClick={() => setActiveCat(key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="prod-grid">
            {visible.length > 0
              ? visible.map((p, i) => (
                  <div key={p.id} style={{ animationDelay: `${(i % 8) * 0.05}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))
              : (
                <div className="no-results">
                  <h3>No products found 😕</h3>
                  <p>Try a different search or category.</p>
                </div>
              )
            }
          </div>

          {/* Load more */}
          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <button
                onClick={() => setVisibleCount(p => p + 12)}
                style={{
                  padding: '12px 36px', borderRadius: 30, border: '1.5px solid var(--black)',
                  fontWeight: 700, fontSize: '.88rem', background: 'var(--white)', transition: 'var(--trans)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.target.style.background = 'var(--black)'; e.target.style.color = '#fff' }}
                onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--black)' }}
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── EXPLORE OUR RANGE bento ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Our Range</h2>
          </div>
          <div className="bento-grid">
            <div className="bento-big">
              <LazyImg src="https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80" alt="Nut Mix" />
              <div className="bento-label"><span>Premium Nut Mix</span></div>
              <div className="bento-off-tag">UPTO 10% OFF</div>
            </div>
            <div className="bento-col">
              <div className="bento-sm">
                <LazyImg src="https://images.unsplash.com/photo-1508061942611-df313e18c7a1?w=600&q=80" alt="Almonds" />
                <div className="bento-label"><span>Premium Almonds</span></div>
                <div className="bento-off-tag">UPTO 6% OFF</div>
              </div>
              <div className="bento-sm">
                <LazyImg src="https://images.unsplash.com/photo-1596591406635-4e37d8f51f4d?w=600&q=80" alt="Berries" />
                <div className="bento-label"><span>Exotic Berries</span></div>
                <div className="bento-off-tag">UPTO 11% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOT DEALS promo banner ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Hot Deals</h2>
          </div>
          <div className="promo-banner">
            <LazyImg
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
              alt="Spices"
              className="promo-img"
            />
            <div className="promo-content">
              <div className="promo-tag">Limited Time</div>
              <h2 className="promo-h">Spices that<br />Inspire</h2>
              <p className="promo-sub">From the finest farms to your kitchen — authentic flavours, rich aromas, and the essence of tradition.</p>
              <a href="#shop" className="explore-btn" onClick={e => { e.preventDefault(); setActiveCat('spices'); scrollToShop() }}>
                Explore →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEW ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What's New</h2>
            <a href="#shop" className="see-all" onClick={e => { e.preventDefault(); scrollToShop() }}>See all →</a>
          </div>
          <div className="prod-grid">
            {PRODUCTS.filter(p => p.isNew).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE ── */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 12 }}>
            <h2 className="section-title">Shop for Everyone</h2>
          </div>
          <p style={{ color: 'var(--gray5)', fontSize: '.88rem', marginBottom: 36 }}>
            Nutritious options for every lifestyle and every member of the family.
          </p>
          <div className="lifestyle-grid">
            {[
              { icon: '💪', bg: '#dcfce7', title: 'Fitness', sub: 'Fuel Your Workout with Healthy Nuts, Seeds & More.' },
              { icon: '🤱', bg: '#fce7f3', title: 'Maternity', sub: 'Nourish the Mom-to-Be with Nutritious Dry Fruits & Seeds.' },
              { icon: '👧', bg: '#dbeafe', title: 'Kids', sub: 'Choose from our Top-Quality Healthy Snacks for Children.' },
              { icon: '👴', bg: '#fef9c3', title: 'Elder Care', sub: 'Authentic Dry Fruits & Nuts for Healthy Elders.' },
            ].map(c => (
              <div className="life-card" key={c.title}>
                <div className="life-icon" style={{ background: c.bg }}>{c.icon}</div>
                <div className="life-title">{c.title}</div>
                <p className="life-sub">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="features-grid">
            {[
              {
                img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80',
                title: 'Express Delivery',
                desc: 'Your order will be delivered quickly and efficiently across Maheshwar & nearby areas.',
              },
              {
                img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&q=80',
                title: 'Custom Packaging',
                desc: 'Our premium packaging options are designed to delight you and your loved ones.',
              },
              {
                img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80',
                title: 'Express Checkout',
                desc: 'Checkout made simple and fast — or WhatsApp us your order in 30 seconds.',
              },
            ].map(f => (
              <div key={f.title}>
                <LazyImg src={f.img} alt={f.title} className="feat-img" />
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CINEMATIC BANNER ── */}
      <section className="section">
        <div className="container">
          <div className="dark-banner">
            <LazyImg
              src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=1400&q=70"
              alt="Premium quality"
              className="dark-bg"
            />
            <div className="dark-overlay" />
            <div className="dark-content">
              <div className="dark-tag">Introducing</div>
              <h2 className="dark-h">Top Quality,<br />Just for You</h2>
              <p className="dark-sub">Premium dry fruits sourced from the world's finest farms. No compromise on quality.</p>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WA_NUMBER || '917987239233'}?text=Hello%20Aditya%20Dryfruits!%20I%20want%20to%20order.`}
                target="_blank"
                rel="noreferrer"
                className="wa-btn"
              >
                💬 Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Follow us{' '}
              <span style={{ fontWeight: 400, color: 'var(--gray4)', fontSize: '1rem' }}>@aditya_dryfruits</span>
            </h2>
            <a
              href={import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/aditya_dryfruits'}
              target="_blank"
              rel="noreferrer"
              className="see-all"
            >
              Open Instagram →
            </a>
          </div>
          <div className="insta-grid">
            {[
              'https://images.unsplash.com/photo-1508061942611-df313e18c7a1?w=400&q=80',
              'https://images.unsplash.com/photo-1607113256158-56a934936ef9?w=400&q=80',
              'https://images.unsplash.com/photo-1611575619048-37e7f898ef60?w=400&q=80',
              'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80',
            ].map((src, i) => (
              <a
                key={i}
                className="insta-item"
                href={import.meta.env.VITE_INSTAGRAM || '#'}
                target="_blank"
                rel="noreferrer"
              >
                <LazyImg src={src} alt={`Instagram ${i + 1}`} />
                <div className="insta-overlay">📷</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
