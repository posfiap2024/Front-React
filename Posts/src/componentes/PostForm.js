import React, { useState } from 'react';

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [conteudo, setConteudo] = useState(initialData.conteudo || '');
  const [autor, setAutor] = useState(initialData.autor || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, conteudo, autor });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Título" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
      />
      <textarea 
        placeholder="Conteúdo" 
        value={conteudo} 
        onChange={(e) => setConteudo(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Autor" 
        value={autor} 
        onChange={(e) => setAutor(e.target.value)} 
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default PostForm;
