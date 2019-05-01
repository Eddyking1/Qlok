import React, { Component } from 'react';
import {compose} from 'recompose';
import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import {FormStyle, Success, Loading} from '../../styles/GlobalStyle';
import styled from 'styled-components';

const Survey = styled.div`
  width: 100%;
  height: 40%;
  text-align: center;
  cursor: pointer;
`;

class UserSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      currentUser: null,
      notAnsweredSurvey: null,
      sliderOneAnsw: 0,
      sliderTwoAnsw: 0,
      sliderThreeAnsw: 0,
    };
  }

  filterSurveys = () => {
    this.setState({notAnsweredSurvey: this.state.surveys[0], currentSurveyId: this.state.surveys[0].uid});
  }

  componentDidMount() {
    this.loadSurveysFromDB();
  }

  loadSurveysFromDB = () => {
   this.props.firebase.surveys().on("value", snapshot => {
     const surveysObject = snapshot.val();
     if (surveysObject) {
       const surveyList = Object.keys(surveysObject).map(key => ({
         ...surveysObject[key],
         uid: key
       }));

       this.setState({ surveys: surveyList}, () => {
         this.filterSurveys();
       });
     }
   });
  };

  showSurvey = (event) => {
    this.setState({open: true});
    console.log(this.state.open);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      success: true,
    });

    this.pushToDB();

  }

  pushToDB = () => {
    const {sliderOneAnsw, sliderTwoAnsw, sliderThreeAnsw, questionOneAnsw, questionTwoAnsw} = this.state;
    this.props.firebase.survey(this.state.currentSurveyId).child('answers').push({
      sliderOneAnswers: sliderOneAnsw,
      sliderTwoAnswers: sliderTwoAnsw,
      sliderThreeAnswers: sliderThreeAnsw,
      questionOneAnswers: questionOneAnsw,
      questionTwoAnswers: questionTwoAnsw,
    });

    this.props.firebase.survey(this.state.currentSurveyId).child('answeredUsers').update({ [this.props.authUser.uid]: true })
    this.props.firebase.user(this.props.authUser.uid).child('answeredSurveys').update({ [this.state.currentSurveyId]: true })
}
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      success: false
    });
  }

  render() {
    const isInvalid = sliderOneAnsw === '' || sliderTwoAnsw === '' || sliderThreeAnsw === '';
    const { loading, success, notAnsweredSurvey, sliderOneAnsw, sliderTwoAnsw, sliderThreeAnsw, questionOneAnsw, questionTwoAnsw} = this.state;

    return (
      <div>
        {success ? <Success>Utvärderingen har lämmnats!</Success> : null }
        { !loading && notAnsweredSurvey ?
          <Survey>
          <h1>survey</h1>
            <FormStyle>
              <form onSubmit={(event) => this.onSubmit(event)}>
                <label>{notAnsweredSurvey.sliderOne}</label>
                <input
                  name="sliderOneAnsw"
                  value={sliderOneAnsw}
                  onChange={this.onChange}
                  type="range"
                  min="0" max="10"
                  step="1"
                />
                <label>{notAnsweredSurvey.sliderTwo}</label>
                <input
                  name="sliderTwoAnsw"
                  value={sliderTwoAnsw}
                  onChange={this.onChange}
                  type="range"
                  min="0" max="10"
                  step="1"
                />
                <label>{notAnsweredSurvey.sliderThree}</label>
                <input
                  name="sliderThreeAnsw"
                  value={sliderThreeAnsw}
                  onChange={this.onChange}
                  type="range"
                  min="0" max="10"
                  step="1"
                />
                <label>{notAnsweredSurvey.questionOne}</label>
                <textarea
                  name="questionOneAnsw"
                  value={questionOneAnsw}
                  onChange={this.onChange}
                  type="text"
                  placeholder="svar..."
                />
                <label>{notAnsweredSurvey.questionTwo}</label>
                <textarea
                  name="questionTwoAnsw"
                  value={questionTwoAnsw}
                  onChange={this.onChange}
                  type="text"
                  placeholder="svar..."
                />
                <button type="submit">
                  Skicka in svar
                </button>
              </form>
            </FormStyle>
          </Survey>
          : <Loading>Website is loading..</Loading> }
        </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(UserSurvey);
