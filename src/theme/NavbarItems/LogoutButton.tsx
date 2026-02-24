import React from 'react';
import { useHistory } from '@docusaurus/router';

import { useAuth } from '../../context/AuthContext';

export default function LogoutButton(): JSX.Element | null {
  const history = useHistory();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleClick = () => {
    logout();
    history.push('/login');
  };

  return (
    <button className="button button--link" type="button" onClick={handleClick}>
      Logout
    </button>
  );
}

