import { Routes, Route } from 'react-router-dom'
import { CartProvider, AuthProvider, UIProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import AuthModal from './components/AuthModal'
import CheckoutModal from './components/CheckoutModal'
import Toast from './components/Toast'
import FloatWA from './components/FloatWA'
import Home from './pages/Home'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
          <CartDrawer />
          <AuthModal />
          <CheckoutModal />
          <Toast />
          <FloatWA />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  )
}
