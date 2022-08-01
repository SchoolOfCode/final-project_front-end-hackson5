import React from "react";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { Button } from "@mui/material";

function login() {
  return (
    <div className={styles.loginContainer}>
      <Image src="/BokLogo.png" width="500" height="300"></Image>
      {/* <div className={styles.buttonContainer}> */}
      <a style={{textDecoration:"none"}} href="/api/auth/login">
      
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ width: 100, m: 5, pl: 10, pr: 10 }}
        >
          
          Login
        </Button>
      </a>
      <a style={{textDecoration:"none"}} href="/api/auth/login">
        
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ width: 100, pl: 10, pr: 10 }}
        >
         
          Signup
        </Button>
      </a>
      {/* </div> */}
    </div>
  );
}

export default login;
