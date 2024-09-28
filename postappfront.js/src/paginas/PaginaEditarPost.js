import { usePost } from '../hooks/post';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container } from '../componentes/Container';
import { PostForm } from '../componentes/PostForm';

const PaginaEditarPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { post, loading, updatePost } = usePost(params.id);

  async function handleUpdate({ title, content }) {
    updatePost(title, content);

    if (post) {
      setTimeout(() => {
        navigate('/admin');
      console.log('Post alterado com sucesso!');  
      }, 1000);
    } else {
      console.log('Erro ao editar post');
    }
  }

  if (loading) {
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Editar Post</h2>

      <PostForm
        post={post}
        onSubmit={handleUpdate}
      />
    </Container>
  );
};

export default PaginaEditarPost;
