import { Routes, Route } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import CreatePageTemplate1 from './components/CreatePageTemplate1.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/album' element={<AlbumPage />} />
        <Route path='/create-page/1' element={<CreatePageTemplate1 />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App