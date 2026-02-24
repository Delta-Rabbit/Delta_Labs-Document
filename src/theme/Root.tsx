import React from 'react';
import type { ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';

import { AuthProvider, useAuth } from '../context/AuthContext';

const PUBLIC_PATHS = ['/login'];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname === `${p}/`);
}

function ProtectedShell({ children }: { children: ReactNode }): JSX.Element {
  const location = useLocation();
  const { isAuthenticated, initialized, logout } = useAuth();

  // Don't redirect until auth state has been initialized from storage
  if (!initialized) {
    return null;
  }

  if (typeof window !== 'undefined' && !isAuthenticated && !isPublicPath(location.pathname)) {
    window.location.href = '/login';
    return null;
  }

  const showLogout =
    typeof window !== 'undefined' &&
    isAuthenticated &&
    !isPublicPath(location.pathname);

  const handleLogoutClick = () => {
    logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <>
      {children}
      {showLogout && (
        <button
          type="button"
          onClick={handleLogoutClick}
          className="button button--sm button--link"
          style={{
            position: 'fixed',
            top: '0.9rem',
            right: '10rem',
            zIndex: 2000,
          }}>
          Logout
        </button>
      )}
    </>
  );
}

export default function Root({ children }: { children: ReactNode }): JSX.Element {
  return (
    <AuthProvider>
      <ProtectedShell>{children}</ProtectedShell>
    </AuthProvider>
  );
}

