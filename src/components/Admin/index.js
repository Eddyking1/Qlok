import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import styled from "styled-components";

const AdminStyle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 0;
  flex-direction: column;
  padding: 20px 0;

  div {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;
  padding: 100px 0;
  }

  h1 {
    font-size:1.8em;
    padding:30px 0 ;

    span {
      font-size: 2em;
    }
  }

  h2 {
    background: white;
    padding: 20px 20px;
    border-radius: 10px;
  }

  a {
    font-size:2em;
    font-weight:bold;
    all:unset;
    cursor: pointer;
  }

  button {
    margin: 35px 0 0;
    padding: .8em;
    font-size: 1.5em;
    background: var(--text-color);
    color: white;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.04);
    }

    &:disabled {
      pointer-events: none;
      background-color: grey;
    }
  }
`;

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
      <AdminStyle>
        <div>
         <h1><span>Admin</span> <br/> Inloggad som:</h1>
          {!loading ? <h2> {this.props.authUser.email} </h2> : <div>Loading ...</div>}

          <button>
           <Link to={ROUTES.CREATE_SURVEY}>Skapa en ny enkät</Link>
         </button>
        </div>
      </AdminStyle>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
