import React from "react"
import data from "../data/jj.json"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export const JJLineChart = () => {
  return (
    <div style={{ width: "100%", maxWidth: 750 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
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
          <Line
            type="linear"
            dataKey="PTS"
            stroke="#006BB6"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
