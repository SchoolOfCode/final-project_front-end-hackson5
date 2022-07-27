import React from 'react'

function ReadingList({data}) {
  return (
    data.map((arr, index) => {
        return (
          <div key={index} className={styles.bookContainer}>
        <div>
          <img src={arr.image} width={100}/>
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