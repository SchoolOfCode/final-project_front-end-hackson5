//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import styles from "../styles/BookItem.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function BookItem({ data, bookInfoDisplay }) {

  if (!data) {
    return <CircularProgress />;
  } else {
    return data?.map((arr, index) => {
      return (
        <div key={index} className={styles.bookContainer}>
          <div>
            <img
              src={`https://covers.openlibrary.org/b/id/${arr.cover_i}-L.jpg`}
              width={100}
            />
          </div>
          <div className={styles.infoContainer}>
            <p>{arr.title}</p>
            <p>{arr.author_name[0]}</p>
            <Button variant="contained">Add to list</Button>
          </div>
          <button onClick={() => bookInfoDisplay(arr.key)}>Open</button>
        </div>
      );
    })
  }
}
