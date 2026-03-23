import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import { auth, googleProvider } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'

// ─── Cart Context ─────────────────────────────────────────────
const CartCtx = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const ex = state.find(i => i.id === action.product.id)
      if (ex) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':   return state.filter(i => i.id !== action.id)
    case 'QTY': {
      const updated = state.map(i => i.id === action.id ? { ...i, qty: i.qty + action.delta } : i)
      return updated.filter(i => i.qty > 0)
    }
    case 'CLEAR':    return []
    case 'LOAD':     return action.items
    default:         return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try { return JSON.parse(localStorage.getItem('ad_cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('ad_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart   = useCallback(p  => dispatch({ type: 'ADD', product: p }), [])
  const removeItem  = useCallback(id => dispatch({ type: 'REMOVE', id }), [])
  const changeQty   = useCallback((id, delta) => dispatch({ type: 'QTY', id, delta }), [])
  const clearCart   = useCallback(()  => dispatch({ type: 'CLEAR' }), [])

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <CartCtx.Provider value={{ cart, addToCart, removeItem, changeQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartCtx.Provider>
  )
}

export const useCart = () => useContext(CartCtx)

// ─── Auth Context ─────────────────────────────────────────────
const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false) })
    return unsub
  }, [])

  const loginEmail  = (email, pass)  => signInWithEmailAndPassword(auth, email, pass)
  const signupEmail = async (name, email, pass) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    await updateProfile(cred.user, { displayName: name })
    setUser({ ...cred.user, displayName: name })
    return cred
  }
  const loginGoogle = ()   => signInWithPopup(auth, googleProvider)
  const logout      = ()   => signOut(auth)

  return (
    <AuthCtx.Provider value={{ user, loading, loginEmail, signupEmail, loginGoogle, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)

// ─── UI Context (modals, drawer, toast) ──────────────────────
const UICtx = createContext(null)

export function UIProvider({ children }) {
  const [cartOpen,     setCartOpen]     = useState(false)
  const [authModal,    setAuthModal]    = useState(null)   // null | 'login' | 'signup'
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast,        setToast]        = useState('')
  const [toastTimer,   setToastTimer]   = useState(null)

  const openCart     = ()      => setCartOpen(true)
  const closeCart    = ()      => setCartOpen(false)
  const openAuth     = (mode)  => setAuthModal(mode)
  const closeAuth    = ()      => setAuthModal(null)
  const openCheckout = ()      => { setCartOpen(false); setCheckoutOpen(true) }
  const closeCheckout= ()      => setCheckoutOpen(false)

  const showToast = useCallback(msg => {
    setToast(msg)
    if (toastTimer) clearTimeout(toastTimer)
    const t = setTimeout(() => setToast(''), 2800)
    setToastTimer(t)
  }, [toastTimer])

  return (
    <UICtx.Provider value={{
      cartOpen, openCart, closeCart,
      authModal, openAuth, closeAuth,
      checkoutOpen, openCheckout, closeCheckout,
      toast, showToast,
    }}>
      {children}
    </UICtx.Provider>
  )
}

export const useUI = () => useContext(UICtx)
