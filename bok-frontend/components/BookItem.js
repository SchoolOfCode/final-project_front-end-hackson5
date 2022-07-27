//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it

import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import styles from "../styles/BookItem.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import PopupDisplay from "./PopupDisplay";

export default function BookItem({ data }) {
  const [open, setOpen] = useState(false)
  const [bookKey, setBookKey] = useState()
  const [bookData, setBookData] = useState()

  useEffect(() => {
      let key = bookKey?.split("/works/")
    console.log(key)
      const fetchData = async () => {
          const res = await fetch(`https://openlibrary.org/works/${key[1]}.json`)
          const data = await res.json()
          setBookData(data)
      }
      if (bookKey) {
        fetchData();
      }
  }, [bookKey])

  console.log(bookData)

  if (!data) {
    return <CircularProgress />;
  } else {
    return data?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div>
            <img
              src={`https://covers.openlibrary.org/b/id/${arr.cover_i}-L.jpg`}
              width={100}
            />
          </div>
          <div className={styles.infoContainer}>
            <p>{arr.title}</p>
            <p>{arr.author_name[0]}</p>
            <Button variant="contained">Add to list</Button>
          </div>
          <PopupDisplay data={bookData}/>
          {open && <div onClick={() => setOpen(false)}>Test</div>}
        </div>
      );
    })
  }
}
