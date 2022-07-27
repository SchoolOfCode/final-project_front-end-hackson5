import React from 'react'
import styles from "../styles/BookItem.module.css"
import { Button } from '@mui/material'

// export const getStaticProps = async() => {
//   const res = await fetch ("")
//   const data = await res.json

//   return {
//     props: {readingList: data}
//   }
// }

function ReadingList({readingList}) {
  const data = [{
    id: 1,
    listTitle: "History",
    image: "https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg"
  },
  {
    id: 2,
    listTitle: "Sci-fi",
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1637008457"
  }]

  
  return (
    data?.map((arr) => {
        return (
          <div key={arr.id} className={styles.bookContainer}>
        <div>
          <img src={arr.image} width={100}/>
        </div>
        <div className={styles.infoContainer}>
          <p>{arr.listTitle}</p>
          <Button variant="contained">View list</Button>
        </div>
      </div>
          )
      })
  )
}

export default ReadingList