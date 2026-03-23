import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // ✅ SIGNUP
  const signupEmail = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(res.user, {
      displayName: name
    })

    return res.user
  }

  // ✅ LOGIN
  const loginEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  // ✅ GOOGLE
  const loginGoogle = async () => {
    return await signInWithPopup(auth, googleProvider)
  }

  // ✅ LOGOUT
  const logout = async () => {
    await signOut(auth)
  }

  // UI
  const openAuth = (mode) => setAuthModal(mode)
  const closeAuth = () => setAuthModal(null)

  const showToast = (msg) => {
    alert(msg)
  }

  return (
    <AppContext.Provider value={{
      user,
      loading,
      signupEmail,
      loginEmail,
      loginGoogle,
      logout,
      authModal,
      openAuth,
      closeAuth,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAuth = () => useContext(AppContext)
export const useUI = () => useContext(AppContext)