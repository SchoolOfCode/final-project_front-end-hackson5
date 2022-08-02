import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell } from "recharts";

const data = [
  {
    name: "J.K Rolling",
    numberOfBooks: 3
  },
  {
    name: "Stephen Edwin King",
    numberOfBooks: 11
  },
  {
    name: "Ernest Miller Hemingway",
    numberOfBooks: 2
  },
  {
    name: "Mercedes Lackey",
    numberOfBooks: 10
  },
  {
    name: "Gillian Schieber Flynn",
    numberOfBooks: 8
  },
  {
    name: "Jane Austen",
    numberOfBooks: 7
  },
  {
    name: "George Raymond Richard Martin",
    numberOfBooks: 4
  }
];

export default function FavouriteAuthorsBarChart() {
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
      <p>Click to view number of books by author </p>
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
      <p className="content">{`Numbers of Books Read by author ${activeItem.name}: ${activeItem.numberOfBooks}`}</p>
    </div>
  );
}