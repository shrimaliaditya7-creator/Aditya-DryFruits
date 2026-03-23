import { useState } from 'react'
import { useCart } from '../context/AppContext'
import { useUI } from '../context/AppContext'

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart()
  const { showToast } = useUI()
  const [imgErr, setImgErr] = useState(false)
  const inCart = cart.some(i => i.id === product.id)

  const handleAdd = e => {
    e.stopPropagation()
    addToCart(product)
    showToast(`Added: ${product.name}`)
  }

  return (
    <div className="pcard">
      <div className="pcard-img-wrap">
        <img
          className="pcard-img"
          src={imgErr ? product.fallback : product.img}
          alt={product.name}
          loading="lazy"
          onError={() => setImgErr(true)}
        />
        {product.discount > 0 && (
          <div className="pcard-off">UPTO {product.discount}% OFF</div>
        )}
        <button className="pcard-wish" onClick={e => e.stopPropagation()}>♡</button>
      </div>

      <div className="pcard-body">
        <div className="pcard-from">From ₹{product.price}.00 INR</div>
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-stars">
          {[1,2,3,4,5].map(s => <span key={s} className="star on">★</span>)}
        </div>
      </div>

      <div className="pcard-foot">
        <button
          className={`choose-btn ${inCart ? 'incart' : ''}`}
          onClick={handleAdd}
        >
          {inCart ? '✓ In Cart' : 'Choose options'}
        </button>
      </div>
    </div>
  )
}
