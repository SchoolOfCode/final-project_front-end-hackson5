import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { DisplayBookFromUserList } from "../components/DisplayBookFromUserList";

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

  //Fetchs all book ids for a specific reading list and passes it down to the DisplayBook component
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/books/${urlQuery[0]}/${urlQuery[1]}`
      );
      const data = await res.json();

      let list = [];

      data?.payload.map((arr) => {
        list = [...list, arr.books];
      });

      setbookIDList(list);
    };
    fetchData();
  }, [urlQuery[0]]);

  const confirmEdit = async () => {
    setEditInputHidden(!editInputHidden);
    console.log(newUserListName);
  };

  //Function that edits the name of a list by sending a patch request to backend
  //then fires a GET request to get the updated data and set the new list name
  //to the state that displays the current list name
  //The initial state of uniqueListId  sets the list name based on the url.
  // router.push is to reset the url to the new list name provided. This is
  //for when the page is refreshed.
  const editListName = async () => {
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
    <div>
      <p>{uniqueListId}</p>
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
          fontFamily: "Arial",
          fontWeight: 100,
        }}
      >
        Edit List Name
      </Button>
      <input
        type="text"
        hidden={editInputHidden}
        onChange={(e) => setNewUserListName(e.target.value)}
      ></input>

      <button onClick={() => editListName()} hidden={editInputHidden}>
        EDIT
      </button>

      <DisplayBookFromUserList bookList={bookIDList} readingListID={id} />
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
