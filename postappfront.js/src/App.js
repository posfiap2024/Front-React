import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import PaginaPrincipal from './paginas/PaginaPrincipal';
import PaginaDetalhe from './paginas/PaginaDetalhe';
import PaginaPost from './paginas/PaginaPost';
import PaginaCriarPost from './paginas/PaginaCriarPost';
import PaginaEditarPost from './paginas/PaginaEditarPost';
import PaginaAdmin from './paginas/PaginaAdmin';
import PaginaLogin from './paginas/PaginaLogin';
import Footer from './componentes/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/post/:id" element={<PaginaPost />} />
            <Route path="/posts/:id" element={<PaginaDetalhe />} />
            <Route path="/criar-post" element={<PaginaCriarPost />} />
            <Route path="/editar-post/:id" element={<PaginaEditarPost />} />
            <Route path="/admin" element={<PaginaAdmin />} />
            <Route path="/login" element={<PaginaLogin />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
