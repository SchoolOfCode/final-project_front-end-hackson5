import { useEffect, useState } from "react";
import BookItem from "../../components/BookItem";
import { useRouter } from "next/router";
import styles from "../../styles/Search.module.css"

function search() {
  const [data, setData] = useState();
  const [displayOpen, setDisplayOpen] = useState(false);
  const [bookKey, setBookKey] = useState();
  const [bookData, setBookData] = useState();
  var router = useRouter();
  var id = router.query["id"];

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

  useEffect(() => {
    let key = bookKey?.split("/works/");
    console.log(key);
    const fetchData = async () => {
      const res = await fetch(`https://openlibrary.org/works/${key[1]}.json`);
      const data = await res.json();
      setBookData(data);
    };
    if (bookKey) {
      fetchData();
    }
  }, [bookKey]);

  const bookInfoDisplay = (key) => {
    setBookKey(key);
    setDisplayOpen(true);
  };

  console.log(data)

  return (
    <div>
      <div>Search results for: {id}</div>
        {/* <div className={styles.backgroundDim}>test</div> */}
      {displayOpen && (
        <div className={styles.popupContainer}>
          <div onClick={() => setDisplayOpen(false)}>x</div>
          <div>{bookData?.title}</div>
          <div className={styles.descriptContainer}>{bookData?.description}</div>
        </div>
      )}
      <BookItem data={data} bookInfoDisplay={bookInfoDisplay} />
    </div>
  );
}

export default search;
