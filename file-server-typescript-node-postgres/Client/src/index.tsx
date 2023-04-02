import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ThemeProvider from './Theme';
import UserAuthProvider from './AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserAuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </UserAuthProvider>
  </React.StrictMode>
);
