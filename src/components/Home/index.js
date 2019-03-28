import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.loadSurveysFromDB();
  }

  loadSurveysFromDB = () => {
    this.props.firebase.surveys().on('value', snapshot => {
      const surveysObject = snapshot.val();
      if(surveysObject) {
        const surveyList = Object.keys(surveysObject).map(key => ({
          ...surveysObject[key],
          uid: key,
        }));

        this.setState({
          surveys: surveyList,
        });
      }
      console.log(this.state);
    });
  }



  componentWillUnmount() {
    this.props.firebase.surveys().off();
  }

  render() {

    return (
      <div>
        { !this.state.loading ? <div>
          <h1>Home</h1> </div>: <h1>Website is loading...</h1> }
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);
