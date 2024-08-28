import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext'; // Импортируйте AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Оберните приложение в AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
