import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell } from "recharts";

const data = [
  {
    name: "J.K. Rowling",
    numberOfBooks: 3,
  },
  {
    name: "Stephen King",
    numberOfBooks: 11,
  },
  {
    name: "Ernest Hemingway",
    numberOfBooks: 2,
  },
  {
    name: "Mercedes Lackey",
    numberOfBooks: 10,
  },
  {
    name: "Gillian Flynn",
    numberOfBooks: 8,
  },
  {
    name: "Jane Austen",
    numberOfBooks: 7,
  },
  {
    name: "George R.R. Martin",
    numberOfBooks: 4,
  },
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
      <br/>
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
      <br/>
      <p className="content">{`You have read ${activeItem.numberOfBooks} books written by ${activeItem.name} `}</p>
    </div>
  );
}
