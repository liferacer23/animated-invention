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
  activeBrokers: number | string;
}

export default function App({ chartData }: { chartData: ChartData[] }) {
  return (
    <LineChart
      width={600}
      height={500}
      data={chartData}
      margin={{
        top: 5,
        left: 30,
        bottom: 40,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        tickLine={false}
        strokeWidth={3}
        tickFormatter={(tick) => {
          return moment(tick).format("MMM");
        }}
        dataKey="createdAt"
        label={{
          value: "month",
          position: "insideBottom",
          offset: -10,
        }}
      />
      <YAxis
        tickLine={false}
        strokeWidth={3}
        label={{
          value: "total Brokers",
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

      <Line
        type="basis"
        dataKey="activeBrokers"
        stroke="#000"
        dot={{
          stroke: "#000",
          strokeWidth: 8,
          fill: "#000",
        }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
