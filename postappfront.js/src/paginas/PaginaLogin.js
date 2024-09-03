import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email === 'fullstack@fiap.com' && senha === 'fullstack') {
      setErro('');
      localStorage.setItem('usuarioLogado', 'true'); 
      navigate('/admin');
    } else {
      setErro('Email ou senha inválidos');
    }
  };
  

  return (
    <LoginContainer>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
      </form>
    </LoginContainer>
  );
};



export default PaginaLogin;
