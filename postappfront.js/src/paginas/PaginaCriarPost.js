import React, { useState } from 'react';
import styled from 'styled-components';

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

const PaginaCriarPost = () => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Criando post:', { titulo, conteudo, autor }); 
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
        <Input 
          type="text" 
          placeholder="Autor" 
          value={autor} 
          onChange={(e) => setAutor(e.target.value)} 
        />
        <Textarea 
          rows="8" 
          placeholder="Conteúdo" 
          value={conteudo} 
          onChange={(e) => setConteudo(e.target.value)} 
        />
        <Button type="submit">Criar Post</Button>
      </form>
    </Container>
  );
};

export default PaginaCriarPost;
