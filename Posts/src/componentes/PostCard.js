import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <div>
    <h3>{post.titulo}</h3>
    <p>{post.autor}</p>
    <p>{post.descricao}</p>
    <Link to={`/post/${post.id}`}>Ler mais</Link>
  </div>
);

export default PostCard;
