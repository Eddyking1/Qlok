import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import styled from 'styled-components';

const AccountEmail = styled.h1`
    text-align: center;
    background-color: var(--text-color);
    padding: .8em 0;
    color: var(--background-color);

    @media (max-width: 600px) {
        width: 100%;
        font-size:1.3em;
      }
`;

const AccountForm = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 50px 0;
    flex-direction: column;



    form {
      display: flex;
      justify-content:center;
      align-items:center;
      align-content:center;
      flex-direction: column;
      /* padding: 30px; */


      h1 {
        padding: 0 0 20px;

        @media (max-width: 600px) {
            font-size:1.7em;
          }
      }

      h2 {
        text-align: center;
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
        width: 100%;
        border-radius: 10px;
      }

      button {
        margin: 20px 0 0;
        padding: .8em;
        font-size: 1.5em;
        background: var(--text-color);
        color: white;
        border-radius: 10px;

        &:disabled {
          opacity: .4;
        }
      }
    }
`;

const AccountPage = () => (
 <AuthUserContext.Consumer>
   {authUser => (
     <div>
       <AccountEmail>Inloggad som: {authUser.email}</AccountEmail>
       <AccountForm>
         <PasswordChangeForm />
       </AccountForm>
     </div>
   )}
   </AuthUserContext.Consumer>
 );
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
