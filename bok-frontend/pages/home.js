import { useEffect, useState } from "react";
import Head from "next/head";
import ReadingList from "../components/ReadingList";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import FavouriteAuthorsBarChart from "../components/FavouriteAuthorsBarChart";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

//the home page which is displayed after successful login.

function Home() {
  const [readingList, setReadingList] = useState();

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

  return (
    //add a button to stats component
    //button will link to profile page

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
      <p className={styles.bokDescription}>
        BÖK is your online personal library. Add and rate the books you love to
        your curated lists.
      </p>
      <div className={styles.FavAutChart}>
        <h3>Favourite Authors</h3>
        <div className={styles.FavAutBarChart}>
          <FavouriteAuthorsBarChart />
        </div>
        <Link href="/profile">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ textTransform: "none" }}
            sx={{
              m: 1,
              borderRadius: 3,
              fontSize: 14,
            }}
          >
            My Profile
          </Button>
        </Link>
      </div>
      <h3>My Reading Lists</h3>
      <Link href="/myLists">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ textTransform: "none" }}
          sx={{
            m: 1,
            borderRadius: 3,
            fontSize: 14,
          }}
        >
          View all Lists
        </Button>
      </Link>

      <div className={styles.listContainer}>
        <ReadingList
          readingList={readingList}
          setReadingList={setReadingList}
        />
      </div>
    </div>
  );
}

export default withPageAuthRequired(Home);
