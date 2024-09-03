const BASE_URL = ''; 

//export const obterPosts = async () => {
//  try {
//    const response = await fetch(`${BASE_URL}/posts`);
//    if (!response.ok) {
//      throw new Error('Falha ao obter posts');
//    }
//    return await response.json();
//  } catch (error) {
//    console.error('Erro ao obter posts:', error);
//    throw error;
//  }
//};

export const obterPosts = async () => {
  // dados mockados para testes até integrar serviço
  return [
    { id: 1, titulo: "Post 1", autor: "Kevin James", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { id: 2, titulo: "Post 2", autor: "Rogerio Anderson", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  },
    { id: 3, titulo: "Post 3", autor: "Hugo Souza", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  },
    { id: 4, titulo: "Post 4", autor: "José Fernandez", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { id: 5, titulo: "Post 5", autor: "João da Silva", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  },
    { id: 6, titulo: "Post 6", autor: "Armando Rodrigues", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  },
    { id: 7, titulo: "Post 7", autor: "Juscelino Souza", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { id: 8, titulo: "Post 8", autor: "Maria dos Santos", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  },
    { id: 9, titulo: "Post 9", autor: "João da Silva", descricao: "testando buscador"  },
  ];
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



