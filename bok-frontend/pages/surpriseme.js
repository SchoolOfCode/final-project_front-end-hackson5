import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { ReadingListDropDown } from "../components/ReadingListDropDown";
import { Button } from "@mui/material";

function surpriseme() {
  const { user } = useUser();
  const [userInput, setuserInput] = useState();
  const [bookID, setBookID] = useState();
  const [bookData, setBookData] = useState();
  const [readingListData, setReadingListData] = useState();
  const [listSelectionId, setListSelectionId] = useState();

  const handleChange = (e) => {
    setuserInput(e.target.value);
  };

  const handleClick = async () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${userInput}`
    );
    const data = await response.json();
    setBookID(data.docs[randomNumber].key);
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await fetch(`https://openlibrary.org${bookID}.json`);
      const data = await response.json();
      setBookData(data);
    };
    if (bookID) {
      fetchBookData();
    }
  }, [bookID]);

  useEffect(() => {
    const fetchReadingListData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await res.json();
      setReadingListData(data.payload);
    };
    fetchReadingListData();
  }, []);

  const handleSelectionChange = (e) => {
    const index = e.target.selectedIndex;
    setListSelectionId(e.target.childNodes[index].id);
  };

  const addBookToList = async () => {
    const response = await fetch(
      `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
        user.sub.indexOf("|") + 1
      )}/${listSelectionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ books: bookID.split("/works/")[1] }),
      }
    );
  };

  return (
    <div>
      <h1>Surprise Me</h1>
      <p>Pick a subject</p>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <Button
        onClick={handleClick}
        color="secondary"
        variant="contained"
        size="large"
        style={{ textTransform: "none" }}
        sx={{
          m: 1,
          borderRadius: 3,
          fontSize: 14,
          fontFamily: "Arial",
          fontWeight: 100,
        }}
      >
        Find New Book
      </Button>
      <img
        src={
          typeof bookData?.covers === "object"
            ? `https://covers.openlibrary.org/b/id/${bookData?.covers[0]}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${bookData?.covers}-L.jpg`
        }
        alt={bookData?.title}
      />
      {bookData && (
        <ReadingListDropDown
          handleChange={handleSelectionChange}
          readingListData={readingListData}
        />
      )}
      {bookData && (
        <Button
          onClick={() => addBookToList()}
          color="secondary"
          variant="contained"
          size="large"
          style={{ textTransform: "none" }}
          sx={{
            m: 1,
            borderRadius: 3,
            fontSize: 14,
            fontFamily: "Arial",
            fontWeight: 100,
          }}
        >
          Add To List
        </Button>
      )}
      <div>{bookData?.title}</div>
      <div>
        {typeof bookData?.description === "object"
          ? bookData?.description.value
          : bookData?.description}
      </div>
    </div>
  );
}

export default withPageAuthRequired(surpriseme);
