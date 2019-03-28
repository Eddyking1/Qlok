import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignUpLink } from "../SignUp";
import { FormStyle } from "../../styles/GlobalStyle";
import styled from "styled-components";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PwForgetButton = styled.div`
  button {
    padding: 1.3em 1.3em;
    font-size: 1.5em;
  }
`;

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
        <form onSubmit={this.onSubmit}>
          <h1>Forgot password?</h1>
          <h2>This sends you an e-mail verification</h2>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <PwForgetButton>
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>
          </PwForgetButton>
          {error && <p>{error.message}</p>}
        </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>
      {" "}
      <span> Forgot Password? </span>
    </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
