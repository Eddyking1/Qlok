import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {FormStyle, Success} from '../../styles/GlobalStyle';
import {SignUpIcon} from '../../styles/Icons';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  educations: null,
  education: '',
  error: null,
  success: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  componentDidMount() {
    this.getEducationsFromDB();
  }

  onSubmit = event => {
    this.setState({success: true});
    const {username, email, passwordOne, education } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            education,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      })

    event.preventDefault();
  };

  getEducationsFromDB = () =>  {
    this.props.firebase.educations().once("value", snapshot => {
      const educationsObject = snapshot.val();
      const educationList = Object.keys(educationsObject).map(key => ({
        value: educationsObject[key],
        uid: key,
      }));
      this.setState({
        educations: educationList,
      })
    })
  }

  renderEducations = () => {
    var options = [];
    this.state.educations.forEach(education => {
      options.push(<option key={education.uid} value={education.uid}>{education.value}</option>)
    })
    return options;
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleChangeSelect = event => {
    this.setState({education: event.target.value});
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      education,
      educations,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' || education === '';

    return(
      <FormStyle>
      <form onSubmit={this.onSubmit}>
      <SignUpIcon/>
      {educations ?
        <select value={this.state.education} onChange={this.handleChangeSelect}>
          <option>Välj utbildning</option>
          {this.renderEducations()}
        </select>
      : null}

        <input name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Användarnamn"
        />
        <input name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Lösenord"
        />
        <input name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Bekräfta lösenord"
        />
        <button disabled={isInvalid} type="submit">Skapa konto!</button>

        {error && <p>{error.message}</p>}
      </form>
      </FormStyle>
    );
  }
}

const SignUpLink = () => (
  <p>
    Har du inget konto? <Link to={ROUTES.SIGN_UP}> <span> Skapa konto! </span></Link>
  </p>
);

const SignUpForm = compose (
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink };
