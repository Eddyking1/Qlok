import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';
import {FormStyle} from '../../styles/GlobalStyle';

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sliderOne: "",
      sliderTwo: "",
      sliderThree: "",
      questionOne: "",
      questionTwo: "",
      currentEducation: "",
    };
  }

  componentDidMount() {
    this.getCurrentEducation();
    // this.getEductationUsersFromDB();
    this.getCurrentWeek();
  }

  componentWillUnmount() {
  }

  getLatestForm = () => {
    this.props.firebase.surveys().once('value', snapshot => {
      let surveys = snapshot.val();
      this.setState({

      })
    })
  }

  // getEductationUsersFromDB = () => {
  //   this.props.firebase.users().on("value", snapshot => {
  //     let usersObject = snapshot.val();
  //
  //     const users = Object.keys(usersObject).map(key => ({
  //       ...usersObject[key],
  //       uid: key,
  //       completed: false,
  //     }));
  //
  //
  //     let currentEdcUsers = users.filter(user => user.education === this.state.currentEducation);
  //     this.setState({
  //       currentEdcStudents: currentEdcUsers,
  //     })
  //   })
  // }


  onSubmit = (event) => {
    const { sliderOne, sliderTwo, sliderThree, questionOne, questionTwo, currentEdcStudents, currentEducation} = this.state;

    this.props.firebase.survey().update({
      sliderOne: sliderOne,
      sliderTwo: sliderTwo,
      sliderThree: sliderThree,
      questionOne: questionOne,
      questionTwo: questionTwo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      createdBy: this.props.authUser.uid,
      answered: "",
      chartAnswers: "",
      altAnswers: "",
    });
    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { sliderOne, sliderTwo, sliderThree, questionOne, questionTwo } = this.state;

    const isInvalid = sliderOne === '' || sliderTwo === '' || sliderThree === '';

    return (
      <div>
        { !this.state.loading ?
          <FormStyle fullWidth>
            <form onSubmit={this.onSubmit}>
              <button disabled={isInvalid} type="submit">
                Skicka ut formulär
              </button>
            </form>
          </FormStyle>
          : <h1>Webbsidan laddar...</h1> }
        </div>
      );
    }
  }

  const condition = authUser => !!authUser;

  export default compose(
    withFirebase,
    withAuthorization(condition),
  )(Survey);
