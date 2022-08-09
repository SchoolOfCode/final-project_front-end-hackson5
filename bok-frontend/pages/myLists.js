import { useEffect, useState } from "react";
import ReadingList from "../components/ReadingList";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import AddReadingList from "../components/AddReadingList";
import styles from "../styles/mylists.module.css";

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

  console.log(readingList);
  return (
    <div className={styles.mylistcontainer}>
      <AddReadingList
        setReadingList={setReadingList}
        readingList={readingList}
      />
      <ReadingList readingList={readingList} setReadingList={setReadingList} />
    </div>
  );
}

export default AllReadingLists;
