import React from 'react';
import {useHistory} from '@docusaurus/router';

import {useAuth} from '../../context/AuthContext';

// Navbar item for type "custom-authButton"
export default function AuthButtonNavbarItem(): JSX.Element | null {
  const history = useHistory();
  const {isAuthenticated, logout, initialized} = useAuth();

  if (!initialized) {
    return null;
  }

  const handleLogin = () => {
    history.push('/login');
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        className="navbar__item navbar__link"
        onClick={handleLogin}>
        Login
      </button>
    );
  }

  return (
    <button
      type="button"
      className="navbar__item navbar__link"
      onClick={handleLogout}>
      Logout
    </button>
  );
}

