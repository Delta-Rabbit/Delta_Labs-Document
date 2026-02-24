import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { AUTH_API_URL } from '../config/auth';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'delta_auth_token';

async function fetchCurrentUser(token: string): Promise<User | null> {
  try {
    const res = await fetch(`${AUTH_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return {
      id: data.id,
      email: data.email,
      name: data.name,
    };
  } catch (e) {
    console.error('Failed to fetch current user', e);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setToken(stored);
      // Optionally hydrate user info in the background without affecting auth
      void fetchCurrentUser(stored).then((current) => {
        if (current) {
          setUser(current);
        }
      });
    }
    setInitialized(true);
    const handleExternalLogout = () => {
      logout();
    };

    window.addEventListener('delta-auth-logout', handleExternalLogout);

    return () => {
      window.removeEventListener('delta-auth-logout', handleExternalLogout);
    };
  }, []);

  const login = async (newToken: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, newToken);
    }
    setToken(newToken);
    // Best-effort user fetch; auth is based on token presence
    const current = await fetchCurrentUser(newToken);
    if (current) {
      setUser(current);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!token,
      token,
      user,
      login,
      logout,
      initialized,
    }),
    [token, user, initialized],
  );

  if (!initialized) {
    return <>{children}</>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      isAuthenticated: false,
      token: null,
      user: null,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      login: async (_token: string) => {},
      logout: () => {},
      initialized: false,
    };
  }
  return ctx;
}

