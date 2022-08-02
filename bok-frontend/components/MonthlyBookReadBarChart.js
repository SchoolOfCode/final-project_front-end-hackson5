import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell } from "recharts";

const data = [
  {
    name: "January",
    numberOfBooks: 3
  },
  {
    name: "February",
    numberOfBooks: 11
  },
  {
    name: "March",
    numberOfBooks: 2
  },
  {
    name: "April",
    numberOfBooks: 10
  },
  {
    name: "May",
    numberOfBooks: 8
  },
  {
    name: "June",
    numberOfBooks: 7
  },
  {
    name: "July",
    numberOfBooks: 4
  },
  {
    name: "August",
    numberOfBooks: 6
  },
  {
    name: "September",
    numberOfBooks: 9
  },
  {
    name: "October",
    numberOfBooks: 17
  },
  {
    name: "November",
    numberOfBooks: 4
  },
  {
    name: "December",
    numberOfBooks: 6
  }
];

export default function MonthlyBookReadBarChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <p>Click each rectangle </p>
      <BarChart width={300} height={100} data={data}>
        <Bar dataKey="numberOfBooks" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="content">{`Numbers of Books Read in ${activeItem.name}: ${activeItem.numberOfBooks}`}</p>
    </div>
  );
}