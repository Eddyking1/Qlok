import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    console.log(this.props.authUser, "home");
  }

  componentWillUnmount() {
    // this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        { !this.state.loading ?
          <div>
            <h1>Create Survey</h1>
          </div>

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
