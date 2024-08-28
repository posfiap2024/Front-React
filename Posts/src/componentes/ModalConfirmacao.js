import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  margin: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalConfirmacao = ({ showModal, setShowModal, onConfirm }) => {
  if (!showModal) return null;

  return (
    <ModalBackground>
      <ModalContent initial={{ y: -200 }} animate={{ y: 0 }}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir este post?</p>
        <Button onClick={onConfirm}>Confirmar</Button>
        <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      </ModalContent>
    </ModalBackground>
  );
};

export default ModalConfirmacao;
