import './style.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexto/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
