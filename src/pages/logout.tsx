import React, {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';

import {useAuth} from '../context/AuthContext';

export default function LogoutPage(): JSX.Element {
  const history = useHistory();
  const {logout} = useAuth();

  useEffect(() => {
    logout();
    history.replace('/login');
  }, [history, logout]);

  return (
    <Layout title="Signing out">
      <main className="auth-layout">
        <div className="auth-card">
          <h1>Signing you out…</h1>
          <p className="auth-card-subtitle">You&apos;re being redirected to the login page.</p>
        </div>
      </main>
    </Layout>
  );
}

