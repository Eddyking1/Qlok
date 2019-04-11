import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';
import {FormStyle, Success, Loading} from '../../styles/GlobalStyle';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
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
    // this.getCurrentWeek();
  }

  componentWillUnmount() {
  }

  // getLatestForm = () => {
  //   this.props.firebase.surveys().once('value', snapshot => {
  //     let surveys = snapshot.val();
  //     this.setState({
  //       sliderOne: survey.sliderOne,
  //       sliderTwo: survey.sliderTwo,
  //       sliderThree: survey.sliderThree,
  //       questionOne: survey.questionOne,
  //       questionTwo: survey.questionTwo,
  //     })
  //   })
  // }

  getCurrentEducation = () => {
    this.setState({loading: true});
    this.props.firebase.user(this.props.authUser.uid).once("value", snapshot => {
      const user = snapshot.val();
      if(user.education) {
        this.setState({
          currentEducation: user.education,
        })
        this.setState({loading: false});
      }
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
    this.setState({
      success: true,
    });

    const { sliderOne, sliderTwo, sliderThree, questionOne, questionTwo, currentEdcStudents, currentEducation} = this.state;
    this.props.firebase.surveys().push({
      sliderOne: sliderOne,
      sliderTwo: sliderTwo,
      sliderThree: sliderThree,
      questionOne: questionOne,
      questionTwo: questionTwo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      createdBy: this.props.authUser.uid,
      education: currentEducation,
      answered: "",
      chartAnswers: "",
      altAnswers: "",
    });
    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      success: false
    });
  }

  render() {
    const { sliderOne, sliderTwo, sliderThree, questionOne, questionTwo } = this.state;

    const isInvalid = sliderOne === '' || sliderTwo === '' || sliderThree === '';

    return (
      <div>
        {this.state.success ? <Success>Utvärderingen har skickats!</Success> : null }
        { !this.state.loading ?
          <FormStyle fullWidth>
            <h1>Skapa nytt formulär</h1>

            <form onSubmit={this.onSubmit}>
              <input
                name="sliderOne"
                value={sliderOne}
                onChange={this.onChange}
                type="text"
                placeholder="Fråga till diagram(*)"
              />
              <input
                name="sliderTwo"
                value={sliderTwo}
                onChange={this.onChange}
                type="text"
                placeholder="Fråga till diagram(*)"
              />
              <input
                name="sliderThree"
                value={sliderThree}
                onChange={this.onChange}
                type="text"
                placeholder="Fråga till diagram(*)"
              />
              <input
                name="questionOne"
                value={questionOne}
                onChange={this.onChange}
                type="text"
                placeholder="Skriv en fråga till studenterna"
              />
              <input
                name="questionTwo"
                value={questionTwo}
                onChange={this.onChange}
                type="text"
                placeholder="Skriva en fråga till studenterna"
              />
              <button disabled={isInvalid} type="submit">
                Skicka ut formulär
              </button>
            </form>
          </FormStyle>
          : <Loading>Website is loading..</Loading> }
        </div>
      );
    }
  }

  const condition = authUser => !!authUser;

  export default compose(
    withFirebase,
    withAuthorization(condition),
  )(CreateSurvey);
