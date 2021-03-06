import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { LoadingKeyframe, SurveyKeyFrame } from "./Keyframes";

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

  .chartHeadline{
    font-size:3em;
    margin: 30px 60px;
  }
`;

const Success = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  background: #9ee49a;
  position: absolute;
  top: 50px;
  bottom: 0;
  animation: ${SurveyKeyFrame} 1s infinite ease-in-out;
  animation-iteration-count: 1;

  img {
    width: 200px;
  }
`;


const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;


  padding: 30px 0;
  background: var(--text-color);
  position: absolute;
  top: 50px;
  bottom: 0;

  img {
    width: 200px;
    animation: ${LoadingKeyframe} 1s infinite ease-in-out;
  }
`;

const FormStyle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  width: 100%;
  margin: 0;
  flex-direction: column;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    width: ${props => (props.fullWidth ? "80%" : "")};
    margin-top: 60px;
  }
  select {
    width: 100%;
    margin: 0.5em;
    padding: 1em;
    font-size: 1.5em;
    outline: none;
    text-align-last: center;

    select select {
      -moz-appearance: none; /* Firefox */
      -webkit-appearance: none; /* Safari and Chrome */
      color: var(--main-button-color);
      background-color: var(--main-button-color);
      }
    select::-ms-expand {
      display: none;
    }
  }

  input {
    font-size: 1.1em;
    border: none;
    border-radius:10px;
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
    width: 100%;
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
    padding: 0.5em 1em;
    margin: 2em 0;
    border: none;
    outline: none;
    background: var(--text-color);
    color: white;
    font-size: 1.7em;
    font-weight: bold;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
    &:disabled {
      pointer-events: none;
      background-color: grey;
    }
  }
  h1 {
    text-align: center;
    background-color: var(--text-color);
    padding: .8em 0;
    color: var(--background-color);
    width:100%;
  }

  p {
    padding: 1em 0 0;
    text-align: center;
    font-size: 1.2em;
  }
`;
export { GlobalStyle, FormStyle, Success, Loading };
