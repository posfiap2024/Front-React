import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaginaDetalhe = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetalhe = async () => {
      try {
        const resposta = await fetch(`http://localhost:3001/posts/${id}`);
        const resultado = await resposta.json();
        setPost(resultado);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter detalhes do post:', error);
        setLoading(false);
      }
    };

    fetchPostDetalhe();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        post && (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Status: {post.status}</p>
          </>
        )
      )}
    </div>
  );
};

export default PaginaDetalhe;