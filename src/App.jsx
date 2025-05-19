import { Routes, Route } from 'react-router'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import CreatePage from './components/CreatePage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/album' element={<AlbumPage />} />
      <Route path='/create-page' element={<CreatePage />} />
    </Routes>
  )
}

export default App