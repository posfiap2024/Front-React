import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../hooks/post';

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
  const { post, loading } = usePost(id);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  return (
    <PostContainer>
      {post ? (
        <>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
        </>
      ) : (
        <p>Post não encontrado.</p>
      )}
    </PostContainer>
  );
};

export default PaginaPost;
