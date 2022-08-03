import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { ReadingListDropDown } from "../components/ReadingListDropDown";
import { Button } from "@mui/material";
import styles from "../styles/SurpriseMe.module.css";

function surpriseme() {
  const { user } = useUser();
  const [userInput, setuserInput] = useState();
  const [bookID, setBookID] = useState();
  const [bookData, setBookData] = useState();
  const [readingListData, setReadingListData] = useState();
  const [listSelectionId, setListSelectionId] = useState();
  const [warning, setWarning] = useState(false);

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
    if (userInput.length < 3) {
      setWarning(true);
      console.log("this is wrong");
    } else {
      setWarning(false);
    }
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
    <div className={styles.SurpriseMeContainer}>
      <h1>Surprise Me</h1>

      <p>Search for a random book on the given topic</p>
      {warning && <p>Your search needs to be more than three characters!</p>}
      <input
        className={styles.search}
        placeholder="Search Topic..."
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        required
        minlength={3}
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

      {bookData && (
        <div className={styles.contentContainer}>
          <div className={styles.descriptionContainer}>
            {bookData && (
              <img
                className={styles.BookImageContainer}
                src={
                  typeof bookData?.covers === "object"
                    ? `https://covers.openlibrary.org/b/id/${bookData?.covers[0]}-L.jpg`
                    : `https://covers.openlibrary.org/b/id/${bookData?.covers}-L.jpg`
                }
                alt={bookData?.title}
              />
            )}
            <div className={styles.surpriseContentContainer}>
              <div className={styles.descriptionTitle}>{bookData?.title}</div>
              <div style={{ margin: 5 }}>
                {typeof bookData?.description === "object"
                  ? bookData?.description.value
                  : bookData?.description}
              </div>
              <div className={styles.descriptionButtonContainer}>
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
                    Add to list
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(surpriseme);
