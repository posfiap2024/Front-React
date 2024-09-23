const BASE_URL = process.env.REACT_APP_BASE_URL;

export const obterUsuario = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`);
    if (!response.ok) {
      throw new Error('Falha ao obter usuário');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}

export const obterPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)
    const data = await response.json()

    return data.map(post => ({
      id: post.id,
      autor: '',
      titulo: post.title,
      descricao: post.content
    }))
  } catch (error) {
    console.log(error)
    return []
  }
};

export const criarPost = async (post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Falha ao criar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};

export const atualizarPost = async (id, post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
};

export const excluirPost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Falha ao excluir post');
    }
    return true;
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    throw error;
  }
};

export const obterPostPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao obter post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter post:', error);
    throw error;
  }
};
