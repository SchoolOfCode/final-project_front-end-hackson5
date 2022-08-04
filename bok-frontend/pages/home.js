import { useEffect, useState } from "react";
import Head from "next/head";
import ReadingList from "../components/ReadingList";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";

//the home page which is displayed after successful login.

function Home() {
  const [readingList, setReadingList] = useState();
  const [bookCoverID, setBookCoverID] = useState([]);
  const { user } = useUser();

  //Fetchs all reading lists for a specific user and passes the first two to readingList component
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await res.json();

      setReadingList(data.payload.slice(0, 2));
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      let bookID = [];
      readingList?.map(async (readinglistID) => {
        const res = await fetch(
          `https://hackson5.herokuapp.com/readinglist/books/${user.sub.substring(
            user.sub.indexOf("|") + 1
          )}/${readinglistID.reading_list_id}`
        );
        const data = await res.json();
        bookID = [...bookID, data.payload[0].books];
        setBookCoverID(bookID);
      });
    };
    fetchData();
  }, [readingList]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReadingList readingList={readingList} bookCovers={bookCoverID} />
    </div>
  );
}

export default withPageAuthRequired(Home);
