import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { excluirPost, obterPosts, obterPostsAdmin } from '../servicos/api';
import ModalConfirmacao from '../componentes/ModalConfirmacao';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';

const AdminContainer = styled.div`
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostItem = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 12px;
  width: 70px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const EditButton = styled(Button)`
  background-color: #007bff;
  padding: 12px;
  border-radius: 8px;
  width: 70px;
  &:hover {
    background-color: #0056b3;
  }
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const AlertCard = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const PaginaAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [postIdParaExcluir, setPostIdParaExcluir] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { token } = useAuth(); // Utilizando o token do AuthContext

  useEffect(() => {
    const carregarPosts = async () => {
      const postsCarregados = await obterPostsAdmin(token);
      setPosts(postsCarregados);
    };
    carregarPosts();
  }, [token]);

  const handleDeletePost = (id) => {
    setPostIdParaExcluir(id);
    setMostrarModal(true);
  };

  const handleConfirmDelete = async () => {
    const postExcluido = await excluirPost(postIdParaExcluir, token);
    if (postExcluido) {
      const postsAtualizados = posts.filter((post) => post.id !== postIdParaExcluir);
      setPosts(postsAtualizados);
      setMostrarModal(false);
      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    }
    setMostrarModal(false);
  };

  return (
    <AdminContainer>
      <h1>Painel de Administração</h1>
      {mostrarAlerta && <AlertCard show={mostrarAlerta}>Post excluído com sucesso!</AlertCard>}
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <div>
              <h3>{post.titulo}</h3>
              <p>{post.descricao}</p>
            </div>
            <ButtonContainer>
              <Link to={`/editar-post/${post.id}`}>
                <EditButton>Editar</EditButton>
              </Link>
              <Button onClick={() => handleDeletePost(post.id)}>Excluir</Button>
            </ButtonContainer>
          </PostItem>
        ))}
      </PostList>
      {mostrarModal && (
        <ModalConfirmacao 
          showModal={mostrarModal}
          setShowModal={setMostrarModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </AdminContainer>
  );
};

export default PaginaAdmin;
