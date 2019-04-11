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

  div {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;
  }

  h1 {
    font-size:3.5em;
    padding:10px 0 ;
  }

  h2 {
    padding: 0 ;
  }

  a {
    font-size:2em;
    all:unset;
  }

  li {
    padding:50px;
  }

  button {
    padding: 0.5em 1.5em;
    margin: 1em 0;
    border: none;
    outline: none;
    background: var(--text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
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

const UserEmail = styled.div `
padding: 20px;
font-size:1.5em;
font-weight:bold;
background-color:white;
border:none !important;
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
         <h1>Admin</h1>
         <h1>Inloggad som:</h1>
          {!loading ? <UserEmail> {this.props.authUser.email} </UserEmail> : <div>Loading ...</div>}

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
