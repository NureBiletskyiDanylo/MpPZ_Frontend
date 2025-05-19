import { Link, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login', { state: { activeForm: 'login' } });
  const handleSignup = () => navigate('/login', { state: { activeForm: 'signup' } });

  const { user, logout } = useAuth();

  let headerContent;

  if (user) {
    headerContent =
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
          <button className="header-btn" onClick={logout}>Log out</button>
          <Link to="/profile" className="header-btn accent" >User Profile</Link>
        </div>
      </header>;
  } else {
    headerContent =
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
          <button className="header-btn" onClick={handleSignup}>Sign Up</button>
          <button className="header-btn accent" onClick={handleLogin}>Login</button>
        </div>
      </header>;
  }

  return (
    <>
      {headerContent}
    </>
  );
}
