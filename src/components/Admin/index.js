import React, { Component } from 'react';
import { withAuthorization } from '../Session';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {!loading ? <div> {this.props.authUser.email} </div> : <div>Loading ...</div>}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
