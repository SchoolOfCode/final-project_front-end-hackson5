import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

function AddToReadingList() {
  const { user } = useUser();
  const [listName, setListName] = useState("");

  const handleClick = async () => {
    const id = user.sub.substring(user.sub.indexOf("|") + 1);
    const response = await fetch(`https://hackson5.herokuapp.com/readinglist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id, reading_list_name: listName }),
    });
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Add list</button>
      <input onChange={(e) => setListName(e.target.value)} />
    </div>
  );
}

export default AddToReadingList;
