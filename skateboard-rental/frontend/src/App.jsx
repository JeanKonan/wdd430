import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Rentals from './pages/Rentals'
import Checkout from './pages/Checkout'
import './App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App
