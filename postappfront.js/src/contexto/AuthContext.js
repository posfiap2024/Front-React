import React, { createContext, useState, useContext, useEffect } from 'react';
import { logarUsuario } from '../servicos/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // TODO Aqui você pode adicionar lógica para decodificar o token e obter informações do usuário
      // setUser(decodedUser);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (username, password) => {
    const token = await logarUsuario(username, password);
    if (token) {
      setToken(token);
      // TODO Aqui você pode adicionar lógica para decodificar o token e obter informações do usuário
      // setUser(decodedUser);
    }
    return token;
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
