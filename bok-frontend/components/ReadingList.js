import {useState} from "react";
import styles from "../styles/BookItem.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";


function ReadingList({ readingList }) {
  const router = useRouter();
  const [route, setRoute] = useState();

  console.log(route)

  const handleClick = () => {
    router.push("list/?id=" + route)
  }


  const data = [
    {
      id: 1,
      listTitle: "History",
      image:
        "https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg",
    },
    {
      id: 2,
      listTitle: "Sci-fi",
      image:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1637008457",
    },
  ];

  console.log(readingList);

  return readingList.payload?.map((arr) => {
    return (
      <div key={arr.reading_list_id} className={styles.bookContainer}>
        <div className={styles.infoContainer}>
          <p>{arr.reading_list_name}</p>
          <Button variant="contained" onClick={() => {setRoute(`1234/${arr.reading_list_id}`); handleClick();}}>View list</Button>
        </div>
      </div>
    );
  });
}

export default ReadingList;
