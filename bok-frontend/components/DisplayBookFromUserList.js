import { useState, useEffect } from "react";
import styles from "../styles/BookItem.module.css";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//Renders onto individual list page. Fetches book data from specific list passed down from the prop: booklist.

export function DisplayBookFromUserList({ bookList, readingListID }) {
  const [bookData, setBookData] = useState([]);

  //Fetches request to the book api which returns data on each individual book within the user's reading list
  useEffect(() => {
    const fetchData = async () => {
      let fetchedBookData = [];
      bookList?.map(async (bookID) => {
        const res = await fetch(`https://openlibrary.org/works/${bookID}.json`);
        const data = await res.json();

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
  };

  if (bookData.length === 0) {
    return <CircularProgress />;
  } else {
    return bookData?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div>
            <img
              src={
                typeof arr.covers === "object"
                  ? `https://covers.openlibrary.org/b/id/${arr.covers[0]}-L.jpg`
                  : `https://covers.openlibrary.org/b/id/${arr.covers}-L.jpg`
              }
              width={100}
            />
          </div>
          <div className={styles.infoContainer}>
            <p>{arr.title}</p>
            {arr.description && (
              <p>
                {typeof bookData?.description === "object"
                  ? bookData?.description.value
                  : bookData?.description}
              </p>
            )}
            <Button
              variant="contained"
              onClick={() => {
                deleteBookFromList(arr.key.split("/works/")[1]);
              }}
            >
              Remove book from list
            </Button>
          </div>
        </div>
      );
    });
  }
}
