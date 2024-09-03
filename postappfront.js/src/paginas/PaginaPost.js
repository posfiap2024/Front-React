import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { obterPostPorId } from '../servicos/api';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const PaginaPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const resultado = await obterPostPorId(id);
        setPost(resultado);
      } catch (error) {
        setError('Aguardando post do backend...');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PostContainer>
      {post ? (
        <>
          <PostTitle>{post.titulo}</PostTitle>
          <PostContent>{post.conteudo}</PostContent>
        </>
      ) : (
        <p>Post não encontrado.</p>
      )}
    </PostContainer>
  );
};

export default PaginaPost;
