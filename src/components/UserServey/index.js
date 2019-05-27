import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Success, Loading } from "../../styles/GlobalStyle";
import { SurveyOutput, Message, ChartPage } from "./styles";
import qlok from "../../assets/qlok.png"
import check from "../../assets/check.png"
import PieChartClass from "../PieChartClass"

class UserSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      showNext: false,
      notAnsweredSurvey: null,
      invitedToSurveys: null,
      sliderOneAnsw: 5,
      sliderTwoAnsw: 5,
      sliderThreeAnsw: 5,
      questionOneAnsw: "",
      questionTwoAnsw: "",
      currentSurveyId: null,
    };
  }

  componentDidMount() {
    this.getInvitedToSurveys();
  }

  nextSurvey = (e) => {
    e.preventDefault();
    this.setState({showNext: !this.state.showNext})
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

        this.setState({invitedToSurveys: invitedToSurveys}, () => {
        this.filterSurveys();
      });
    } else {
      this.setState({notAnsweredSurvey: null, loading: false});
    }
    })
  }

  filterSurveys = () => {
    this.props.firebase.survey(this.state.invitedToSurveys[0].uid).on("value", snapshot => {
      const notAnsweredSurvey = snapshot.val();
      if(notAnsweredSurvey) {
        this.setState({
          notAnsweredSurvey: notAnsweredSurvey,
          currentSurveyId: this.state.invitedToSurveys[0].uid,
          loading: false
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
    this.setSuccess();
  };

  setSuccess = () => {
    setTimeout(
      function() {
          this.setState({
            success: false,
            loading: false,
            sliderOneAnsw: 5,
            sliderTwoAnsw: 5,
            sliderThreeAnsw: 5,
            questionOneAnsw: "",
            questionTwoAnsw: "",
            showNext: false,
          });
      }
      .bind(this),
      1000
    );
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillUnmount() {
    this.props.firebase.user().off();
    this.props.firebase.survey().off();
  }

  render() {
    const {
      loading,
      success,
      showNext,
      notAnsweredSurvey,
      sliderOneAnsw,
      sliderTwoAnsw,
      sliderThreeAnsw,
      questionOneAnsw,
      questionTwoAnsw
    } = this.state;

    return (

      <div>
        {success ? <Success><img src={check} alt="success-check-mark"/></Success> : <div>
        {!loading ? (
          <div>
          {showNext && notAnsweredSurvey ?
              <SurveyOutput>
                <form onSubmit={event => this.onSubmit(event)}>
                  <h1>Enkät - {notAnsweredSurvey.education} - {notAnsweredSurvey.week}</h1>
                  <div>
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
                    <output  >{sliderOneAnsw}</output>

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
                    <output  >{sliderTwoAnsw}</output>

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
                    <output>{sliderThreeAnsw}</output>
                  </div>
                  <div>
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
                  </div>
                  <button type="submit">Skicka in svar</button>
                </form>
              </SurveyOutput> :
              <ChartPage>
                  <PieChartClass currentSurveyId={this.state.currentSurveyId}/>
                  <button disabled={!notAnsweredSurvey} onClick={event => this.nextSurvey(event)}>Nästa enkät</button>
                </ChartPage>}
          </div>
        ) :
           <Loading><img src={qlok} alt="qlok-spinner" /></Loading> }
        </div>}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(UserSurvey);
