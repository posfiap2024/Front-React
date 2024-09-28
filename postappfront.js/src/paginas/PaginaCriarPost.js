import { useAuth } from '../contexto/AuthContext';
import { criarPost } from '../servicos/api';
import { useNavigate } from 'react-router-dom';
import { Container } from '../componentes/Container';
import { PostForm } from '../componentes/PostForm';

const PaginaCriarPost = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Utilizando o token do AuthContext

  async function handleSubmit ({ title, content }) {
    const post = await criarPost(token, title, content);

    if (post) {
      navigate('/admin');
    } else {
      console.log('Erro ao criar post');
    }
  };

  return (
    <Container>
      <h2>Criar Novo Post</h2>
      <PostForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default PaginaCriarPost;
