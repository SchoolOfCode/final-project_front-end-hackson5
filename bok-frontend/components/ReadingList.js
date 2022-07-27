import React from 'react'
import styles from "../styles/BookItem.module.css"

export const getStaticProps = async() => {
  const res = await fetch ("")
  const data = await res.json

  return {
    props: {readinglist: data}
  }
}

function ReadingList({readingList}) {
  return (
    readingList.map((arr, index) => {
        return (
          <div key={arr.id} className={styles.bookContainer}>
        <div>
          {/*<img src={arr.image} width={100}/>*/}
        </div>
        <div className={styles.infoContainer}>
          <p>{arr.title}</p>
          <p>{arr.description}</p>
          <Button variant="contained">Add to list</Button>
        </div>
      </div>
          )
      })
  )
}

export default ReadingList