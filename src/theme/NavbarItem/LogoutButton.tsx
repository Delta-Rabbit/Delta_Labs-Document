import React from 'react';
import {useHistory} from '@docusaurus/router';

import {useAuth} from '../../context/AuthContext';

// Custom navbar item for type "custom-LogoutButton"
export default function LogoutButtonNavbarItem(): JSX.Element | null {
  const history = useHistory();
  const {isAuthenticated, logout} = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleClick = () => {
    logout();
    history.push('/login');
  };

  return (
    <button
      type="button"
      className="navbar__item navbar__link"
      onClick={handleClick}>
      Logout
    </button>
  );
}

