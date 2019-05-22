import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import {
  Sector,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data2 = [
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
  }
];

class GraphPage extends Component {
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
          </div>
        ) : (
          <h1>Website is loading...</h1>
        )}
        <div style={{ width: "100%", height: 500 }}>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data2}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis
                type="number"
                domain={[0, 10]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Nöjdhetsgrad"
                fill="#f6d9d5"
                stroke="#f7d0cb"
              />
              <Line type="monotone" dataKey="Svårighetsgrad" stroke="#bf0000" />
              <Line type="monotone" dataKey="Tempo" stroke="#0392cf" />
              <Line type="monotone" dataKey="TidLagd" stroke="#028900" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

// <PieChartCont>
//   <PieChart width={500} height={500}>
//     <Pie
//       activeIndex={this.state.activeIndex}
//       activeShape={renderActiveShape}
//       data={data1}
//       cx={200}
//       cy={200}
//       innerRadius={60}
//       outerRadius={80}
//       fill="#E1D3C1"
//       dataKey="value"
//       onMouseEnter={this.onPieEnter}
//     />
//   </PieChart>
// </PieChartCont>

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(GraphPage);
