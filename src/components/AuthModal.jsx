import { useState } from 'react'
import { useAuth } from '../context/AppContext'
import { useUI } from '../context/AppContext'

export default function AuthModal() {
  const { loginEmail, signupEmail, loginGoogle } = useAuth()
  const { authModal, openAuth, closeAuth, showToast } = useUI()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const reset = () => { setName(''); setEmail(''); setPass(''); setErr('') }
  const switchMode = mode => { reset(); openAuth(mode) }

  const doLogin = async () => {
    if (!email || !pass) { setErr('Please fill all fields'); return }
    setLoading(true); setErr('')
    try { await loginEmail(email, pass); showToast('Welcome back! 👋'); closeAuth(); reset() }
    catch { setErr('Invalid email or password. Please try again.') }
    setLoading(false)
  }

  const doSignup = async () => {
    if (!name || !email || !pass) { setErr('Please fill all fields'); return }
    if (pass.length < 6) { setErr('Password must be at least 6 characters'); return }
    setLoading(true); setErr('')
    try { await signupEmail(name, email, pass); showToast('Account created! 🎉'); closeAuth(); reset() }
    catch (e) { setErr(e.message.replace('Firebase: ', '').split('(')[0].trim()) }
    setLoading(false)
  }

  const doGoogle = async () => {
    setLoading(true); setErr('')
    try { await loginGoogle(); showToast('Signed in! 👋'); closeAuth(); reset() }
    catch { setErr('Google sign-in failed. Please try again.') }
    setLoading(false)
  }

  if (!authModal) return null
  const isLogin = authModal === 'login'

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && closeAuth()}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeAuth}>✕</button>
        <div className="modal-title">{isLogin ? 'Welcome Back' : 'Create Account'}</div>
        <div className="modal-sub">{isLogin ? 'Sign in to your Aditya Dryfruits account' : 'Join Aditya Dryfruits for easy ordering'}</div>
        {err && <div className="modal-msg err">{err}</div>}
        {!isLogin && (
          <div className="inp-group">
            <label className="inp-label">Full Name</label>
            <input className="inp" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
        )}
        <div className="inp-group">
          <label className="inp-label">Email</label>
          <input className="inp" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="inp-group">
          <label className="inp-label">Password</label>
          <input className="inp" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn-full" onClick={isLogin ? doLogin : doSignup} disabled={loading}>
          {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
        <div className="modal-divider">or</div>
        <button className="btn-google" onClick={doGoogle} disabled={loading}>🔵 Continue with Google</button>
        <div className="modal-switch">
          {isLogin
            ? <span>Don't have an account? <a onClick={() => switchMode('signup')}>Sign Up</a></span>
            : <span>Already have an account? <a onClick={() => switchMode('login')}>Sign In</a></span>}
        </div>
      </div>
    </div>
  )
}
