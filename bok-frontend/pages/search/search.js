import React from "react";
import NavBar from "../../components/NavBar"
import BookItem from "../../components/BookItem";

function search() {

  const data = [{
    image: "https://www.creativindie.com/wp-content/uploads/2012/07/treachery-217x300.jpg",
    title: "book title",
    description: "book description" 
  },
  {
    image: "https://www.creativindie.com/wp-content/uploads/2012/07/treachery-217x300.jpg",
    title: "book title",
    description: "book 2" 
  },
  {
    image: "https://www.creativindie.com/wp-content/uploads/2012/07/treachery-217x300.jpg",
    title: "book title",
    description: "book description" 
  },]

  return (
    <div>
      <div>search</div>
      <BookItem data={data} />
    </div>
  );
}

export default search;
