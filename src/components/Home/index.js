import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import UserServey from '../UserServey';


import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data1 = [
  { name: "Fråga 1", value: 10 },
  { name: "Fråga 2", value: 9 },
  { name: "Fråga 3", value: 9 },
  { name: "Fråga 4", value: 6 }
];

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
  },
  {
    name: "Vecka 11",
    Svårighetsgrad: 2,
    Tempo: 6,
    TidLagd: 7,
    Nöjdhetsgrad: 5,
    EnkätSvar: 4
  },
  {
    name: "Vecka 12",
    Svårighetsgrad: 5,
    Tempo: 5,
    TidLagd: 4,
    Nöjdhetsgrad: 5,
    EnkätSvar: 7
  },
  {
    name: "Vecka 13",
    Svårighetsgrad: 7,
    Tempo: 4,
    TidLagd: 9,
    Nöjdhetsgrad: 10,
    EnkätSvar: 10
  },
  {
    name: "Vecka 14",
    Svårighetsgrad: 2,
    Tempo: 1,
    TidLagd: 3,
    Nöjdhetsgrad: 4,
    EnkätSvar: 1
  },
  {
    name: "Vecka 15",
    Svårighetsgrad: 9,
    Tempo: 7,
    TidLagd: 4,
    Nöjdhetsgrad: 10,
    EnkätSvar: 9
  },
  {
    name: "Vecka 16",
    Svårighetsgrad: 3,
    Tempo: 6,
    TidLagd: 5,
    Nöjdhetsgrad: 2,
    EnkätSvar: 10
  },
  {
    name: "Vecka 17",
    Svårighetsgrad: 2,
    Tempo: 7,
    TidLagd: 2,
    Nöjdhetsgrad: 6,
    EnkätSvar: 2
  },
  {
    name: "Vecka 18",
    Svårighetsgrad: 4,
    Tempo: 5,
    TidLagd: 3,
    Nöjdhetsgrad: 10,
    EnkätSvar: 8
  },
  {
    name: "Vecka 19",
    Svårighetsgrad: 5,
    Tempo: 1,
    TidLagd: 9,
    Nöjdhetsgrad: 9,
    EnkätSvar: 9
  },
  {
    name: "Vecka 20",
    Svårighetsgrad: 5,
    Tempo: 5,
    TidLagd: 5,
    Nöjdhetsgrad: 10,
    EnkätSvar: 10
  },
  {
    name: "Vecka 21",
    Svårighetsgrad: 5,
    Tempo: 5,
    TidLagd: 5,
    Nöjdhetsgrad: 10,
    EnkätSvar: 10
  },
  {
    name: "Vecka 22",
    Svårighetsgrad: 7,
    Tempo: 10,
    TidLagd: 3,
    Nöjdhetsgrad: 9,
    EnkätSvar: 10
  },
  {
    name: "Vecka 23",
    Svårighetsgrad: 8,
    Tempo: 6,
    TidLagd: 6,
    Nöjdhetsgrad: 8,
    EnkätSvar: 7
  },
  {
    name: "Vecka 24",
    Svårighetsgrad: 5,
    Tempo: 1,
    TidLagd: 2,
    Nöjdhetsgrad: 9,
    EnkätSvar: 7
  },
  {
    name: "Vecka 25",
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
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
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


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
    });
  }

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
    const {loading, surveys} = this.state;
    return (
      <div>
        { !loading && surveys ? <div>
          <UserServey surveys={surveys}></UserServey> </div>: <h1>Website is loading...</h1> }
          <div>
          <h1 className="chartHeadline">Klass FE18 - Kyh Stockholm</h1>
        </div>
        <PieChart width={500} height={500}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data1}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>

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
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Nöjdhetsgrad"
                fill="#f6d9d5"
                stroke="#f7d0cb"
              />
              {/* <Bar dataKey="EnkätSvar" barSize={20} fill="#c99789" /> */}
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
  withAuthorization(condition),
)(HomePage);



// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const renderActiveShape = (props) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
//     fill, payload, percent, value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
//       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

//   state = {
//     activeIndex: 0,
//   };

//   onPieEnter = (data, index) => {
//     this.setState({
//       activeIndex: index,
//     });
//   };

//   render() {
//     return (
//       <PieChart width={400} height={400}>
//         <Pie
//           activeIndex={this.state.activeIndex}
//           activeShape={renderActiveShape}
//           data={data}
//           cx={200}
//           cy={200}
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           dataKey="value"
//           onMouseEnter={this.onPieEnter}
//         />
//       </PieChart>
//     );
//   }
// }
