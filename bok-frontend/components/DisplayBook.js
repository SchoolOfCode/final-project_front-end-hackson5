import { useState, useEffect } from "react";
import styles from "../styles/BookItem.module.css";

//Renders onto individual list page. Fetches book data from specific list passed down from the prop: booklist.

export function DisplayBook({ bookList }) {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let bookData = [];
      let testlist = ["OL82563W", "OL45883W"];

      testlist.map(async (bookID) => {
        const res = await fetch(`https://openlibrary.org/works/${bookID}.json`);
        const data = await res.json();
        bookData = [...bookData, data];
        setBookData(bookData);
      });
    };
    fetchData();
  }, [bookList]);
  console.log(bookData);
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
          <p>{arr.description}</p>
        </div>
      </div>
    );
  });
}
