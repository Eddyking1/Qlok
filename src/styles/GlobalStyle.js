import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --menu-color: #F3EAD6;
    --text-color: #203449;
    --main-button-color: #CF2E2E;
    --background-color: #FCFAF5;


    --search-field: hsl(220, 7%, 17%);
    --highlight-color: hsl(220, 7%, 27%);
    --toolbar-color: hsl(0, 0%, 98%);
    --accent-color: hsl(227, 58%, 65%);
    --remove-color: hsl(0, 38%, 50%);
    --remove-color-highlight: hsl(0, 49%, 70%);
    --offwhite: hsl(192, 15%, 94%);
    --muted: hsl(240, 0%, 46%);
    --favourite: hsl(51, 95%, 58%);
  }

  body {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: var(--background-color);
    color: var(--text-color);
    overflow-x:hidden;
  }

  * {
    box-sizing: border-box;
    padding: 0rem;
    margin: 0rem;
    font-family: sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

const FormStyle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 0;

  form {
    display: flex;
    justify-content:center;
    align-items:center;
    align-content:center;
    flex-direction: column;
  }

  input {
    font-size: 1.5em;
    border: none;
    background-image: none;
    background-color: --menu-color;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    text-align: center;
    padding: 1em;
    margin: 0.5em 0;
    outline: none;
    transition: transform 0.3s ease-in-out;

  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
  border: 1px solid var(--text-color);
  -webkit-text-fill-color: var(--text-color);
  -webkit-box-shadow: 0 0 0px 1000px var(--menu-color) inset;
  transition: background-color 5000s ease-in-out 0s;

  transition: transform 0.3s ease-in-out;

}
  input::placeholder {
    opacity: 1; /* Firefox */
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline-offset: 0px !important;
  }

  button {
    padding: 0.5em 1.5em;
    margin: 2em 0;
    border: none;
    outline: none;
    background: var(--text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.04);
    }
  }

  h1 {
    height: 2em;
    text-align: center;
  }

  p {
    padding: 1em 0 0;
    text-align: center;
    font-size: 1.2em;
  }
`;

export { GlobalStyle, FormStyle };
