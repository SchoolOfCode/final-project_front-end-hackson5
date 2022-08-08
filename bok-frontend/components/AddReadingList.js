import { useState } from "react";
import { Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "../styles/SurpriseMe.module.css";

//Sends a post request to the database to add a new reading list for a user

function AddReadingList({ setReadingList, readingList }) {
  const { user } = useUser();
  const [warning, setWarning] = useState(false);
  const [userListNameInput, setUserListNameInput] = useState("");

  
  
  //Post request to database. body: user_id is the user id from auth0 and the reading_list_name is the user's new reading list name
  const handleClick = async () => {
    const checkDuplicate = readingList.filter(list => {
     return userListNameInput === list.reading_list_name
    })
     
    if (
      userListNameInput.length <= 2 ||
      /^[a-zA-Z\s\-]*$/.test(userListNameInput) === false  || checkDuplicate.length !== 0 
      ) {
     
      setWarning(true);
      return;
    }
    
    setUserListNameInput("");
    setWarning(false);
    const id = user.sub.substring(user.sub.indexOf("|") + 1);
    await fetch(`https://hackson5.herokuapp.com/readinglist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
        reading_list_name: userListNameInput,
      }),
    }).then(async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await res.json();
      setReadingList(data.payload);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <input
          className={styles.search}
          value={userListNameInput}
          onChange={(e) => setUserListNameInput(e.target.value)}
          placeholder="Enter a List Name..."
        />
        <Button
          onClick={() => handleClick()}
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
          Add List
        </Button>
      </div>
      {warning && (
        <p style={{ color: "rgb(251, 72, 72)", textAlign: "center" }}>
          Your list name needs to be more than three characters and contains no
          numbers or special characters!
        </p>
      )}
    </div>
  );
}

export default AddReadingList;
