import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexto/AuthContext';

const NavbarContainer = styled.nav`
  background-color: #2c3e50;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
  border-radius: 5px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavbarLogo = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    color: #ecf0f1;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    background-color: #34495e;
    padding: 10px;
    position: absolute;
    top: 60px;
    left: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  
  &:hover {
    color: #ecf0f1;
    text-decoration: underline;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
  border-radius: 2px;
  transition: all 0.3s ease;

  ${props => props.isOpen && `
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavbarLogo to="/">Home</NavbarLogo>
      <Hamburger onClick={toggleMenu}>
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
      </Hamburger>
      <NavbarLinks isOpen={isOpen}>
        {user && (user.role === 'admin' || user.role === 'professor') ? (
          <>
            <NavbarLink to="/admin">Admin</NavbarLink>
            <NavbarLink to="/criar-post">Criar Post</NavbarLink>
          </>
        ) : <></>}
        {user ? (
          <NavbarLink to="/" onClick={logout}>Sair</NavbarLink>
        ) : (
          <NavbarLink to="/login">Login</NavbarLink>
        )}
      </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;