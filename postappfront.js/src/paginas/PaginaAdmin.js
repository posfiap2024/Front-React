import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { excluirPost, obterPostsAdmin, criarPost } from '../servicos/api';
import ModalConfirmacao from '../componentes/ModalConfirmacao';
import { Container } from '../componentes/Container';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';
import { Button, DangerButton, PublishButton } from '../componentes/Button'

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostItem = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  align-items: center;
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
  const navigate = useNavigate();

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
    const postExcluido = await excluirPost(postIdParaExcluir, token, true);
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
  

  const handleAtualizaDirecionandoPost = async (postId) => {
    const postPublicar = await excluirPost(postId, token, false);
    if (postPublicar) {
      const postsAtualizados = posts.filter((post) => post.id !== postId);
      setPosts(postsAtualizados);
      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    }
  };
  


  const [loading, setLoading] = useState(false);

  const handlePublishPost = async (postId) => {
    setLoading(true);
    const postToPublish = posts.find((post) => post.id === postId);
    if (!postToPublish) {
      console.error('Post não encontrado');
      setLoading(false);
      return;
    }

    try {

      const atualizaPost = await criarPost(token, postToPublish.titulo, postToPublish.descricao, 'published');

      if (atualizaPost) {
        await handleAtualizaDirecionandoPost(postId);
        navigate('/');
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId).concat(atualizaPost));
        console.log('Post publicado com sucesso!', atualizaPost);
      }
    } catch (error) {
      console.error('Erro ao publicar o post:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container $maxWidth="1000px">
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
                <Button>Editar</Button>
              </Link>
              <DangerButton onClick={() => handleDeletePost(post.id)}>
                Excluir
              </DangerButton>
              <PublishButton onClick={() => handlePublishPost(post.id)} disabled={loading || post.status === 'published'}>
                {loading ? 'Publicando...' : post.status === 'published' ? 'Publicado' : 'Publicar'}
              </PublishButton>
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
    </Container>
  );
};

export default PaginaAdmin;
