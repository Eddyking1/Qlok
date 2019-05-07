import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { FormStyle } from "../../styles/GlobalStyle";
import { SignUpIcon } from "../../styles/Icons";

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  educations: null,
  education: "",
  adminKey: "",
  error: null,
  success: false
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getEducationsFromDB();
  }

  onSubmit = event => {
    this.setState({ success: true });
    const { username, email, passwordOne, education, adminKey } = this.state;
    const adminKeyTrue = "1111";

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        if(adminKey === adminKeyTrue) {
          this.props.firebase.education(education).child("admins").update({[authUser.user.uid]: true});
        } else {
          this.props.firebase.education(education).child("participants").update({[authUser.user.uid]: true});
        }
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          education
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  getEducationsFromDB = () => {
    this.props.firebase.educations().once("value", snapshot => {
      const educationsObject = snapshot.val();
      const educationList = Object.keys(educationsObject);
      this.setState({
        educations: educationList
      });
    });
  };

  renderEducations = () => {
    var options = [];
    this.state.educations.forEach(education => {
      options.push(
        <option key={education} value={education}>
          {education}
        </option>
      );
    });
    return options;
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeSelect = event => {
    this.setState({ education: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      education,
      educations,
      adminKey,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      education === "";

    return (
      <FormStyle>
        <form onSubmit={this.onSubmit}>
          <SignUpIcon />
          {educations ? (
            <select
              value={this.state.education.uid}
              onChange={this.handleChangeSelect}
            >
              <option>Välj utbildning</option>
              {this.renderEducations()}
            </select>
          ) : null}

          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Användarnamn"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Lösenord"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Bekräfta lösenord"
          />

          <input
            name="adminKey"
            value={adminKey}
            onChange={this.onChange}
            type="password"
            placeholder="Admin verifieringskod"
          />

          <button disabled={isInvalid} type="submit">
            Skapa konto!
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </FormStyle>
    );
  }
}

const SignUpLink = () => (
  <p>
    Har du inget konto?{" "}
    <Link to={ROUTES.SIGN_UP}>
      {" "}
      <span> Skapa konto! </span>
    </Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
