import {useEffect, useState} from "react";
import BookItem from "../../components/BookItem";
import { useRouter } from "next/router";

function search() {
  const [data, setData] = useState();
  var router = useRouter();
  var id = router.query["id"];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://openlibrary.org/search.json?title=${id}`)
      const data = await res.json();

      setData(data.docs.slice(0, 10))
    }
    fetchData();
  }, [id])


  console.log(data)
  return (
    <div>
      <div>Search results for: {id}</div>
      { <BookItem data={data} /> }
    </div>
  );
}

export default search;
