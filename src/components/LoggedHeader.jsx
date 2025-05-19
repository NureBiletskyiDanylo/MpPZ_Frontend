import profileIcon from '/profile-icon.png'
import { Link, useNavigate } from 'react-router'
import '../Header.css'
import '../assets/LoggedHeader.css'
import { useAuth } from '../AuthContext'

function LoggedHeader() {
  const navigate = useNavigate()

  const { logout } = useAuth();

  const logoutUser = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="site-name noselect">MemoBaby</span>
      </div>

      <nav className="header-center">
        <Link to="/">Home</Link>
        <Link to="/pages">Pages</Link>
        <Link to="/follow">Follow Us</Link>
      </nav>

      <div className="header-right">
        <button className="header-btn" onClick={logoutUser}>Log out</button>
        <img src={profileIcon} alt='Profile' className='profile-icon' onClick={() => navigate('/user-profile')} />
      </div>
    </header>
  )
}

export default LoggedHeader
