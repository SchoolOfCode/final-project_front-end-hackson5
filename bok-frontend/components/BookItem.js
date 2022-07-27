//This is a component which includes a bookcover image, book title, description and an add to list button.
//It uses data as props pass down to the component and maps through it

import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import styles from "../styles/BookItem.module.css"

export default function BookItem({data}) {
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
  );
}
