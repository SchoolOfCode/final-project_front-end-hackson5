import { Button } from "@mui/material";
import styles from "../styles/BookItem.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { ReadingListDropDown } from "./ReadingListDropDown";

//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it

export default function BookSearchDisplay({ data, bookInfoDisplay }) {
  const { user } = useUser();
  const [allReadingLists, setallReadingLists] = useState();
  const [readingListSelection, setReadingListSelection] = useState();
  const [listSelectionId, setListSelectionId] = useState();

  //Fetchs all reading lists for a user
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

  //Sends a post request based on a user's selected reading list and adds a book to it
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

  //Selecting the user's reading list and saving the reading list id
  const handleSelectionChange = (e) => {
    const index = e.target.selectedIndex;
    setListSelectionId(e.target.childNodes[index].id);
    setReadingListSelection(e.target.value);
  };

  console.log(data);

  if (!data) {
    return <CircularProgress />;
  } else {
    return data?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div>
            <img
              src={
                typeof arr.covers === "object"
                  ? `https://covers.openlibrary.org/b/id/${arr.cover_i[0]}-L.jpg`
                  : `https://covers.openlibrary.org/b/id/${arr.cover_i}-L.jpg`
              }
              width={100}
            />
          </div>
          <div className={styles.infoContainer}>
            <p>{arr.title}</p>
            <p>{!arr.author_name ? "Author Unknown" : arr.author_name[0]}</p>
            <ReadingListDropDown
              readingListData={allReadingLists}
              handleChange={handleSelectionChange}
            />

            <Button
              onClick={() => handleClick(arr.key.split("/works/")[1])}
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
          </div>
          <Button
            onClick={() => bookInfoDisplay(arr.key)}
            color="secondary"
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            sx={{
              borderRadius: 3,
              fontSize: 14,
              fontFamily: "Arial",
              fontWeight: 100,
            }}
          >
            More Info
          </Button>
        </div>
      );
    });
  }
}
