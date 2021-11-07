import React from "react"
import data from "../data/jj.json"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export const JJLineChart = () => {
  return (
    <LineChart
      width={750}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="Age"
        label={{ value: "Age", position: "insideBottom", offset: 0 }}
        height={45}
      />
      <YAxis
        dataKey="PTS"
        label={{ value: "PPG", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Line type="linear" dataKey="PTS" stroke="#006BB6" activeDot={{ r: 8 }} />
    </LineChart>
  )
}
