import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let apiUrl = 'http://localhost:8000';

if (ExecutionEnvironment.canUseDOM) {
  const win = window as unknown as { _env_?: { AUTH_API_URL?: string } };
  if (win._env_?.AUTH_API_URL) {
    apiUrl = win._env_.AUTH_API_URL;
  }
}

export const AUTH_API_URL: string = apiUrl;

