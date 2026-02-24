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

  const isServer = typeof window === 'undefined';

  // During static build (SSR), always render children so every page has full Layout and docusaurus_tag
  if (isServer) {
    return <>{children}</>;
  }

  // In browser: wait for auth to initialize before redirecting
  if (!initialized) {
    return null;
  }

  if (!isAuthenticated && !isPublicPath(location.pathname)) {
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

