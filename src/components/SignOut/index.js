import React from "react";

import { SignOut } from "./styles";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <SignOut type="button" onClick={firebase.doSignOut}>
    Logga ut
  </SignOut>
);

export default withFirebase(SignOutButton);
