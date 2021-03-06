import React from "react"
import data from "./data/age_ppg.json"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const CustomTooltip = props => (
  <div
    style={{
      border: "#bbb 1.5px solid"
    }}
  >
    <p
      style={{
        margin: "0 0",
        padding: "3px 7.5px",
        backgroundColor: "white",
        fontWeight: "bold"
      }}
    >
      {props.payload &&
        props.payload[0] != null &&
        props.payload[0].payload.Player}
    </p>
    <p
      style={{
        margin: "0 0",
        padding: "3px 7.5px",
        backgroundColor: "white"
      }}
    >
      Age:{" "}
      {props.payload &&
        props.payload[0] != null &&
        props.payload[0].payload.Age}
    </p>
    <p
      style={{
        margin: "0 0",
        padding: "3px 7.5px",
        backgroundColor: "white"
      }}
    >
      PPG:{" "}
      {props.payload &&
        props.payload[0] != null &&
        props.payload[0].payload.PTS}
    </p>
  </div>
)

export const AgeScatterChart = () => {
  return (
    <div style={{ width: "100%", maxWidth: 750 }}>
      <ResponsiveContainer height={500} width="100%">
        <ScatterChart width={750} height={500}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="Age"
            name="Age"
            domain={[31, 35]}
            label={{ value: "Age", position: "insideBottom", offset: 0 }}
            height={45}
          />
          <YAxis
            type="number"
            dataKey="PTS"
            name="PTS"
            domain={[10, 30]}
            label={{ value: "PPG", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip />}
          />
          <Scatter data={data} fill="#006BB6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
