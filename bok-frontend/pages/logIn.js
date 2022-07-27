import React from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button';
import styles from "../styles/Login.module.css"

function login() {
  return (
    <div className={styles.loginContainer}>
    <Image src="/BokLogo.png" width="100" height="60"></Image>
    <div className={styles.buttonContainer}>
      <Button variant="filled">Sign Up</Button>
      <Button variant="filled">Login</Button>
    </div>
    </div>
  )
}

export default login