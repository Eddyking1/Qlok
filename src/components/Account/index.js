import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import styled from 'styled-components';

const AccountEmail = styled.h1`
    text-align: center;
    background-color: var(--text-color);
    padding: 1em 0;
    color: var(--background-color);
`;

const AccountForm = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 50px
    flex-direction: column;

    form {
      display: flex;
      justify-content:center;
      align-items:center;
      align-content:center;
      flex-direction: column;
      padding: 30px;

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
      }

      button {
        padding: 1.3em 1.3em;
        font-size: 1.5em;
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
         <PasswordForgetForm />
       </AccountForm>
     </div>
   )}
   </AuthUserContext.Consumer>
 );
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
