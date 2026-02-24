import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let apiUrl = 'http://localhost:8000';

if (ExecutionEnvironment.canUseDOM) {
  const { hostname } = window.location;

  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    apiUrl = 'http://localhost:8000';
  } else {
    // Production (Vercel) – call the Render auth API
    apiUrl = 'https://delta-labs-document.onrender.com';
  }
}

export const AUTH_API_URL: string = apiUrl;

