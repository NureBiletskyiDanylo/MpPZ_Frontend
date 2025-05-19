import { Routes, Route } from 'react-router'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/album" element={<AlbumPage />} />
    </Routes>
  )
}

export default App