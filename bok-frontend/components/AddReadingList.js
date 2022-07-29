import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

//Sends a post request to the database to add a new reading list for a user

function AddReadingList() {
  const { user } = useUser();
  const [userListNameInput, setUserListNameInput] = useState("");

  //Post request to database. body: user_id is the user id from auth0 and the reading_list_name is the user's new reading list name
  const handleClick = async () => {
    const id = user.sub.substring(user.sub.indexOf("|") + 1);
    await fetch(`https://hackson5.herokuapp.com/readinglist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
        reading_list_name: userListNameInput,
      }),
    });
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Add list</button>
      <input onChange={(e) => setUserListNameInput(e.target.value)} />
    </div>
  );
}

export default AddReadingList;
