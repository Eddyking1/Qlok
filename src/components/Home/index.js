import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import UserServey from "../UserServey";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: null,
      loading: false
    };
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

        this.setState({
          surveys: surveyList
        });
      }
    });
  };

  componentWillUnmount() {
    this.props.firebase.surveys().off();
  }

  render() {
    const { loading, surveys } = this.state;
    return (
      <div>
        {!loading && surveys ? (
          <div>
            <UserServey surveys={surveys} />{" "}
          </div>
        ) : (
          <h1>Website is loading...</h1>
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
