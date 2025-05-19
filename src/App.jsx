import { Routes, Route } from 'react-router'
import UserProfile from './pages/UserProfile.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/user-profile" element={<UserProfile />} />
    </Routes>
  )
}

export default App