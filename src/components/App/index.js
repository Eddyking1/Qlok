import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle, Header } from "../../styles/GlobalStyle";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import CreateSurveyPage from "../CreateSurvey";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Vecka 1",
    Svårighetsgrad: 5,
    Tempo: 5,
    TidLagd: 5,
    Nöjdhetsgrad: 10,
    EnkätSvar: 10
  },
  {
    name: "Vecka 2",
    Svårighetsgrad: 7,
    Tempo: 10,
    TidLagd: 3,
    Nöjdhetsgrad: 9,
    EnkätSvar: 10
  },
  {
    name: "Vecka 3",
    Svårighetsgrad: 8,
    Tempo: 6,
    TidLagd: 6,
    Nöjdhetsgrad: 8,
    EnkätSvar: 7
  },
  {
    name: "Vecka 4",
    Svårighetsgrad: 5,
    Tempo: 1,
    TidLagd: 2,
    Nöjdhetsgrad: 9,
    EnkätSvar: 7
  },
  {
    name: "Vecka 5",
    Svårighetsgrad: 10,
    Tempo: 8,
    TidLagd: 7,
    Nöjdhetsgrad: 10,
    EnkätSvar: 8
  },
  {
    name: "Vecka 6",
    Svårighetsgrad: 7,
    Tempo: 6,
    TidLagd: 5,
    Nöjdhetsgrad: 2,
    EnkätSvar: 10
  },
  {
    name: "Vecka 7",
    Svårighetsgrad: 2,
    Tempo: 7,
    TidLagd: 2,
    Nöjdhetsgrad: 6,
    EnkätSvar: 2
  },
  {
    name: "Vecka 8",
    Svårighetsgrad: 4,
    Tempo: 5,
    TidLagd: 3,
    Nöjdhetsgrad: 10,
    EnkätSvar: 8
  },
  {
    name: "Vecka 9",
    Svårighetsgrad: 5,
    Tempo: 1,
    TidLagd: 9,
    Nöjdhetsgrad: 9,
    EnkätSvar: 9
  },
  {
    name: "Vecka 10",
    Svårighetsgrad: 5,
    Tempo: 5,
    TidLagd: 5,
    Nöjdhetsgrad: 10,
    EnkätSvar: 10
  }
];

class App extends Component {
  state = {
    open: false
  };

  sidebarToggleClickHandler = e => {
    e.preventDefault();
    if (e.target.tagName !== "UL") {
      this.setState(prevState => ({ open: !prevState.open }));
    }
  };

  render() {
    const { open } = this.state;

    return (
      <Router>
        <Header>
          <GlobalStyle />
          <Navigation
            sidebarToggleClickHandler={this.sidebarToggleClickHandler}
            open={open}
          />
          <div>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.CREATE_SURVEY} component={CreateSurveyPage} />
          </div>
        </Header>

        <div style={{ width: "100%", height: 500 }}>
          <h1 className="chartHeadline">Klass FE18 - Kyh Stockholm</h1>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Nöjdhetsgrad"
                fill="#f6d9d5"
                stroke="#f7d0cb"
              />
              <Bar dataKey="EnkätSvar" barSize={20} fill="#c99789" />
              <Line type="monotone" dataKey="Svårighetsgrad" stroke="#bf0000" />
              <Line type="monotone" dataKey="Tempo" stroke="#0392cf" />
              <Line type="monotone" dataKey="TidLagd" stroke="#028900" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
