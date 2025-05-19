import { useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../AuthContext';
import '../assets/login.css';

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const initialForm = location.state?.activeForm || 'login';
  const [activeForm, setActiveForm] = useState(initialForm);

  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Account/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await response.text();
      console.log('Signup response:', data);
      loginUser(data);
    } catch (err) {
      console.error('Signup error:', err);
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.text();
      console.log('Login response:', data);
      loginUser(data);
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  const { login } = useAuth();

  const loginUser = (response) => {
    let userdata = JSON.parse(response);
    if (userdata.token) {
      login(userdata.token);
      console.log("Hi " + userdata.username);
    } else {
      console.error("No token in response! " + response);
    }
  }

  return (
    <div className="form-stack">
      <div className="card-wrapper signup"
        onClick={() => setActiveForm('signup')}
      >
        <div className={`card-tab signup-tab ${activeForm === 'signup' ? 'active' : ''}`}>
          <p className="noselect">Sign up</p>
        </div>
        <div className={`form-card signup-card ${activeForm === 'signup' ? 'active' : ''}`}>
          <input name="username" type="text" placeholder="Name" value={signupData.name} onChange={handleSignupChange} />
          <input name="email" type="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
          <input name="password" type="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
          <div className="button-group">
            <button className="social-button">
              <img src="/google.png" alt="Google" />
              Google
            </button>
            <button className="social-button">
              <img src="/facebook.png" alt="Google" />
              Facebook
            </button>
          </div>
          <button className="main-button" onClick={handleSignup}>Sign up</button>
        </div>
      </div>

      <div
        className="card-wrapper login"
        onClick={() => setActiveForm('login')}
      >
        <div className={`card-tab login-tab ${activeForm === 'login' ? 'active' : ''}`}>
          <p className="noselect">Login</p>
        </div>
        <div className={`form-card login-card ${activeForm === 'login' ? 'active' : ''}`}>
          <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
          <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
          <div className="button-group">
            <button className="social-button">
              <img src="/google.png" alt="Google" />
              Google
            </button>
            <button className="social-button">
              <img src="/facebook.png" alt="Google" />
              Facebook
            </button>
          </div>
          <button className="main-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div >
  );
}
