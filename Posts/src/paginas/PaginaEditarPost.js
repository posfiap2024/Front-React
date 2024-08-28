import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  background-color: white;
  padding: 30px;
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

const PaginaEditarPost = ({ match }) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    const postId = match.params.id;
    console.log('Carregando post:', postId);
    setTitulo('Título Atual');
    setConteudo('Conteúdo Atual');
  }, [match.params.id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Atualizando post:', { titulo, conteudo });
    // Atualizar o post no back
  };

  return (
    <Container>
      <h2>Editar Post</h2>
      <form onSubmit={handleUpdate}>
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
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </Container>
  );
};

export default PaginaEditarPost;
