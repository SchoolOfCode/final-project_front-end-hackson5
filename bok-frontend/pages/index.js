import React from "react";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { Button } from "@mui/material";

 


function login() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
      <Image alt="BOK logo" src="/BokLogo.png" width="500" height="300" ></Image>
     
      <a style={{textDecoration:"none"}} href="/api/auth/login">
      
        <Button
          color="secondary"
          variant="contained"
          size="large"
          style={{textTransform: 'none'}}
          sx={{ width: 100, m: 5, pl: 10, pr: 10, borderRadius: 3, fontSize: 18, fontFamily: "Arial", fontWeight:100 }}
        >
          
          Login
        </Button>
      </a>
      <a style={{textDecoration:"none" }} href="/api/auth/login">
        
        <Button

          color="secondary"
          variant="contained"
          size="large"
          style={{textTransform: 'none'}}
          sx={{ width: 100, pl: 10, pr: 10, borderRadius: 3, fontSize: 18 }}
        >
         
          Signup
        </Button>
      </a>
     
     </div>
    </div>
  );
}

export default login;
