import { useEffect, useState } from "react";
import Head from "next/head";
import ReadingList from "../components/ReadingList";
import Stats from "../components/Stats";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";

function Home() {
  const [readingList, setReadingList] = useState();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/${user.sub.substring(
          user.sub.indexOf("|") + 1
        )}`
      );
      const data = await res.json();

      setReadingList(data.payload.slice(0, 2));

      console.log(data);
    };
    fetchData();
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stats />
      <ReadingList readingList={readingList} />
    </div>
  );
}

export default withPageAuthRequired(Home);
