import { useEffect, useState } from "react";
import ReadingList from "../components/ReadingList";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import AddReadingList from "../components/AddReadingList";

function AllReadingLists() {
  const { user } = useUser();
  const [readingList, setReadingList] = useState();

  //Fetchs all reading lists for a specific user
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await res.json();
      setReadingList(data.payload);
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <AddReadingList />
      <ReadingList readingList={readingList} setReadingList={setReadingList} />
    </div>
  );
}

export default withPageAuthRequired(AllReadingLists);
