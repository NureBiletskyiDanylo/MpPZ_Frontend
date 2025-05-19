import { Routes, Route } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
