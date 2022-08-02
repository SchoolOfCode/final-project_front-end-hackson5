import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "January",
    "Number of Books": 5,
  },
  {
    month: "February",
    "Number of Books": 8,
  },
  {
    month: "March",
    "Number of Books": 3,
  },
  {
    month: "April",
    "Number of Books": 9,
  },
  {
    month: "May",
    "Number of Books": 5,
  },
  {
    month: "June",
    "Number of Books": 8,
  },
  {
    month: "July",
    "Number of Books": 3,
  },
  {
    month: "August",
    "Number of Books": 5,
  },
  {
    month: "September",
    "Number of Books": 2,
  },
  {
    month: "October",
    "Number of Books": 9,
  },
  {
    month: "November",
    "Number of Books": 10,
  },
  {
    month: "December",
    "Number of Books": 4,
  },
];

export default function MonthlyBooksReadLineChart() {
  return (
    <div>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Number of Books"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </div>
  );
}
