import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Button, Alert } from "@mui/material";
import { DisplayBookFromUserList } from "../components/DisplayBookFromUserList";
import styles from "../styles/List.module.css";

//A users individual list to see all books

function individuallist() {
  const [bookIDList, setbookIDList] = useState([]);
  var router = useRouter();
  //user id followed by reading list id e.g /1234/4
  var id = router.query["id"];
  const urlQuery = id.split("/");
  const [editInputHidden, setEditInputHidden] = useState(true);
  const [newUserListName, setNewUserListName] = useState("");
  const [uniqueListId, setUniqueListId] = useState(urlQuery[2]);
  const [warning, setWarning] = useState(false);

  //Fetchs all book ids for a specific reading list and passes it down to the DisplayBook component
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/books/${urlQuery[0]}/${urlQuery[1]}`
      );
      const data = await res.json();

      let list = [];

      data?.payload.map((arr) => {
        list = [...list, { bookid: arr.books, rating: arr.rating }];
      });

      setbookIDList(list);
    };
    fetchData();
  }, [urlQuery[0]]);

  const confirmEdit = async () => {
    setEditInputHidden(!editInputHidden);
  };

  //Function that edits the name of a list by sending a patch request to backend
  //then fires a GET request to get the updated data and set the new list name
  //to the state that displays the current list name
  //The initial state of uniqueListId  sets the list name based on the url.
  // router.push is to reset the url to the new list name provided. This is
  //for when the page is refreshed.
  const editListName = async () => {
    if (
      newUserListName.length <= 2 ||
      /^[a-zA-Z\s\-]*$/.test(newUserListName) === false
    ) {
      setWarning(true);
      return;
    }
    setWarning(false);

    setEditInputHidden(!editInputHidden);
    await fetch(`https://hackson5.herokuapp.com/readinglist/${urlQuery[1]}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listname: newUserListName,
      }),
    }).then(async () => {
      const response = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${urlQuery[0]}/${urlQuery[1]}`
      );
      const data = await response.json();
      setUniqueListId(data.payload[0].reading_list_name);
      router.push(
        `list/?id=${urlQuery[0]}/${urlQuery[1]}/${data.payload[0].reading_list_name}`,
        undefined,
        { shallow: true }
      );
    });
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listNameContainer}>
        <p>{uniqueListId}</p>
      </div>
      {editInputHidden && (
        <Button
          onClick={() => confirmEdit()}
          color="secondary"
          variant="contained"
          size="large"
          style={{ textTransform: "none" }}
          sx={{
            m: 1,
            borderRadius: 3,
            fontSize: 14,
          }}
        >
          Edit Name
        </Button>
      )}
      {!editInputHidden && (
        <div>
          <input
            className={styles.search}
            placeholder="Enter new name..."
            type="text"
            hidden={editInputHidden}
            onChange={(e) => setNewUserListName(e.target.value)}
          ></input>
          <Button
            onClick={() => editListName()}
            color="secondary"
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            sx={{
              m: 1,
              borderRadius: 3,
              fontSize: 14,
            }}
          >
            Update
          </Button>
        </div>
      )}

      {warning && (
        <Alert severity="error">
          {" "}
          Your list name needs to be more than three characters and contains no
          numbers or special characters!
        </Alert>
      )}

      <DisplayBookFromUserList
        className={styles.displayBook}
        bookList={bookIDList}
        readingListID={id}
      />
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
