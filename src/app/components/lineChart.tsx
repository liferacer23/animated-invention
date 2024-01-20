"use client";
import moment from "moment";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartData {
  createdAt: string;
  activeBrokers: number;
}

export default function App({ chartData }: { chartData: ChartData[] }) {
  return (
    <LineChart
      width={600}
      height={300}
      data={chartData}
      margin={{
        top: 5,

        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        tickFormatter={(tick) => {
          return moment(tick).format("MMM");
        }}
        dataKey="createdAt"
        label={{ value: "Month", position: "insideBottomRight", offset: 0 }}
      />
      <YAxis
        label={{
          value: "Total Brokers",
          angle: -90,
          position: "insideLeft",
          offset: -20,
        }}
      />
      <Tooltip
        labelFormatter={(label) => {
          return moment(label).format("MMM");
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="activeBrokers"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
