import styled from 'styled-components';
import {SurveyKeyFrame} from '../../styles/Keyframes'

export const SurveyOutput = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 0;
  flex-direction: column;
  text-align: center;
  cursor: pointer;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    width: 60%;
    padding: 20px 0;

    div {
      width: 100%;
      background: white;
      padding: 0px 20px 50px;
      margin: 20px 0;
      border-radius: 10px;
      font-size: 24px;
      animation: ${SurveyKeyFrame} 0.8s;


      label {
        font-weight: 500;
        width: 100%;
        display: block;
        margin: 0;
        padding: 40px 0;
      }

      input {
        padding: 0 0 5px;
        width: 100%;
      }

      output {
        color: white;
        background-color:var(--text-color);
        padding: 5px;
        border-radius: 0 0 10px 10px;
        border: 1px solid transparent;
        font-weight: bold;
      }

      textarea {
        margin: 20px 0;
        background-color: var(--menu-color);
        width: 100%;
        padding: 10px;
        font-size: 18px;
        border-radius: 10px;
      }
    }

    button {
      font-size: 2em;
      margin: 35px 0;
    }

  h1 {
    padding: 30px 20px 20px;
  }
}

@media (max-width: 600px) {
    form {
      width: 100%;
    }
  }

  select {
    width: 100%;
    margin: 0.5em;
    padding: 1em;
    font-size: 1.5em;

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

  input[type=range] {
    height: 26px;
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
    }

  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 13px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: linear-gradient(to right, red,yellow,limegreen);
    border-radius: 25px;
    border: 0px solid #000101;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 35px;
    border-radius: 7px;
    background: var(--text-color);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.5px;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 13px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: var(--text-color);
    border-radius: 25px;
    border: 0px solid #000101;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: var(--text-color);
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 13px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: var(--text-color);
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-fill-upper {
    background: var(--text-color);
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background:var(--text-color);
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: var(--menu-color);
  }
  input[type=range]:focus::-ms-fill-upper {
    background: var(--menu-color);
  }

  textarea {
    border: 1px;
	  border-radius: 5px;
    height: 100px;
	  width: 80%;
    padding:40px;
    font-size: 16px;
    resize: none;

  }

label {
    margin: 1.8em 0;
    font-size: 22px;
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
  label:focus {outline:0;},
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
    &:disabled {
      pointer-events: none;
      background-color: grey;
    }
  }
`;

export const Message = styled.div`
display: flex;
align-content: center;
justify-content: center;
align-items: center;

h1 {
  text-align: center;
  padding: 30px 0 0;
}

`;
