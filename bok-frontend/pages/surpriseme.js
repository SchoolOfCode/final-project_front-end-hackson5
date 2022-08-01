import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function surpriseme() {
  const [userInput, setuserInput] = useState();
  const [bookID, setBookID] = useState();

  const handleChange = (e) => {
    setuserInput(e.target.value);
  };

  const handleClick = async () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${userInput}`
    );
    const data = await response.json();
    setBookID(data.docs[randomNumber].key.split("/works/")[1]);
  };

  console.log(bookID);
  return (
    <div>
      <h1>Surprise Me</h1>
      <p>Pick a subject</p>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <button onClick={handleClick}>Find new books</button>
    </div>
  );
}

export default withPageAuthRequired(surpriseme);
