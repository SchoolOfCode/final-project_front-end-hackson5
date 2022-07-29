import { useState, useEffect } from "react";
import styles from "../styles/BookItem.module.css";
import { Button } from "@mui/material";

//Renders onto individual list page. Fetches book data from specific list passed down from the prop: booklist.

export function DisplayBook({ bookList, readingListID }) {
  const [bookData, setBookData] = useState([]);
  console.log(readingListID.split("/")[1]);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedBookData = [];
      bookList?.map(async (bookID) => {
        const res = await fetch(`https://openlibrary.org/works/${bookID}.json`);
        const data = await res.json();

        console.log(data);

        fetchedBookData = [...fetchedBookData, data];
        setBookData(fetchedBookData);
      });
    };
    fetchData();
  }, [bookList]);

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

    console.log(true);
  };

  return bookData?.map((arr, index) => {
    return (
      <div key={index} className={styles.bookContainer}>
        <div>
          <img
            src={`https://covers.openlibrary.org/b/id/${arr.covers[0]}-L.jpg`}
            width={100}
          />
        </div>
        <div className={styles.infoContainer}>
          <p>{arr.title}</p>
          {/* <p>{arr.description}</p> */}
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
