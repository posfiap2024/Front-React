import { useState } from 'react';
import styled from 'styled-components';
import { Form, FormField, Label, Input, Textarea } from './Form';
import { Button } from './Button';

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: red;
`;

export function PostForm({ post = {}, onSubmit }) {
  const [errors, setError] = useState({
    title: '',
    content: '',
  });

  function validate(data) {
    const { title, content } = Object.fromEntries(data);
    let errors = null;

    if (!title) {
      errors = errors ?? {}
      errors.title = 'O título é obrigatório';
    }

    if (!content) {
      errors = errors ?? {}
      errors.content = 'O conteúdo é obrigatório';
    }

    return { title, content, errors };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const { title, content, errors } = validate(data);

    if (errors) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    onSubmit({ title, content });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="title">Título</Label>

        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Input
          id="title"
          type="text"
          name="title"
          defaultValue={post.title}
        />
      </FormField>

      <FormField>
        <Label htmlFor="content">Conteúdo</Label>

        {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}

        <Textarea
          id="content"
          rows="8"
          name="content"
          defaultValue={post.content}
        />
      </FormField>

      <Button type="submit">Salvar Alterações</Button>
    </Form>
  )
}
