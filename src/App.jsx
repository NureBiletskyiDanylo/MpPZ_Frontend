import { Routes, Route } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile.jsx'
import AlbumPage from './pages/AlbumPage.jsx'
import CreatePageTemplate1 from './components/CreatePageTemplate1.jsx'
import CreatePageTemplate2 from './components/CreatePageTemplate2.jsx'
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
        <Route path="/pages/:pageId/edit" element={<PageEditWrapper />} />
        <Route path="/pages/:pageId" element={<PageViewWrapper />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

function PageEditWrapper() {
  const { pageId } = useParams();
  // Тут має бути логіка завантаження даних сторінки
  // Наприклад:
  const pageData = fetchPageData(pageId); // Ваша функція отримання даних

  switch (pageData.templateId) {
    case 1: return <CreatePageTemplate1 mode="edit" pageData={pageData} />;
    case 2: return <CreatePageTemplate2 mode="edit" pageData={pageData} />;
    case 3: return <CreatePageTemplate3 mode="edit" pageData={pageData} />;
    default: return <Navigate to="/" />;
  }
}

function PageViewWrapper() {
  const { pageId } = useParams();
  // Аналогічно, завантаження даних сторінки
  const pageData = fetchPageData(pageId);

  if (!pageData) return <div>Loading...</div>;

  switch (pageData.templateId) {
    case 1: return <CreatePageTemplate1 mode="view" pageData={pageData} />;
    case 2: return <CreatePageTemplate2 mode="view" pageData={pageData} />;
    case 3: return <CreatePageTemplate3 mode="view" pageData={pageData} />;
    default: return <Navigate to="/" />;
  }
}

export default App
