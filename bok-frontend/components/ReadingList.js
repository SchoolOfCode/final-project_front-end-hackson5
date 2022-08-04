import styles from "../styles/BookItem.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

//Fetches all user's reading list and displays on Home and myLists pages.

function ReadingList({ readingList, setReadingList, bookCovers }) {
  const { user } = useUser();
  const router = useRouter();

  //Navigates to the individual list page based on user list selection
  const handleClick = (route) => {
    router.push(`list/?id=${route}`);
  };

  //Deletes a user's list and sends the request to the database.
  const deleteFromList = async (id) => {
    await fetch(`https://hackson5.herokuapp.com/readinglist/list/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const deletedListId = readingList.findIndex((list) => {
      return list.reading_list_id === id;
    });
    const newListArray = [
      ...readingList.slice(0, deletedListId),
      ...readingList.slice(deletedListId + 1),
    ];
    setReadingList(newListArray);
  };

  return readingList?.map((arr, index) => {
    console.log(bookCovers[index]);
    return (
      <div key={arr.reading_list_id} className={styles.bookContainer}>
        <div className={styles.infoContainer}>
          <p>{arr.reading_list_name}</p>
          <img
            src={`https://covers.openlibrary.org/b/id/${bookCovers[index]}-L.jpg`}
            width={100}
          />

          <Button
            onClick={() => {
              handleClick(
                `${user.sub.substring(user.sub.indexOf("|") + 1)}/${
                  arr.reading_list_id
                }/${arr.reading_list_name}
                `
              );
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
            View List
          </Button>
          <Button
            onClick={() => deleteFromList(arr.reading_list_id)}
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
            Delete List
          </Button>
        </div>
      </div>
    );
  });
}

export default ReadingList;
