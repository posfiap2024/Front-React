import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 0.875rem;
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  resize: vertical;
`;
