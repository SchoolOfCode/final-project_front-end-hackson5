import styles from "../styles/BookItem.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";


function ReadingList({ readingList }) {
  const router = useRouter();
  const handleClick = (route) => {
    router.push("list/?id=" + route)
  }

  console.log(readingList);

  return readingList.payload?.map((arr) => {
    return (
      <div key={arr.reading_list_id} className={styles.bookContainer}>
        <div className={styles.infoContainer}>
          <p>{arr.reading_list_name}</p>
          <Button variant="contained" onClick={() => {handleClick(`1234/${arr.reading_list_id}`);}}>View list</Button>
        </div>
      </div>
    );
  });
}

export default ReadingList;
