import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import UserServey from "../UserServey";
import { PieChartCont } from "../../styles/GlobalStyle";

import {
  PieChart,
  Pie,
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

//--------------------------------//
//--------------------------------------------------------------------//
//Question 1 - Array Values
let q1Val = [5, 4, 4, 5, 3, 2, 3, 4, 4, 5];
//Question 1 - Get Average
let q1Sum = q1Val.reduce((previous, current) => (current += previous));
let q1Avg = q1Sum / q1Val.length;
//--------------------------------//
//--------------------------------------------------------------------//
//--------------------------------//
//Question 2 - Array Values
let q2Val = [1, 5, 5, 1, 2, 1, 2, 5, 5, 1];
//Question 2 - Get Average
let q2Sum = q2Val.reduce((previous, current) => (current += previous));
let q2Avg = q2Sum / q2Val.length;
//--------------------------------//
//--------------------------------------------------------------------//
//--------------------------------//
//Question 3 - Array Values
let q3Val = [3, 2, 2, 3, 3, 4, 3, 2, 2, 3];
//Question 3 - Get Average
let q3Sum = q3Val.reduce((previous, current) => (current += previous));
let q3Avg = q3Sum / q3Val.length;
//--------------------------------//
//--------------------------------------------------------------------//
//--------------------------------//
/*Thinking*/ console.log(q1Avg, q2Avg, q3Avg);
//--------------------------------//
//--------------------------------------------------------------------//
//--------------------------------//
const data1 = [
  { name: "Fråga 1", value: q1Avg },
  { name: "Fråga 2", value: q2Avg },
  { name: "Fråga 3", value: q3Avg }
];
//--------------------------------------------------------------------//
//--------------------------------//

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

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Question Average ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Overall Average ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

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

  /* pie  */
  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
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
        <PieChartCont>
          <PieChart width={500} height={500}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data1}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#E1D3C1"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </PieChartCont>
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

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(GraphPage);
