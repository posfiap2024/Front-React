
# Projeto de frontend para gerenciamento de Postagens

Este projeto é o complemento frontend da API de gerenciamento de postagens, desenvolvido utilizando React.js, com integração à API de backend que gerencia postagens e usuários.  O foco desta documentação é tratar do projeto de frontend da aplicação apenas. 
Para mais detalhes sobre o projeto de backend [clique aqui](https://github.com/posfiap2024/postappback.ts).

Link de demonstração de uso do projeto: https://www.link.do.video

O projeto de frontend está estruturado da seguinte forma:

- Framework: React.js
- Gerenciamento de Estado: React Context API
- Estilização: Styled Components
- Integração com API: API Fetch


## Dockerfile

O `Dockerfile` define a configuração para containerizar uma aplicação Node.js/React. Ele cria um ambiente Docker, instala dependências e inicia a aplicação na porta 3000.

1. **`FROM node:lts`**: Usa a versão LTS do Node.js como base para garantir um ambiente estável.
2. **`WORKDIR /usr/src/app`**: Define o diretório de trabalho do container.
3. **`COPY package*.json ./`**: Copia os arquivos de dependências para otimizar o cache de builds.
4. **`RUN npm install`**: Instala as dependências necessárias.
5. **`COPY . .`**: Copia o restante dos arquivos da aplicação.
6. **`EXPOSE 3000`**: Declara que a aplicação usa a porta 3000.
7. **`CMD ["npm", "start"]`**: Inicia a aplicação.


## Docker Compose

O arquivo `docker-compose.yml` configura uma aplicação com três serviços principais: **PostgreSQL**, **Backend** (Node.js API com NestJS) e **Frontend** (React.js). 

1. **Serviço `postgres`**:
   - Usa a imagem oficial do PostgreSQL versão 16.
   - Configura as variáveis de ambiente para o banco de dados (usuário, senha, banco).
   - Expõe a porta 5432 para comunicação com os outros serviços e armazena os dados em um volume persistente (`pgdata`).

2. **Serviço `backend`**:
   - O backend é uma API escrita em Node.js (NestJS) com um banco PostgreSQL.
   - Constrói o código da API a partir do diretório `./postappback.ts`.
   - Utiliza variáveis de ambiente para se conectar ao PostgreSQL e definir um segredo JWT.
   - Expõe a porta 3001 para que o frontend e outros clientes possam acessar a API.
   - Depende do serviço `postgres`, ou seja, o backend só será iniciado após o banco de dados estar pronto.

3. **Serviço `frontend`**:
   - O frontend é uma aplicação React.js que se comunica com o backend.
   - É construído a partir do diretório `./postappfront.js`.
   - Usa uma variável de ambiente para definir a URL base da API.
   - Expõe a porta 3000 para acessar a interface do usuário.
   - Depende do serviço `backend`, ou seja, só será iniciado quando o backend estiver rodando.

4. **Redes e Volumes**:
   - Duas redes são criadas: `public` para comunicação entre o frontend e o backend, e `private` para comunicação entre o backend e o PostgreSQL.
   - Um volume persistente `pgdata` é utilizado para armazenar os dados do banco.


## Passo a Passo para Configuração e Instalação da Aplicação com Docker

#### 1. **Instalar Docker e Docker Compose**
   - Verifique se o Docker e o Docker Compose estão instalados na sua máquina.
     - Para **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/).
     - Para **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/).

#### 2. **Estrutura do Projeto**
   - Certifique-se de que a estrutura do projeto esteja organizada da seguinte forma:
     ```
     .
     ├── docker-compose.yml
     ├── postappback.ts/       # Código do backend (NestJS API)
     └── postappfront.js/       # Código do frontend (React.js)
     ```

#### 3. **Configurar o `docker-compose.yml`**
   - O arquivo `docker-compose.yml` já está preparado para subir os containers para PostgreSQL, Backend e Frontend.

#### 4. **Construir e Rodar os Containers**
   - No diretório raiz, onde o arquivo `docker-compose.yml` está localizado, execute o comando:
     ```bash
     docker compose up --build
     ```
   - Este comando vai:
     - **Construir** as imagens do backend e do frontend com base nos diretórios especificados (`./postappback.ts` e `./postappfront.js`).
     - **Iniciar** os containers para o banco de dados PostgreSQL, o backend e o frontend.
   
#### 5. **Verificar os Containers Rodando**
   - Para verificar se todos os containers estão rodando corretamente, use o comando:
     ```bash
     docker ps
     ```
   - Você deve ver três containers ativos:
     - `postgres` rodando na porta 5432.
     - `backend` rodando na porta 3001.
     - `frontend` rodando na porta 3000.

#### 6. **Acessar a Aplicação**
   - **Frontend**: Abra o navegador e acesse a URL `http://localhost:3000` para visualizar a aplicação React.
   - **Backend**: Se necessário, você pode acessar a API diretamente em `http://localhost:3001`.
   
#### 7. **Gerenciar o Banco de Dados (Opcional)**
   - Para acessar o banco de dados PostgreSQL, você pode utilizar uma ferramenta como [`pgAdmin`](https://www.pgadmin.org/), [`DBeaver`](https://dbeaver.io/) ou um cliente de linha de comando:
     ```bash
     docker exec -it <postgres_container_id> psql -U root -d postapp
     ```

#### 8. **Encerrar os Containers**
   - Para parar todos os containers, use:
     ```bash
     docker compose down
     ```
   - Isso encerrará os containers e liberará os recursos.


## Estrutura do projeto

A estrutura do projeto segue um padrão comum de projetos em React, conforme a seguir, a partir da pasta `postappfront.js`:

### Diretório `public`
- **`index.html`**: Esse arquivo é o ponto de entrada para o React no navegador. O React é injetado dentro do elemento `<div id="root"></div>` desse arquivo. Qualquer configuração básica de SEO, inclusão de ícones, metadados, etc., também é feita nesse arquivo.

### Diretório `src`
Este é o diretório onde todo o código-fonte (_source code_) da aplicação React reside.

- **`componentes/`**: Contém os componentes React reutilizáveis do projeto. Componentes são partes da interface de usuário (UI) que podem ser reutilizadas, como botões, formulários, cabeçalhos, barras de navegação e rodapés, por exemplo.
  
- **`contexto/`**: Contém os contextos a serem utilizados. No caso desse projeto, só possui o `AuthContext`. Esse contexto é utilizado para compartilhar dados globalmente na aplicação, como o estado de autenticação do usuário, utilizando a API de contexto do React.

- **`estilos/`**: Este diretório deve conter arquivos de estilo, contendo apenas os estilos globais, já que a aplição usa o formato de  `styled components`.

- **`paginas/`**: Armazena os componentes de página. Cada arquivo neste diretório representa uma página diferente do aplicativo, como a `PaginaPrincipal.js`, `PaginaDetalhe.js`, `PaginaCriarPost.js`, etc. Essas páginas são renderizadas com base nas rotas configuradas.

- **`servicos/`**: Contém serviços e funções que fazem requisições HTTP para APIs externas, como as funções de `api.js`. Ele é responsável por gerenciar a comunicação com o backend.

- **`App.js`**: O componente raiz da aplicação React. Ele monta a estrutura da aplicação, configura as rotas e organiza a navegação e o layout principal.

- **`index.js`**: O ponto de entrada JavaScript da aplicação React. Ele renderiza o componente `App.js` dentro do `index.html`. Este é o arquivo onde a aplicação React realmente começa a funcionar, criando a raiz de renderização.

### Arquivos de configuração e outros:
- **`.dockerignore`**: Arquivo que lista arquivos e diretórios que devem ser ignorados pelo Docker quando ele constrói a imagem da aplicação. Isso ajuda a evitar a inclusão de arquivos desnecessários, como `node_modules`.

- **`.gitignore`**: Lista arquivos e diretórios que o Git deve ignorar, como `node_modules`, arquivos de cache e outros arquivos temporários ou específicos de ambiente.

- **`Dockerfile`**: Arquivo usado para construir uma imagem Docker da aplicação.

- **`package-lock.json` e `package.json`**: Esses arquivos contêm as dependências do projeto e seus metadados. O `package.json` define os scripts, dependências, e a versão do projeto, enquanto o `package-lock.json` (ou `pnpm-lock.yaml` no caso de usar `pnpm` como gerenciador de pacotes) garante que as versões específicas dos pacotes sejam instaladas.

## Estilos dos Componentes

Os componentes do projeto utilizam **Styled Components** para aplicar estilização diretamente no JavaScript, garantindo encapsulamento e reutilização de estilos de forma dinâmica e modular, permitindo dessa forma  associar estilos a componentes React utilizando a sintaxe de template literals, com fácil customização e gerenciamento de estilos dentro dos próprios componentes.

```javascript
import styled from 'styled-components';

const Botao = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ComponenteExemplo = () => {
  return <Botao>Clique Aqui</Botao>;
};
```

## Componentes principais

Nessa seção temos um resumo das páginas e suas funcionalidades implementadas.

  O arquivo `index.js` não é um componente em si, mas é o ponto de entrada da aplicação React.

  1. **Importações**:
    - React e ReactDOM para renderizar a aplicação.
    - `App` como o componente principal.
    - `AuthProvider` para fornecer o contexto de autenticação.

  2. **Criação da Raiz**:
    - `ReactDOM.createRoot` cria a raiz da aplicação e renderiza no elemento HTML com o ID `root`.

  3. **Renderização**:
    - `root.render` envolve o `App` em `AuthProvider` e `React.StrictMode`, garantindo que a autenticação e as verificações de desenvolvimento estejam disponíveis em toda a aplicação.


  O arquivo `App.js` gerencia as rotas e organiza os principais componentes da aplicação React.

  1. **Importações**: 
    - React e `react-router-dom` para roteamento (BrowserRouter, Routes, Route).
    - Componentes e páginas como `Navbar`, `Footer`, `PaginaPrincipal`, etc.
    - `styled-components` para estilizar componentes diretamente.

  2. **Componentes Estilizados**: 
    - **AppContainer**: Um container flexível que organiza a estrutura principal.
    - **MainContent**: Área central onde as páginas são renderizadas.

  3. **Estrutura**: 
    - `Router` envolve a aplicação.
    - `AppContainer` agrupa `Navbar`, `MainContent` e `Footer`.

  4. **Rotas**:
    - **"/"**: Página inicial (`PaginaPrincipal`).
    - **Dinâmicas**: Páginas de posts, criação, edição, admin e login.


  O arquivo `Navbar.js` implementa a barra de navegação responsiva da aplicação.

  1. **Importações**:
    - React e `useState` para gerenciar o estado do menu.
    - `Link` (react-router-dom) para navegação entre páginas.
    - `styled-components` para estilização modular.

  2. **Styled Components**:
    - **NavbarContainer**: Contém o layout principal, com responsividade.
    - **NavbarLogo**: Link estilizado que redireciona para a página inicial.
    - **NavbarLinks**: Contém os links de navegação, visíveis com o menu hamburguer em telas menores.
    - **Hamburger**: Ícone de menu responsivo para dispositivos móveis.

  3. **Estado e Função**:
    - `isOpen` controla a visibilidade do menu hamburguer.
    - **toggleMenu** alterna o estado do menu.

  4. **Renderização**:
    - Exibe links de navegação, alternando entre páginas com base no estado de autenticação e nas permissões do usuário (admin, professor ou estudante).

  5. **Responsividade**:
    - Adapta o layout para telas menores, utilizando um menu hamburguer para exibir ou ocultar links.


  O arquivo `Footer.js` implementa o rodapé da aplicação com React e `styled-components` para estilização modular.

  1. **Importações**:
    - React e `styled-components` para construir e estilizar o rodapé.
    - Ícones do `react-icons/fa` (como Facebook, Twitter e Instagram), embora não estejam em uso.

  2. **Componentes Estilizados**:
    - **FooterContainer**: Define o layout do rodapé com fundo escuro, texto branco, centralização e bordas arredondadas.
    - **SocialLinks**: Espaça links sociais (como GitHub).
    - **FooterText**: Exibe o texto de direitos autorais com espaçamento.

  3. **Componente `Footer`**:
    - Exibe um link para o GitHub e o texto de direitos autorais dentro de `FooterContainer`.

  O arquivo `api.js` é o módulo responsável pela interação com os endpoints do backend, contendo todas as funções utilizadas pelos componentes nessa integração. A URL base da API é configurada com a variável de ambiente `REACT_APP_BASE_URL` e as funções da API seguem o padrão REST, com autenticação via token JWT para rotas protegidas. abaixo estão as funções contidas nesse arquivo:

  1. **obterPosts**: Recupera a lista de postagens públicas. (GET `/posts`)
  2. **obterPostsAdmin**: Recupera todas as postagens, incluindo não publicadas (para administradores). Requer JWT. (GET `/posts/admin`)
  3. **searchPost**: Pesquisa postagens com base em um termo. (GET `/posts/search?q={query}`)
  4. **criarPost**: Cria uma nova postagem. Requer JWT. (POST `/posts`)
  5. **atualizarPost**: Atualiza uma postagem existente. (PUT `/posts/{id}`)
  6. **excluirPost**: Exclui uma postagem. Requer JWT. (DELETE `/posts/{id}`)
  7. **obterPostPorId**: Obtém detalhes de uma postagem. (GET `/posts/{id}`)
  8. **logarUsuario**: Realiza login e retorna um token JWT. (POST `/auth/login`)
  9. **obterUsuario**: Recupera os dados do usuário autenticado. Requer JWT. (GET `/auth/user`)


  O arquivo `AuthContext` define um **contexto de autenticação** no React, gerenciando o estado de autenticação (token e usuário) fornecendo funcionalidades de login e logout para toda a aplicação.

  1. **AuthContext**: Criado com `createContext()` para compartilhar o estado de autenticação entre os componentes.
    
  2. **AuthProvider**: Envolve a aplicação e provê os seguintes estados e funções:
    - **token**: Estado que armazena o token JWT.
    - **user**: Estado que armazena as informações do usuário autenticado.
    - **login**: Função que realiza login, obtém o token e as informações do usuário, e atualiza o estado.
    - **logout**: Função que limpa o token e os dados do usuário.

  3. **Persistência**: `useEffect` garante que o token e as informações do usuário sejam salvas ou removidas sempre que mudarem.

  4. **useAuth**: Hook personalizado que facilita o acesso ao contexto de autenticação em outros componentes.


## Páginas

Nessa seção temos um resumo das páginas e suas funcionalidades implementadas.

  O arquivo `PaginaPrincipal.js` implementa a página principal da aplicação React, exibindo posts com pesquisa e paginação.

  1. **Importações**:
    - React e hooks (`useEffect`, `useState`) para estado e efeitos.
    - `Link` para navegação e `styled-components` para estilos.
    - Funções de API (`obterPosts`, `searchPost`) para carregar e pesquisar posts.

  2. **Estado**:
    - `posts` (posts da API), `currentPage` (página atual), e `searchQuery` (termo de busca).
    - Exibe 6 posts por página.

  3. **Efeitos (`useEffect`)**:
    - Busca inicial de posts com `obterPosts`.
    - Busca atualizada quando `searchQuery` muda com `searchPost`.

  4. **Paginação**:
    - Funções para navegar entre páginas, como `handleNextPage`.

  5. **Renderização**:
    - Exibe posts com título, autor, descrição e link para detalhes. Inclui busca e barra de paginação.


  O componente `PaginaPost` é responsável por exibir os detalhes de uma postagem específica, utilizando **React** e o hook `useParams` para obter o ID do post a partir da URL.

  1. **Estados**:
    - `post`: Armazena os dados da postagem.
    - `loading`: Indica se os dados ainda estão sendo carregados.
    - `error`: Armazena mensagens de erro, caso ocorra algum problema durante a obtenção dos dados.

  2. **Efeito (`useEffect`)**:
    - Ao carregar a página, chama a função `obterPostPorId` para buscar os detalhes do post com base no ID. O estado é atualizado com os dados da postagem ou com uma mensagem de erro se a requisição falhar.

  3. **Renderização Condicional**:
    - Exibe uma mensagem de "Carregando..." enquanto os dados estão sendo buscados.
    - Caso ocorra um erro, exibe a mensagem de erro.
    - Se o post for encontrado, exibe o título e o conteúdo da postagem; caso contrário, informa que o post não foi encontrado.


  O componente `PaginaLogin` é responsável por exibir o formulário de login e autenticar o usuário.

  1. **Estados**:
    - `username`: Armazena o nome de usuário inserido.
    - `password`: Armazena a senha inserida.
    - `error`: Armazena mensagens de erro, como falhas no login.

  2. **Autenticação e Navegação**:
    - Utiliza o hook `useAuth` para acessar o contexto de autenticação e realizar o login.
    - O hook `useNavigate` é usado para redirecionar o usuário após o login.
    - Se o login for bem-sucedido e o usuário for um administrador ou professor, ele é redirecionado para a área administrativa; caso contrário, para a página inicial.

  3. **Função `handleLogin`**:
    - Executada ao enviar o formulário de login.
    - Chama a função `login` para autenticar o usuário.
    - Exibe uma mensagem de erro se o login falhar (credenciais inválidas).

  4. **Renderização**:
    - Exibe um formulário de login com campos para nome de usuário e senha.
    - Se ocorrer um erro de autenticação, exibe a mensagem de erro.


  O componente `PaginaEditarPost` permite que o usuário edite um post existente.

  1. **Estados**:
    - `titulo`: Armazena o título do post.
    - `conteudo`: Armazena o conteúdo do post.

  2. **Efeitos Colaterais**:
    - O hook `useEffect` é utilizado para carregar os dados do post atual quando a página é carregada. Ele simula o carregamento do título e conteúdo do post com base no `id` passado nos parâmetros da rota.

  3. **Função `handleUpdate`**:
    - Executada ao submeter o formulário.
    - Exibe no console os dados atualizados do post (título e conteúdo).
    - Inclui uma lógica de atualização futura para enviar as alterações ao backend.

  4. **Renderização**:
    - Exibe um formulário com campos para editar o título e o conteúdo do post.
    - Ao salvar as alterações, a função `handleUpdate` é acionada.


  O componente `PaginaDetalhe` exibe os detalhes de um post específico.

  1. **Estados**:
    - `post`: Armazena os dados do post recuperado.
    - `loading`: Indica se os dados ainda estão sendo carregados.

  2. **Efeito Colateral**:
    - O hook `useEffect` é usado para buscar os detalhes do post usando a função `obterPostPorId`, com base no `id` da URL. Quando a requisição é concluída, os dados do post são armazenados no estado.

  3. **Renderização**:
    - Se os dados ainda estiverem sendo carregados, exibe uma mensagem "Carregando...".
    - Caso contrário, exibe o título, conteúdo e status do post, caso ele seja encontrado.

  O componente `PaginaCriarPost` permite que o usuário crie um novo post.

  1. **Estados**:
    - `titulo`: Armazena o título do post.
    - `conteudo`: Armazena o conteúdo do post.
    - `error`: Armazena mensagens de erro se ocorrerem.

  2. **Autenticação**:
    - O `token` é obtido do contexto de autenticação (`AuthContext`) para autorizar a criação do post.

  3. **Função `handleSubmit`**:
    - Verifica se os campos obrigatórios estão preenchidos.
    - Chama a função `criarPost` para enviar o novo post ao servidor.
    - Se o post for criado com sucesso, limpa os campos e redireciona o usuário para a página de administração. Caso contrário, exibe uma mensagem de erro.

  4. **Renderização**:
    - Exibe um formulário com campos para o título e o conteúdo do post.
    - Mostra mensagens de erro se houver falhas na criação do post.

  O componente `PaginaAdmin` exibe um painel de administração onde os usuários podem gerenciar posts.

  1. **Estados**:
    - `posts`: Armazena a lista de posts carregados do servidor.
    - `postIdParaExcluir`: Armazena o ID do post que está prestes a ser excluído.
    - `mostrarModal`: Controla a exibição do modal de confirmação de exclusão.
    - `mostrarAlerta`: Controla a exibição de um alerta de sucesso após a exclusão de um post.

  2. **Autenticação**:
    - O `token` é obtido do `AuthContext` para autorizar as operações de administração.

  3. **Funções principais**:
    - `carregarPosts`: Carrega a lista de posts disponíveis para administração, utilizando o token para acessar a API.
    - `handleDeletePost`: Define o ID do post a ser excluído e exibe o modal de confirmação.
    - `handleConfirmDelete`: Exclui o post confirmado e atualiza a lista de posts, além de exibir um alerta de sucesso por alguns segundos.

  4. **Renderização**:
    - Lista os posts com botões para edição e exclusão.
    - Exibe um modal de confirmação ao tentar excluir um post e um alerta de sucesso após a exclusão.
