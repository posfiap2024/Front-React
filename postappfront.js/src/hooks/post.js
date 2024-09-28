import { useEffect, useState } from "react";
import { useFetch } from "./fetch";

export function usePost(id) {
  const fetch = useFetch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost();
  }, [id]);

  async function getPost() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
      const dados = await response.json();
      setPost(dados);
    } catch (error) {
      console.log('Erro ao carregar post:', error);
    } finally {
      setLoading(false);
    }
  };

  async function updatePost(title, content) {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
    } catch (error) {
      console.log('Erro ao atualizar post:', error);
    }
  }

  return { post, loading, updatePost }
}
