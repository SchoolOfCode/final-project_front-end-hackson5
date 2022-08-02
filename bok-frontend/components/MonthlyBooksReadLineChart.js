import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    month: "January",
    numberOfBooks: 5
  },
  {
    month: "February",
    numberOfBooks: 8
  },
  {
    month: "March",
    numberOfBooks: 3
  },
  {
    month: "April",
    numberOfBooks: 9
  },
  {
    month: "May",
    numberOfBooks: 5
  },
  {
    month: "June",
    numberOfBooks: 8
  },
  {
    month: "July",
    numberOfBooks: 3
  },
  {
    month: "August",
    numberOfBooks: 5
  },
  {
    month: "September",
    numberOfBooks: 2
  },
  {
    month: "October",
    numberOfBooks: 9
  },
  {
    month: "November",
    numberOfBooks: 10
  },
  {
    month: "December",
    numberOfBooks: 4
  }
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
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="numberOfBooks" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    
    </div>
  );
}
