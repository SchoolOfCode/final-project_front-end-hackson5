import { useEffect, useState } from "react";
import BookSearchDisplay from "../../components/BookSearchDisplay";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/Search.module.css";

//Takes in the users query and makes a fetch request based on the user input.
//Fetchs book data matching book title and displays the first 10 results

function search() {
  const [data, setData] = useState();
  const [displayOpen, setDisplayOpen] = useState(false);
  const [bookKey, setBookKey] = useState();
  const [bookData, setBookData] = useState();
  var router = useRouter();

  //The users input from the search bar
  var id = router.query["id"];

  //Searching the book api for books matching user input to book title and fetches data. Displays first 10
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${id}`
      );
      const data = await res.json();

      setData(data.docs.slice(0, 10));
    };
    fetchData();
  }, [id]);

  //Fetches more data based on results from search query and user selection.
  useEffect(() => {
    let key = bookKey?.split("/works/");
    const fetchData = async () => {
      const res = await fetch(`https://openlibrary.org/works/${key[1]}.json`);
      const data = await res.json();
      setBookData(data);
    };
    if (bookKey) {
      fetchData();
    }
  }, [bookKey]);

  //Shows more info based on selected books. Displays as popup
  const bookInfoDisplay = (key) => {
    setBookKey(key);
    setDisplayOpen(true);
  };

  return (
    <div className={styles.searchResultsContainer}>
      {displayOpen && (
        <div
          className={styles.backgroundDim}
          onClick={() => setDisplayOpen(false)}
        ></div>
      )}
      <div
        className={
          displayOpen
            ? `${styles.popupContainer} ${styles.popupOpen}`
            : styles.popupContainer
        }
      >
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setDisplayOpen(false)}
        />
        <div className={styles.popupTitle}>{bookData?.title}</div>
        <div className={styles.descriptContainer}>
          {typeof bookData?.description === "object"
            ? bookData?.description.value
            : bookData?.description}
        </div>
      </div>
      <BookSearchDisplay data={data} bookInfoDisplay={bookInfoDisplay} />
    </div>
  );
}

export default search;
