import styles from "../styles/BookItem.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

//Fetches all user's reading list and displays on Home and myLists pages.

function ReadingList({ readingList }) {
  const { user } = useUser();
  const router = useRouter();

  //Navigates to the individual list page based on user list selection
  const handleClick = (route) => {
    router.push("list/?id=" + route);
  };

  //Deletes a user's list and sends the request to the database.
  const deleteFromList = async (id) => {
    await fetch(`https://hackson5.herokuapp.com/readinglist/list/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  return readingList?.map((arr) => {
    return (
      <div key={arr.reading_list_id} className={styles.bookContainer}>
        <div className={styles.infoContainer}>
          <p>{arr.reading_list_name}</p>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(
                `${user.sub.substring(user.sub.indexOf("|") + 1)}/${
                  arr.reading_list_id
                }`
              );
            }}
          >
            View list
          </Button>
          <Button
            variant="contained"
            onClick={() => deleteFromList(arr.reading_list_id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });
}

export default ReadingList;
