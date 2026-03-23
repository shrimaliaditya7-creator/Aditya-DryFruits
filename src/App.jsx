import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

// (add more pages here if you have them)

function App() {
  return (
    <AppProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </AppProvider>
  )
}

export default App