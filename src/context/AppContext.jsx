import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // UI state
  const [authModal, setAuthModal] = useState(null)

  // 🔄 Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // 🔐 SIGNUP
  const signupEmail = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Set display name
    await updateProfile(userCredential.user, {
      displayName: name
    })

    return userCredential.user
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

  // 🎛️ UI controls
  const openAuth = (mode) => setAuthModal(mode)
  const closeAuth = () => setAuthModal(null)

  // 🔔 Simple toast (you can improve later)
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

// 🔗 Hooks
export const useAuth = () => useContext(AppContext)
export const useUI = () => useContext(AppContext)