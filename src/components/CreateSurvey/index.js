import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';
import {FormStyle} from '../../styles/GlobalStyle';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sliderOne: "",
      sliderTwo: "",
      sliderThree: "",
      questionOne: "",
      questionTwo: "",
    };
  }

  componentDidMount() {
    // this.getLatestForm();
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

  onSubmit = (event) => {
    const { sliderOne, sliderTwo, sliderThree, questionOne, questionTwo } = this.state;

    this.props.firebase.surveys().push({
      sliderOne: sliderOne,
      sliderTwo: sliderTwo,
      sliderThree: sliderThree,
      questionOne: questionOne,
      questionTwo: questionTwo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      createdBy: this.props.authUser.uid,
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
            <h1>Skapa nytt formulär</h1>
            <form onSubmit={this.onSubmit}>
              <input
                name="sliderOne"
                value={sliderOne}
                onChange={this.onChange}
                type="text"
                placeholder="First slider"
              />
              <input
                name="sliderTwo"
                value={sliderTwo}
                onChange={this.onChange}
                type="text"
                placeholder="Second slider"
              />
              <input
                name="sliderThree"
                value={sliderThree}
                onChange={this.onChange}
                type="text"
                placeholder="Third slider"
              />
              <input
                name="questionOne"
                value={questionOne}
                onChange={this.onChange}
                type="text"
                placeholder="Optional question 1"
              />
              <input
                name="questionTwo"
                value={questionTwo}
                onChange={this.onChange}
                type="text"
                placeholder="Optional question 2"
              />
              <button disabled={isInvalid} type="submit">
                Skicka ut formulär
              </button>
            </form>
          </FormStyle>
          : <h1>Website is loading...</h1> }
        </div>
      );
    }
  }

  const condition = authUser => !!authUser;

  export default compose(
    withFirebase,
    withAuthorization(condition),
  )(CreateSurvey);
