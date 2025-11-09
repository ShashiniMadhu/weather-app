import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1b885r0nhpfkelvt.us.auth0.com"
      clientId="rsAlCwYaIWk8CJD3UhKzG2JJwqWhoWdq"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://weather-api.fidenz.com",
        scope: "openid profile email"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);