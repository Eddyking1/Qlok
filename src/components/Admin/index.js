import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


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
        <li>
          <Link to={ROUTES.CREATE_SURVEY}>Skapa en ny ankät</Link>
        </li>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
