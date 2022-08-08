import { useState, useEffect } from "react";
import styles from "../styles/DisplayBook.module.css";
import { Alert, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

//Renders onto individual list page. Fetches book data from specific list passed down from the prop: booklist.

export function DisplayBookFromUserList({ bookList, readingListID }) {
  const [bookData, setBookData] = useState([]);
  const [value, setValue] = useState(0);

  //Fetches request to the book api which returns data on each individual book within the user's reading list
  useEffect(() => {
    const fetchData = async () => {
      let fetchedBookData = [];
      bookList?.map(async (bookID) => {
        const res = await fetch(
          `https://openlibrary.org/works/${bookID.bookid}.json`
        );
        const data = await res.json();
        data.rating = bookID.rating;

        fetchedBookData = [...fetchedBookData, data];
        setBookData(fetchedBookData);
      });
    };
    fetchData();
  }, [bookList]);

  //Delete request to the database, removing a specific book from user's reading list
  const deleteBookFromList = async (bookID) => {
    await fetch(
      `https://hackson5.herokuapp.com/readinglist/delete/${
        readingListID.split("/")[1]
      }/${bookID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const deletedBookIndex = bookData.findIndex((books) => {
      return books.key === `/works/${bookID}`;
    });

    const newBookArray = [
      ...bookData.slice(0, deletedBookIndex),
      ...bookData.slice(deletedBookIndex + 1),
    ];
    setBookData(newBookArray);
  };

  const patchRating = async (bookid) => {
    const currentReadingListID = readingListID.split("/")[1];
    await fetch(
      `https://hackson5.herokuapp.com/readinglist/${currentReadingListID}/${bookid}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: value,
        }),
      }
    );
  };

  console.log(bookData);
  if (bookData.length === 0) {
    return <Alert severity="info">Your list is empty.</Alert>;
  } else {
    return bookData?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.bookCover}>
              <img
                className={styles.searchImage}
                src={
                  typeof arr.covers === "object"
                    ? `https://covers.openlibrary.org/b/id/${arr.covers[0]}-L.jpg`
                    : `https://covers.openlibrary.org/b/id/${arr.covers}-L.jpg`
                }
                width={100}
              />
              <div className={styles.starRating}>
                <Rating
                  name="unique-rating"
                  value={arr.rating}
                  onChange={(event, newValue) => {
                    (bookData[index].rating = newValue),
                      setBookData([...bookData]);
                    setValue(newValue);
                  }}
                />
                <Button
                  onClick={() => {
                    patchRating(arr.key.split("/works/")[1]);
                  }}
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
                  Submit Rating
                </Button>
              </div>
            </div>
            <div className={styles.titleButtonContainer}>
              <p>{arr.title}</p>
              <Button
                onClick={() => {
                  deleteBookFromList(arr.key.split("/works/")[1]);
                }}
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
                Remove Book
              </Button>
            </div>
          </div>
        </div>
      );
    });
  }
}
