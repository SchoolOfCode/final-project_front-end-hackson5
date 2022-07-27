import Head from "next/head";
import BookItem from "../components/BookItem";
import Stats from "../components/Stats";
import styles from "../styles/Home.module.css";
  
export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stats />
        </div>
    );
}