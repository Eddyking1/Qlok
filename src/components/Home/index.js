import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import UserServey from "../UserServey";
import { Loading } from "../../styles/GlobalStyle";


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: null,
      loading: false
    };
  }

  // checkIfuserGotSurveys = () => {
  //   this.props.firebase.user(this.props.authUser.uid).once('value', snapshot => {
  //     const userObj = snapshot.val();
  //     if(userObj) {
  //       console.log(Object.keys(userObj));
  //       const currentUser = Object.keys(userObj).map(key => ({
  //         ...userObj[key],
  //         uid: key
  //       }));
  //       this.setState({currentUser: currentUser}, () => {
  //         console.log(currentUser, "user");
  //       })
  //     }
  //   })
  // }

  componentDidMount() {
    this.checkIfuserGotSurveys();
  }

  componentWillUnmount() {
    this.props.firebase.surveys().off();
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {!loading ? (
          <div>
            <UserServey/>
          </div>
        ) : (
          <Loading>Website is loading.. </Loading>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);
