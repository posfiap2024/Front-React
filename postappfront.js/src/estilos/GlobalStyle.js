import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3 {
    margin-bottom: 20px;
    color: #2c3e50;
  }

  input, button, textarea {
    font-family: inherit;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }

  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }

  a {
    text-decoration: none;
    color: #3498db;
    transition: color 0.3s;
  }

  a:hover {
    color: #2980b9;
  }

  @media (max-width: 768px) {
    body {
      padding: 0 20px;
    }

    h1 {
      font-size: 1.5rem;
    }

    button {
      width: 100%;
    }
  }
`;

export default GlobalStyle;
