import { useEffect, useState } from "react";
import Head from "next/head";
import ReadingList from "../components/ReadingList";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import FavouriteAuthorsBarChart from "../components/FavouriteAuthorsBarChart"
import Image from "next/image"

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
        <title>BOK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.WelcomeImg}>
      <Image
          alt="Welcome to BOK"
          src="/Welcome.png"
          width="400"
          height="300"
        ></Image>
        </div>     
        <div className={styles.FavAutChart}>
          <h3>Favourite Authors</h3>
          <div className={styles.FavAutBarChart}><FavouriteAuthorsBarChart /></div>
        </div>
      <ReadingList readingList={readingList} bookCovers={bookCoverID}/>
    </div>
  );
}

export default withPageAuthRequired(Home);
