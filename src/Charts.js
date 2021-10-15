// import React from "react"
// import { data } from "./data.js"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts"

// const CustomizedLabel = ({ x, y, stroke, value }) => {
//   return (
//     <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
//       {value}
//     </text>
//   )
// }

// const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         fill="#666"
//         transform="rotate(-35)"
//       >
//         {payload.value}
//       </text>
//     </g>
//   )
// }

// const Charts = () => {
//   return (
//     <div>
//       {" "}
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 20,
//           right: 30,
//           left: 20,
//           bottom: 10
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="pv"
//           stroke="#8884d8"
//           label={<CustomizedLabel />}
//         />
//         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//     </div>
//   )
// }

// export default Charts
