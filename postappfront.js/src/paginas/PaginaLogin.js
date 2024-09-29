import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';
import { Container } from '../componentes/Container';
import { Form, FormField, Input, Label } from '../componentes/Form';
import { Button } from '../componentes/Button';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const PaginaLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    if (token) {
      setError('');
      navigate('/admin');
    } else {
      setError('Username ou senha inválidos');
    }
  };

  return (
    <Container $maxWidth="400px">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <FormField>
          <Label htmlFor="username">
            Usuário
          </Label>

          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label htmlFor='password'>
            Senha
          </Label>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        <Button
          $fill={true}
          type="submit"
        >
          Entrar
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default PaginaLogin;
