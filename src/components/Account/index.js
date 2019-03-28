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

    form {
      display: flex;
      justify-content:center;
      align-items:center;
      align-content:center;
      flex-direction: column;
      padding: 50px;
    }
`;

const AccountPage = () => (
 <AuthUserContext.Consumer>
   {authUser => (
     <div>
       <AccountEmail>Inloggad som: {authUser.email}</AccountEmail>
       <AccountForm>
         <PasswordForgetForm />
         <PasswordChangeForm />
       </AccountForm>
     </div>
   )}
   </AuthUserContext.Consumer>
 );
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
