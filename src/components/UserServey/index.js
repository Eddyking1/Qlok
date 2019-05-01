// import React, { Component } from "react";
// import { compose } from "recompose";
// import { withAuthorization } from "../Session";
// import { withFirebase } from "../Firebase";
// import { FormStyle, Success, Loading } from "../../styles/GlobalStyle";
// import styled from "styled-components";

// const Survey = styled.div`
//   width: 100%;
//   height: 40%;
//   text-align: center;
//   cursor: pointer;
// `;

// class UserSurvey extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       success: false,
//       currentUser: null,
//       notAnsweredSurvey: null,
//       surveysToAnswer: null
//     };
//   }

//   filterSurveys = () => {
//     const notAnswered = this.props.surveys.filter(surv => {
//       if (!surv.answered.includes(this.props.authUser.uid)) {
//         return surv;
//       }
//     });
//     this.setState({ notAnsweredSurvey: notAnswered[0] });
//   };

//   componentDidMount() {
//     this.filterSurveys();
//   }

//   showSurvey = event => {
//     this.setState({ open: true });
//     console.log(this.state.open);
//   };

//   onSubmit = (event, surveyId) => {
//     this.setState({
//       success: true
//     });

//     this.updateSurvey(surveyId, "chartAnswers", this.state.chartAnswers);
//     this.updateSurvey(surveyId, "answered", this.state.answered);
//     this.updateSurvey(surveyId, "altAnswers", this.state.altAnswers);

//     event.preventDefault();
//   };

//   updateSurvey = (surveyId, string, value) => {
//     this.props.firebase
//       .survey(surveyId)
//       .child(string)
//       .set(value);
//   };

//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//     this.setState({
//       success: false
//     });
//     console.log(this.state.sliderOneAnsw);
//   };

//   render() {
//     const isInvalid =
//       sliderOneAnsw === "" || sliderTwoAnsw === "" || sliderThreeAnsw === "";
//     const {
//       loading,
//       success,
//       notAnsweredSurvey,
//       sliderOneAnsw,
//       sliderTwoAnsw,
//       sliderThreeAnsw,
//       questionOneAnsw,
//       questionTwoAnsw
//     } = this.state;

//     return (
//       <div>
//         {success ? <Success>Utvärderingen har lämmnats!</Success> : null}
//         {!loading && notAnsweredSurvey ? (
//           <Survey
//             name={notAnsweredSurvey.uid}
//             key={notAnsweredSurvey.uid}
//             onClick={this.showSurvey}
//           >
//             <h1>{notAnsweredSurvey.uid}</h1>
//             <FormStyle>
//               <form onSubmit={() => this.onSubmit()}>
//                 <label>{notAnsweredSurvey.sliderOne}</label>
//                 <input
//                   name="sliderOneAnsw"
//                   value={sliderOneAnsw}
//                   onChange={this.onChange}
//                   type="range"
//                   min="0"
//                   max="10"
//                   step="1"
//                 />
//                 <label>{notAnsweredSurvey.sliderTwo}</label>
//                 <input
//                   name="sliderTwoAnsw"
//                   value={sliderTwoAnsw}
//                   onChange={this.onChange}
//                   type="range"
//                   min="0"
//                   max="10"
//                   step="1"
//                 />
//                 <label>{notAnsweredSurvey.sliderThree}</label>
//                 <input
//                   name="sliderThreeAnsw"
//                   value={sliderThreeAnsw}
//                   onChange={this.onChange}
//                   type="range"
//                   min="0"
//                   max="10"
//                   step="1"
//                 />
//                 <label>{notAnsweredSurvey.questionOne}</label>
//                 <textarea
//                   name="questionOneAnsw"
//                   value={questionOneAnsw}
//                   onChange={this.onChange}
//                   type="text"
//                   placeholder="svar..."
//                 />
//                 <label>{notAnsweredSurvey.questionTwo}</label>
//                 <textarea
//                   name="questionTwoAnsw"
//                   value={questionTwoAnsw}
//                   onChange={this.onChange}
//                   type="text"
//                   placeholder="svar..."
//                 />
//                 <button type="submit">Skicka in svar</button>
//               </form>
//             </FormStyle>
//           </Survey>
//         ) : (
//           <Loading>Website is loading..</Loading>
//         )}
//       </div>
//     );
//   }
// }

// const condition = authUser => !!authUser;

// export default compose(
//   withFirebase,
//   withAuthorization(condition)
// )(UserSurvey);
