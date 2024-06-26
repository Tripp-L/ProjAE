import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toggle from 'react-toggle';
import logo from '../assets/images/AncientEchoes.png';  // Correct the path if necessary
import './Header.css';  // Correct the path if necessary
import 'react-toggle/style.css';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    const userTheme = Cookies.get('user_theme') || 'light';
    setTheme(userTheme);
    if (userTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    Cookies.set('user_theme', newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <nav className="header-container navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="navbar-brand logo">
          <img src={logo} alt="Logo" className="header-logo" />
        </div>
        <ul className="navbar-nav d-flex flex-row align-items-center">
          <li className="nav-item mx-5">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item mx-5">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item mx-5">
            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 ml-auto">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '300px', height: '40px' }} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ height: '40px' }}>Search</button>
        </form>
        <div className="toggle-container ml-3">
          <Toggle
            defaultChecked={theme === 'dark'}
            icons={false}
            onChange={handleThemeToggle} />
        </div>
      </div>
    </nav>
  );
}

export default Header;

