import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function isEmail(email) {
  const expr = /^[^@]+@[^@]+\.[^@]+$/;
  return expr.test(email);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserWithEmail = (id, token, username) => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/Account/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.email != null) {
          localStorage.setItem('email', data.email);
          setUser({ token, username, id, email: data.email });
        } else {
          console.error('User data missing email:', data);
          setUser(null);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('userId');

    if (token && username && id) {
      setUserWithEmail(id, token, username);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token, username, id) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);
    setUserWithEmail(id, token, username);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    setUser(null);
  };

  const setUserData = (id, token, username, email) => {
    if (id && token && username && email) {
      localStorage.setItem('userId', id);
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      setUser({ token, username, id, email });
    } else {
      throw new Error("Invalid user data");
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
