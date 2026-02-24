import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

import { AUTH_API_URL } from '../config/auth';
import { useAuth } from '../context/AuthContext';

type LoginFormState = {
  email: string;
  password: string;
};

export default function LoginPage(): JSX.Element {
  const history = useHistory();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${AUTH_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.detail || 'Unable to login. Please check your credentials.';
        setError(typeof msg === 'string' ? msg : 'Unable to login. Please check your credentials.');
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      const token = data?.access_token;
      if (!token) {
        setError('Unexpected response from server.');
        setSubmitting(false);
        return;
      }

      await login(token);
      history.push('/docs/');
    } catch (err) {
      console.error('Login failed', err);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Login" description="Login to access Delta Labs documentation">
      <main className="auth-layout">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="auth-card-subtitle">Sign in to access the Delta Labs documentation.</p>
          <form onSubmit={handleSubmit}>
            <div className="margin-bottom--md">
              <label htmlFor="email" className="auth-field-label">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="auth-input"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="margin-bottom--md">
              <label htmlFor="password" className="auth-field-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="auth-input"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="button button--primary auth-submit" type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="auth-hint">Accounts are created by the Delta Labs admin team. Contact an admin if you need access.</p>
        </div>
      </main>
    </Layout>
  );
}

