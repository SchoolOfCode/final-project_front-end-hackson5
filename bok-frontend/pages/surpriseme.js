import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { ReadingListDropDown } from "../components/ReadingListDropDown";
import { Alert, Button } from "@mui/material";
import styles from "../styles/SurpriseMe.module.css";
import CircularProgress from "@mui/material/CircularProgress";

function surpriseme({ data }) {
  const { user } = useUser();
  const [userInput, setuserInput] = useState("");
  const [bookID, setBookID] = useState();
  const [bookData, setBookData] = useState();
  const [readingListData, setReadingListData] = useState();
  const [listSelectionId, setListSelectionId] = useState();
  const [warning, setWarning] = useState(false);
  const [listSelectWarning, setListSelectWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setuserInput(e.target.value);
  };

  const handleClick = async () => {
    if (userInput.length <= 2 || /^[a-zA-Z\s\-]*$/.test(userInput) === false) {
      setWarning(true);
      return;
    }
    setWarning(false);
    const randomNumber = Math.floor(Math.random() * 100);
    setLoading(true);
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${userInput}`
    );
    const data = await response.json();
    if (data?.numFound === 0) {
      setWarning(true);
      return;
    }
    setBookID(data.docs[randomNumber].key);
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await fetch(`https://openlibrary.org${bookID}.json`);
      const data = await response.json();
      setBookData(data);
      setLoading(false);
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
    if (listSelectionId) {
      setListSelectWarning(false);
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
      return;
    }
    setListSelectWarning(true);
  };

  return (
    <div className={styles.SurpriseMeContainer}>
      <h1>Surprise Me</h1>

      <p>Search for a random book on a given topic.</p>

      <input
        className={styles.search}
        placeholder="Search Topic..."
        onKeyDown={(e) => (e.key === "Enter" ? handleClick() : "")}
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
      ></input>
      {warning && (
        <Alert severity="error">
          Your search needs to be more than three characters and contains no
          numbers or special characters!
        </Alert>
      )}
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
        }}
      >
        Find New Book
      </Button>
      {loading && <CircularProgress />}
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
                    }}
                  >
                    Add to list
                  </Button>
                )}
              </div>
              {listSelectWarning && (
                <div style={{ color: "rgb(251, 72, 72)", textAlign: "center" }}>
                  Please create or select a list.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(surpriseme);
