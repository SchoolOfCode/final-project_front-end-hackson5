import { Alert, Button, Snackbar } from "@mui/material";
import styles from "../styles/BookItem.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { ReadingListDropDown } from "./ReadingListDropDown";
import Link from "next/link";

//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it

export default function BookSearchDisplay({ data, bookInfoDisplay }) {
  const { user } = useUser();
  const [allReadingLists, setallReadingLists] = useState();
  const [readingListSelection, setReadingListSelection] = useState();
  const [listSelectionId, setListSelectionId] = useState();
  const [listSelectWarning, setListSelectWarning] = useState(false);
  const [bookAddedSuccess, setBookAddedSuccess] = useState(false);

  console.log(listSelectionId);

  //Fetchs all reading lists for a user
  // useEffect(() => {
  //   const fetchReadingLists = async () => {
  //     const response = await fetch(
  //       `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
  //         user.sub.indexOf("|") + 1
  //       )}`
  //     );
  //     const data = await response.json();
  //     setallReadingLists(data.payload);
  //   };
  //   fetchReadingLists();
  // }, [user]);

  //Sends a post request based on a user's selected reading list and adds a book to it
  // const handleClick = async (bookId) => {
  //   if (listSelectionId) {
  //     setListSelectWarning(false);
  //     const id = user.sub.substring(user.sub.indexOf("|") + 1);
  //     const response = await fetch(
  //       `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
  //         user.sub.indexOf("|") + 1
  //       )}/${listSelectionId}`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ books: bookId }),
  //       }
  //     );
  //     setBookAddedSuccess(true);
  //     return;
  //   }
  //   setListSelectWarning(true);
  // };

  //Selecting the user's reading list and saving the reading list id
  const handleSelectionChange = (e) => {
    const index = e.target.selectedIndex;
    setListSelectionId(e.target.childNodes[index].id);
    setReadingListSelection(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setListSelectWarning(false);
    setBookAddedSuccess(false);
  };

  if (!data) {
    return <CircularProgress />;
  } else {
    return data?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div className={styles.infoContainer}>
            <div>
              <img
                className={styles.searchImage}
                src={
                  typeof arr.covers === "object"
                    ? `https://covers.openlibrary.org/b/id/${arr.cover_i[0]}-L.jpg`
                    : `https://covers.openlibrary.org/b/id/${arr.cover_i}-L.jpg`
                }
                width={100}
              />
            </div>
            <div className={styles.contentContainer}>
              <p>{arr.title}</p>
              <div className={styles.authorAndButton}>
                <p>
                  {!arr.author_name ? "Author Unknown" : arr.author_name[0]}
                </p>
                <Button
                  onClick={() => bookInfoDisplay(arr.key)}
                  color="secondary"
                  variant="contained"
                  size="large"
                  style={{ textTransform: "none" }}
                  sx={{
                    borderRadius: 3,
                    fontSize: 14,
                  }}
                >
                  More Info
                </Button>
              </div>
              <div>
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
                    borderRadius: 3,
                    fontSize: 14,
                  }}
                >
                  Add To List
                </Button>

                <Link href="/myLists">
                  <a>
                    <Snackbar
                      open={listSelectWarning}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert severity="error" onClose={handleClose}>
                        {" "}
                        Create or select a list to get started - click me to go
                        to your lists{" "}
                      </Alert>
                    </Snackbar>
                  </a>
                </Link>

                <Snackbar
                  open={bookAddedSuccess}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert severity="success" onClose={handleClose}>
                    Book added to your list
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
