import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2 onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <i className="fas fa-heartbeat"></i> Emergency System
        </h2>
      </div>
      <div className="header-right">
        <span className="user-name">
          <i className="fas fa-user-circle"></i> {user?.full_name || 'User'}
        </span>
        <button onClick={handleLogout} className="btn btn-sm btn-logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
