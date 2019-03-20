import React from 'react';

import {SignOut} from './styles';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
<SignOut type="button" onClick={firebase.doSignOut}>
  Sign Out
</SignOut>
);

export default withFirebase(SignOutButton);
