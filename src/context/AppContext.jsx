import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth } from '../firebase'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // 🔐 Auth state
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🎛️ UI state
  const [authModal, setAuthModal] = useState(null)

  // 🛒 Cart state
  const [cart, setCart] = useState([])

  // 🔄 Track user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // 🔐 SIGNUP
  const signupEmail = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(res.user, {
      displayName: name
    })

    return res.user
  }

  // 🔐 LOGIN
  const loginEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  // 🔐 GOOGLE LOGIN
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
  }

  // 🔓 LOGOUT
  const logout = async () => {
    await signOut(auth)
  }

  // 🛒 CART FUNCTIONS
  const addToCart = (item) => {
    setCart(prev => [...prev, item])
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
  }

  // 🎛️ UI FUNCTIONS
  const openAuth = (mode) => setAuthModal(mode)
  const closeAuth = () => setAuthModal(null)

  const showToast = (msg) => {
    alert(msg) // simple for now
  }

  return (
    <AppContext.Provider value={{
      // auth
      user,
      loading,
      signupEmail,
      loginEmail,
      loginGoogle,
      logout,

      // UI
      authModal,
      openAuth,
      closeAuth,
      showToast,

      // cart
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  )
}

// 🔗 Hooks
export const useAuth = () => useContext(AppContext)
export const useUI = () => useContext(AppContext)
export const useCart = () => useContext(AppContext)