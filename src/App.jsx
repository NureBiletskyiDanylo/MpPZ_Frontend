import { Routes, Route } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import CreatePage from './components/CreatePage.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/album' element={<AlbumPage />} />
        <Route path='/create-page' element={<CreatePage />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App