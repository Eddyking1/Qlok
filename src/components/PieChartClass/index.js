import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
// import { PieChartCont } from "../../styles/GlobalStyle";
import styled from "styled-components";


import { PieChart, Pie, Sector } from "recharts";

const PieChartCont = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 0 0px;
  font-size: 20px;

  @media(max-width: 600px) {
    padding: 40px 0 0;
  }
`;

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
  const ex = mx + (cos >= 0 ? 1 : -1) * 1;
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
      <text
      x={20}
      y={30}
      >{`Medelvärde ${value}`}</text>
      <text
        x={20}
        y={30}
        dy={18}
        fill={"#333"}
      >
        {`(Genomsnitt ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


class PieChartClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: null,
      loading: false,
      activeIndex: 0,
      surveyAnswers: null,
      sliderOneAnswers: [],
      sliderTwoAnswers: [],
      sliderThreeAnswers: []
    };
  }

  componentDidMount() {
    this.getCurrentSurveyAnswers();
  }

  getCurrentSurveyAnswers = () => {
    this.props.firebase.survey(this.props.currentSurveyId).child("answers").once("value", snapshot => {
      const answersObj = snapshot.val();
      console.log(answersObj)
      if(answersObj) {
        const surveyAnswers = Object.keys(answersObj).map(key => ({
          ...answersObj[key],
          uid: key
        }));
        this.setState({surveyAnswers: surveyAnswers}, () => {
          this.filterAnswers();
        });
      }
    })
  };

  filterAnswers = () => {
    console.log(this.state.sliderOneAnswers, "slider")

    const {surveyAnswers} = this.state;
    const answ1 = [];
    const answ2 = [];
    const answ3 = [];
    for (var i = 0; i < surveyAnswers.length; i++) {
      answ1.push(surveyAnswers[i].sliderOneAnswers);
      answ2.push(surveyAnswers[i].sliderTwoAnswers);
      answ3.push(surveyAnswers[i].sliderThreeAnswers);
    }
    this.setState({sliderOneAnswers: answ1, sliderTwoAnswers: answ2, sliderThreeAnswers: answ3})
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    return (
      <div>
        <PieChartCont>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data1}
              innerRadius={90}
              outerRadius={120}
              fill="var(--text-color)"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </PieChartCont>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(PieChartClass);
