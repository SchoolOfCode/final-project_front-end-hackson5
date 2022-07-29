import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import BookItem from "../components/BookItem";
import { DisplayBook } from "../components/DisplayBook";

function individuallist() {
  const [listId, setListId] = useState([]);
  var router = useRouter();
  var id = router.query["id"];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://hackson5.herokuapp.com/readinglist/books/${id}`
      );
      const data = await res.json();

      let list = [];

      data?.payload.map((arr) => {
        list = [...list, arr.books];
      });

      setListId(list);
    };
    fetchData();
  }, [id]);

  console.log(listId);

  return (
    <div>
      <DisplayBook bookList={listId} readingListID={id} />
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
