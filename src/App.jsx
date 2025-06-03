import { Routes, Route, useParams } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import CreatePageTemplate1 from './components/CreatePageTemplate1.jsx'
import CreatePageTemplate2 from './components/CreatePageTemplate2.jsx'
import CreatePageTemplate3 from './components/CreatePageTemplate3.jsx'
import PageEditWrapper from './components/PageEditWrapper.jsx'
import PageViewWrapper from './components/PageViewWrapper.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/album/:albumId' element={<AlbumPage />} />
        <Route path='/create/1' element={<CreatePageTemplate1 />} />
        <Route path='/create/2' element={<CreatePageTemplate2 />} />
        <Route path='/create/3' element={<CreatePageTemplate3 />} />
        <Route path="/pages/edit/:pageId" element={<PageEditWrapper />} />
        <Route path="/pages/:pageId" element={<PageViewWrapper />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App
