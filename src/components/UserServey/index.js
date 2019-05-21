import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Success, Loading } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { SurveyOutput, Message } from "./styles";

const OutputDiv = styled.div`
	border-radius: 10px;
	border: 10px solid ;
  margin: 5px;
  padding:0;
`;

const FormSectionOne = styled.div `
  width:90%;
`;

const FormSectionTwo = styled.div `
  width:90%;

`;

class UserSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      notAnsweredSurvey: null,
      invitedToSurveys: null,
      sliderOneAnsw: 5,
      sliderTwoAnsw: 5,
      sliderThreeAnsw: 5,
      currentSurveyId: null,
    };
  }

  componentDidMount() {
    this.getInvitedToSurveys();
  }

  getInvitedToSurveys = () => {
    this.setState({loading: true});
    this.props.firebase.user(this.props.authUser.uid).child("invitedTo").on("value", snapshot => {
      const userSurveys = snapshot.val();
      if(userSurveys) {
        const invitedToSurveys = Object.keys(userSurveys).map(key => ({
          ...userSurveys[key],
          uid: key
        }));
        this.setState({invitedToSurveys: invitedToSurveys, loading: false}, () => {
          this.filterSurveys();
        })
      }
    })
  }

  filterSurveys = () => {
    console.log(this.state.invitedToSurveys[0].uid);
    this.props.firebase.survey(this.state.invitedToSurveys[0].uid).on("value", snapshot => {
      const notAnsweredSurvey = snapshot.val();
      if(notAnsweredSurvey) {
        this.setState({
          notAnsweredSurvey: notAnsweredSurvey,
          currentSurveyId: this.state.invitedToSurveys[0].uid
        });
      }
    })
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      success: true
    });
    this.pushToDB();
  };

  pushToDB = () => {
    const {
      sliderOneAnsw,
      sliderTwoAnsw,
      sliderThreeAnsw,
      questionOneAnsw,
      questionTwoAnsw
    } = this.state;

    this.props.firebase
      .survey(this.state.currentSurveyId)
      .child("answers")
      .push({
        sliderOneAnswers: sliderOneAnsw,
        sliderTwoAnswers: sliderTwoAnsw,
        sliderThreeAnswers: sliderThreeAnsw,
        questionOneAnswers: questionOneAnsw ? questionOneAnsw : null,
        questionTwoAnswers: questionTwoAnsw ? questionTwoAnsw : null
      });

    this.props.firebase.survey(this.state.currentSurveyId).child("answeredUsers").update({ [this.props.authUser.uid]: true });
    this.props.firebase.survey(this.state.currentSurveyId).child("invitedTo").update({[this.props.authUser.uid]: null});
    this.props.firebase.user(this.props.authUser.uid).child("answeredSurveys").update({ [this.state.currentSurveyId]: true });
    this.props.firebase.user(this.props.authUser.uid).child("invitedTo").update({[this.state.currentSurveyId]: null});
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      success: false
    });
  };

  componentWillUnmount() {
    this.props.firebase.user().off();
    this.props.firebase.survey().off();
  }

  render() {
    const {
      loading,
      success,
      notAnsweredSurvey,
      sliderOneAnsw,
      sliderTwoAnsw,
      sliderThreeAnsw,
      questionOneAnsw,
      questionTwoAnsw
    } = this.state;

    return (
      <div>
        {success ? <Success>Utvärderingen har lämnats!</Success> : null}
        {notAnsweredSurvey ? (
          <div>
<<<<<<< HEAD
            <Survey>
=======
>>>>>>> changed some styling for user-survey
              <SurveyOutput>
                <form onSubmit={event => this.onSubmit(event)}>
                <FormSectionOne>
                  <h1>Enkät - {notAnsweredSurvey.education} - {notAnsweredSurvey.week}</h1>
                  <label>{notAnsweredSurvey.sliderOne}</label>
                  <input
                    name="sliderOneAnsw"
                    value={sliderOneAnsw}
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                  />
                <OutputDiv>  <output  >{sliderOneAnsw}</output> </OutputDiv>
              
                  <label>{notAnsweredSurvey.sliderTwo}</label>
                  <input
                    name="sliderTwoAnsw"
                    value={sliderTwoAnsw}
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                  />
                 <OutputDiv> <output  >{sliderTwoAnsw}</output> </OutputDiv>

                  <label>{notAnsweredSurvey.sliderThree}</label>
                  <input
                    name="sliderThreeAnsw"
                    value={sliderThreeAnsw}
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                   />
                  <OutputDiv> <output>{sliderThreeAnsw}</output></OutputDiv>
                  </FormSectionOne>

                  <FormSectionTwo> 
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
<<<<<<< HEAD
=======
                  </FormSectionTwo> 

                  {isInvalid ?
>>>>>>> changed some styling for user-survey
                  <button type="submit">Skicka in svar</button>
                </form>
              </SurveyOutput>
          </div>
        ) : (
          <Message>
          <h1>Du har inga fler enkäter att besvara</h1>
          </Message>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(UserSurvey);
