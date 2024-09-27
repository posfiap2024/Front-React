import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  text-align: center;
  border-radius: 5px;
`;

const SocialLinks = styled.div`
  margin: 15px 0;
`;

const FooterText = styled.p`
  margin: 5px 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <a href="https://github.com/posfiap2024/Front-React" style={{ color: 'white' }}>GitHub</a>
      </SocialLinks>
      <FooterText>© 2024 Blog Posts. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

