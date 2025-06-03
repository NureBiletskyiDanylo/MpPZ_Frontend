import { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router";
import { useAuth, isEmail } from '../AuthContext';
import { toast } from 'react-toastify';
import '../assets/login.css';

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { login } = useAuth();

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
      if (!isEmail(signupData.email)) {
        toast.error("Invalid email format.")
        return;
      }

      if (!signupData.username || !signupData.email || !signupData.password) {
        return;
      }
      const params = new URLSearchParams({
        username: signupData.username,
        email: signupData.email,
        password: signupData.password
      });
      const response = await fetch(`${API_URL}/api/Account/register?${params.toString()}`, {
        method: 'POST',
      });
      console.log(signupData);
      const data = await response.text();
      console.log(data)
      if (response.status != 200) {
        toast.error(`Error: ${data}`);
      } else {
        console.log('Signup response:', data);
        loginUser(data);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  }

  const handleLogin = async () => {
    try {
      if (!isEmail(loginData.email)) {
        toast.error("Invalid email format.")
        return;
      }
      const response = await fetch(`${API_URL}/api/Account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.text();
      if (response.status != 200) {
        toast.error(`Error: ${data}`);
      } else {
        console.log('Login response:', data);
        loginUser(data);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  const navigate = useNavigate();

  const loginUser = (response) => {
    let userdata = JSON.parse(response);
    if (userdata.token) {
      login(userdata.token, userdata.username, userdata.id);
      toast.success("Welcome, " + userdata.username);
      navigate("/");
    } else {
      toast.error("Server error.");
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
          <div className='field-wrapper'>
            <input name='username' type="text" placeholder='' id='name' value={signupData.name} onChange={handleSignupChange} />
            <label htmlFor='name' className='label-text'>Name</label>
          </div>
          <div className='field-wrapper'>
            <input name='email' type="email" placeholder='' id='email-sign-up' value={signupData.email} onChange={handleSignupChange} />
            <label htmlFor='email-sign-up' className='label-text'>Email</label>
          </div>
          <div className='field-wrapper'>
            <input name='password' type="password" placeholder='' id='password-sign-up' value={signupData.password} onChange={handleSignupChange} />
            <label htmlFor='password-sign-up' className='label-text'>Password</label>
          </div>
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
          <div className='field-wrapper'>
            <input name='email' type='email' placeholder='' id='email' value={loginData.email} onChange={handleLoginChange} />
            <label htmlFor='email' className='label-text'>Email</label>
          </div>
          <div className='field-wrapper'>
            <input name='password' type='password' placeholder='' id='password' value={loginData.password} onChange={handleLoginChange} />
            <label htmlFor='password' className='label-text'>Password</label>
          </div>
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
