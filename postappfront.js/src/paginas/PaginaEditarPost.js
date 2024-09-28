import { usePost } from '../hooks/post';
import { useParams } from 'react-router-dom';
import { Container } from '../componentes/Container';
import { PostForm } from '../componentes/PostForm';

const PaginaEditarPost = () => {
  const params = useParams();
  const { post, loading, updatePost } = usePost(params.id);

  async function handleUpdate(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    updatePost(data.get('title'), data.get('content'));
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
