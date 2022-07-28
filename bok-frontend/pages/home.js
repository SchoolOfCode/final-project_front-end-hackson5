import Head from "next/head";
import ReadingList from "../components/ReadingList";
import Stats from "../components/Stats";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getStaticProps = async () => {
  const res = await fetch("https://hackson5.herokuapp.com/readinglist/1234");
  const data = await res.json();

  console.log(data);
  return {
    props: { readingList: data },
  };
};


function Home({ readingList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stats />
      <ReadingList readingList={readingList}/>
    </div>
  );
}

export default withPageAuthRequired(Home);
