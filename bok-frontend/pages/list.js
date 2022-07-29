import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { DisplayBookFromUserList } from "../components/DisplayBookFromUserList";

//A users individual list to see all books

function individuallist() {
  const [bookIDList, setbookIDList] = useState([]);
  var router = useRouter();

  //user id followed by reading list id e.g /1234/4
  var id = router.query["id"];

  //Fetchs all book ids for a specific reading list and passes it down to the DisplayBook component
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

      setbookIDList(list);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <DisplayBookFromUserList bookList={bookIDList} readingListID={id} />
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
