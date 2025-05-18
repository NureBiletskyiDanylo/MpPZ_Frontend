import { useState } from "react"
import '../assets/login.css'

export default function Login() {
  const [activeForm, setActiveForm] = useState('login')

  return (
    <div className="form-stack">
      <div className="card-wrapper signup"
        onClick={() => setActiveForm('signup')}
      >
        <div className={`card-tab signup-tab ${activeForm === 'signup' ? 'active' : ''}`}>
          <p className="noselect">Sign up</p>
        </div>
        <div className={`form-card signup-card ${activeForm === 'signup' ? 'active' : ''}`}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="button-group">
            <button>Google</button>
            <button>Facebook</button>
          </div>
          <button className="main-button">Sign up</button>
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
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="button-group">
            <button>Google</button>
            <button>Facebook</button>
          </div>
          <button className="main-button">Login</button>
        </div>
      </div>
    </div >
  )
}
