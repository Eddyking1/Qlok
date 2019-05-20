import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { FormStyle, Success, Loading } from "../../styles/GlobalStyle";

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
      participants: undefined,
      placeholders: "",
      surveys: undefined,
      week: ""
    };
  }

  componentDidMount() {
    this.getCurrentEducation();
    this.loadSurveysFromDB();
  }

  getCurrentEducation = () => {
    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.authUser.uid)
      .once("value", snapshot => {
        const user = snapshot.val();
        if (user.education) {
          this.setState({
            currentEducation: user.education
          }, () => {
            this.getParticipantsFromDB();
          });
        }
      });
  };

  getParticipantsFromDB = () => {
    this.props.firebase.education(this.state.currentEducation).child("participants").on("value", snapshot => {
      let participants = snapshot.val();
      if(participants) {
        this.setState({participants: Object.keys(participants), loading: false});
      }
      console.log(this.state.participants);

    });
  }

  pushSurveyToParticipants = (surveyId) => {
    const {participants} = this.state;
    for (let i = 0; i < participants.length; i++) {
      this.props.firebase.user(participants[i]).child("invitedTo").update({[surveyId]: true});
    }
  }

  pushParticipantsToSurvey = (surveyId) => {
    const {participants} = this.state;
    for (let i = 0; i < participants.length; i++) {
      this.props.firebase.survey(surveyId).child("invitedTo").update({[participants[i]]: true});
    }
  }

  onSubmit = event => {
    this.setState({
      success: true
    });

    const {
      sliderOne,
      sliderTwo,
      sliderThree,
      questionOne,
      questionTwo,
      currentEdcStudents,
      currentEducation,
      week
    } = this.state;
    this.props.firebase.surveys().push({
      sliderOne: sliderOne,
      sliderTwo: sliderTwo,
      sliderThree: sliderThree,
      questionOne: questionOne,
      questionTwo: questionTwo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      createdBy: this.props.authUser.uid,
      education: currentEducation,
      week: week
    }).then((snap) => {
     const key = snap.key
     this.pushSurveyToParticipants(key);
     this.pushParticipantsToSurvey(key);
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      success: false
    });
    console.log(this.state.week);
  };

  loadSurveysFromDB = () => {
    this.props.firebase.surveys().on("value", snapshot => {
      const surveysObject = snapshot.val();
      if (surveysObject) {
        const surveyList = Object.keys(surveysObject).map(key => ({
          ...surveysObject[key],
          uid: key
        }));

        this.setState(
          {
            surveys: surveyList
          },
          () => {
            this.keepTypedValue();
          }
        );
      }
      console.log(this.state);
    });
  };

  keepTypedValue = () => {
    const listLength = this.state.surveys.length;
    console.log(listLength);
    const survei = this.state.surveys;
    this.setState({
      placeholders: [
        survei[listLength - 1].sliderOne,
        survei[listLength - 1].sliderTwo,
        survei[listLength - 1].sliderThree,
        survei[listLength - 1].questionOne,
        survei[listLength - 1].questionTwo,
        survei[listLength - 1].week
      ],
      sliderOne: survei[listLength - 1].sliderOne,
      sliderTwo: survei[listLength - 1].sliderTwo,
      sliderThree: survei[listLength - 1].sliderThree,
      questionOne: survei[listLength - 1].questionOne,
      questionTwo: survei[listLength - 1].questionTwo
    });
  };

  componentWillUnmount() {
    this.props.firebase.education().off();
  }

  render() {
    const {
      sliderOne,
      sliderTwo,
      sliderThree,
      questionOne,
      questionTwo,
      week,
      surveys,
      success
    } = this.state;

    const isInvalid =
      sliderOne === "" || sliderTwo === "" || sliderThree === "";

    return (
      <div>
        {success && surveys ? (
          <Success>Utvärderingen har skickats!</Success>
        ) : null}
        {!this.state.loading ? (

          <FormStyle fullWidth>
            <h1>Skapa nytt formulär</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="week"
                name="week"
                id="camp-week"
                min="2019-W1"
                max="2019-W52"
                value={week}
                onChange={this.onChange}
                required
              />
              <input
                name="sliderOne"
                value={sliderOne}
                onChange={this.onChange}
                type="text"
                placeholder={this.state.placeholders[0]}
              />
              <input
                name="sliderTwo"
                value={sliderTwo}
                onChange={this.onChange}
                type="text"
                placeholder={this.state.placeholders[1]}
              />
              <input
                name="sliderThree"
                value={sliderThree}
                onChange={this.onChange}
                type="text"
                placeholder={this.state.placeholders[2]}
              />
              <input
                name="questionOne"
                value={questionOne}
                onChange={this.onChange}
                type="text"
                placeholder={this.state.placeholders[3]}
              />
              <input
                name="questionTwo"
                value={questionTwo}
                onChange={this.onChange}
                type="text"
                placeholder={this.state.placeholders[4]}
              />
              <button disabled={isInvalid} type="submit">
                Skicka ut formulär
              </button>
            </form>
          </FormStyle>
        ) : (
          <Loading>Website is loading..</Loading>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(CreateSurvey);
