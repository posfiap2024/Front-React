import styled from 'styled-components';

export const Button = styled.button`
  width: ${props => props.$fill ? '100%' : 'auto'};
  padding: 0.625rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;  

 export const PublishButton = styled(Button)`
  background-color: ${(props) => (props.disabled ? '#6c757d' : '#28a745')};
  &:hover {
    background-color: ${(props) => (props.disabled ? '#6c757d' : '#218838')}; 
  }
`;
