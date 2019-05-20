import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Success, Loading } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { SurveyOutput } from "./styles";

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
      notAnsweredSurvey: null,
      invitedToSurveys: null,
      sliderOneAnsw: 0,
      sliderTwoAnsw: 0,
      sliderThreeAnsw: 0
    };
  }

  componentDidMount() {
    this.getInvitedToSurveys();
  }

  getInvitedToSurveys = () => {
    this.props.firebase.user(this.props.authUser.uid).child("invitedTo").on("value", snapshot => {
      const userSurveys = snapshot.val();
      if(userSurveys) {
        console.log("userSurveys", userSurveys);
        const invitedToSurveys = Object.keys(userSurveys).map(key => ({
          ...userSurveys[key],
          uid: key
        }));
        this.setState({invitedToSurveys: invitedToSurveys}, () => {
          console.log("invitedToSurveys", this.state.invitedToSurveys)
          this.filterSurveys();
        })
      }
    })
  }

  filterSurveys = () => {
    this.props.firebase.survey(this.state.invitedToSurveys[0].uid).on("value", snapshot => {
      const notAnsweredSurvey = snapshot.val();
      if(notAnsweredSurvey) {
        this.setState({
          notAnsweredSurvey: notAnsweredSurvey,
          currentSurveyId: this.state.invitedToSurveys[0].uid
        }, () => {
          console.log("currentSurveyId", this.state.currentSurveyId)
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
        questionOneAnswers: questionOneAnsw,
        questionTwoAnswers: questionTwoAnsw
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
    const isInvalid =
      sliderOneAnsw === "" || sliderTwoAnsw === "" || sliderThreeAnsw === "";
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
        {success ? <Success>Utvärderingen har lämmnats!</Success> : null}
        {notAnsweredSurvey ? (
          <Survey>
            <SurveyOutput>
              <form onSubmit={event => this.onSubmit(event)}>
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
                <button type="submit">Skicka in svar</button>
              </form>
            </SurveyOutput>
          </Survey>
        ) : (
          <h1>Du har inga fler enkäter att besvara</h1>
        )}
        {loading ? <Loading>Website is loading..</Loading> : null};
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(UserSurvey);
