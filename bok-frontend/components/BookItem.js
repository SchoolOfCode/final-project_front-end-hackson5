//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import styles from "../styles/BookItem.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { ReadingListDropDown } from "./ReadingListDropDown";

export default function BookItem({ data, bookInfoDisplay }) {
  const { user } = useUser();
  const [allReadingLists, setallReadingLists] = useState();
  const [readingListSelection, setReadingListSelection] = useState();
  const [listSelectionId, setListSelectionId] = useState();

  useEffect(() => {
    const fetchReadingLists = async () => {
      const response = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await response.json();
      setallReadingLists(data.payload);
    };
    fetchReadingLists();
  }, [user]);

  const handleClick = async (bookId) => {
    const id = user.sub.substring(user.sub.indexOf("|") + 1);
    const response = await fetch(
      `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
        user.sub.indexOf("|") + 1
      )}/${listSelectionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ books: bookId }),
      }
    );
  };

  const handleSelectionChange = (e) => {
    const index = e.target.selectedIndex;
    setListSelectionId(e.target.childNodes[index].id);
    setReadingListSelection(e.target.value);
  };

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
            <ReadingListDropDown
              readingListData={allReadingLists}
              handleChange={handleSelectionChange}
              readingListSelection={readingListSelection}
            />
            <Button
              variant="contained"
              onClick={() => handleClick(arr.key.split("/works/")[1])}
            >
              Add to list
            </Button>
          </div>
          <button onClick={() => bookInfoDisplay(arr.key)}>Open</button>
        </div>
      );
    });
  }
}
