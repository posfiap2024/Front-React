import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { obterPosts, searchPost } from '../servicos/api';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 60%; /* Reduz a largura para 60% do contêiner pai */
  max-width: 600px; /* Limita a largura máxima do campo de busca */
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const PostItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 12px;
  color: #333;
`;

const PostAuthor = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 12px;
`;

const PostDescription = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

const ReadMoreLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 2px solid #007bff;
  transition: color 0.3s, border-bottom-color 0.3s;

  &:hover {
    color: #0056b3;
    border-bottom-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const PaginationButton = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const PageInfo = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const PaginaPrincipal = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultado = await obterPosts();
        setPosts(resultado);
      } catch (error) {
        console.error('Erro ao obter posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const resultado = searchQuery ? await searchPost(searchQuery) : await obterPosts();
        setPosts(resultado);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <MainContainer>
      <h1>Lista de Posts</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar posts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <PostGrid>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostItem key={post.id}>
              <PostTitle>{post.titulo}</PostTitle>
              <PostAuthor>Autor: {post.autor}</PostAuthor>
              <PostDescription>{post.descricao}</PostDescription>
              <ReadMoreLink to={`/posts/${post.id}`}>Leia mais</ReadMoreLink>
            </PostItem>
          ))
        ) : (
          <p>Não há postagens disponíveis.</p>
        )}
      </PostGrid>

      {posts.length > postsPerPage && (
        <Pagination>
          <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </PaginationButton>
          <PageInfo>Página {currentPage} de {totalPages}</PageInfo>
          <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            Próxima
          </PaginationButton>
        </Pagination>
      )}
    </MainContainer>
  );
};

export default PaginaPrincipal;
