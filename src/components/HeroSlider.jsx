import { useState, useEffect } from 'react'
import { SLIDES } from '../data/products'

export default function HeroSlider({ onShopClick }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const go = i => setIdx((i + SLIDES.length) % SLIDES.length)

  return (
    <section className="hero-slider">
      <div className="slides-container" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div className="slide" key={i}>
            <img className="slide-bg" src={s.img} alt={s.h1} loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="slide-overlay" />
            <div className="slide-content">
              <div className="slide-tag">{s.tag}</div>
              <h1 className="slide-h1">{s.h1}</h1>
              <p className="slide-sub">{s.sub}</p>
              <a className="slide-cta" href="#shop" onClick={e => { e.preventDefault(); onShopClick?.() }}>
                {s.cta} →
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow arrow-prev" onClick={() => go(idx - 1)}>‹</button>
      <button className="slider-arrow arrow-next" onClick={() => go(idx + 1)}>›</button>

      <div className="slider-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`sdot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </section>
  )
}
