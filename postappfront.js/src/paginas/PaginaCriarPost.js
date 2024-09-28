import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexto/AuthContext';
import { criarPost } from '../servicos/api';
import { useNavigate } from 'react-router-dom'; 

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const PaginaCriarPost = () => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { token } = useAuth(); // Utilizando o token do AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!titulo || !conteudo) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const post = await criarPost(token, titulo, conteudo);
    if (post) {
      setError('');
      setTitulo('');
      setConteudo('');
      
      navigate('/admin');
    } else {
      setError('Erro ao criar o post');
    }
  };

  return (
    <Container>
      <h2>Criar Novo Post</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="Título" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
        />
        <Textarea 
          rows="8" 
          placeholder="Conteúdo" 
          value={conteudo} 
          onChange={(e) => setConteudo(e.target.value)} 
        />
        <Button type="submit">Criar Post</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default PaginaCriarPost;