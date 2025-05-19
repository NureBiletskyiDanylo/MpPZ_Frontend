import logo from '/logo.png'
import profileIcon from '/profile-icon.png'
import { useNavigate } from 'react-router-dom'
import '../assets/LoggedHeader.css'

function Header() {
    const navigate = useNavigate()

    return (
        <header className='header'>
            <div className='header-right'>
                <div className='logo-section' onClick={() => navigate('/')}>
                    <img src={logo} alt='MemoBaby logo' className='logo-image' />
                    <span className='logo-text'>MemoBaby</span>
                </div>
                <nav className='nav'>
                    <a className='link' href='#'>Home</a>
                    <a className='link' href='#'>Pages</a>
                    <a className='link' href='#'>Follow us</a>
                </nav>
            </div>
            <div className='profile-section'>
                <button className='logout-button'>Log out</button>
                <img src={profileIcon} alt='Profile' className='profile-icon' onClick={() => navigate('/user-profile')} />
            </div>
        </header>
    )
}

export default Header