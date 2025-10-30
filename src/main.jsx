import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';

import { UserProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* now our entire app has access to the user state from ANYWHERE within the app */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
