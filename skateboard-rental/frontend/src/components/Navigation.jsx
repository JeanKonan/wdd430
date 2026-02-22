import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a token (is logged in)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛹 Skateboard Rentals
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rentals" className="nav-link">
              Browse
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  My Rentals
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
