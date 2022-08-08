import React from "react";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { Button } from "@mui/material";

function login() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <Image
          alt="BOK logo"
          src="/BokLogo.png"
          width="500"
          height="300"
        ></Image>
        <div className={styles.loginButtonsContainer}>
        <a style={{ textDecoration: "none" }} href="/api/auth/login">
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            sx={{
              width: 100,
              borderRadius: 3,
              fontSize: 18,
              color: "#484848",
            }}
          >
            Login
          </Button>
        </a>
        <a style={{ textDecoration: "none" }} href="/api/auth/login">
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            sx={{
              width: 100,
              borderRadius: 3,
              fontSize: 18,
              color: "#484848",
            }}
          >
            Signup
          </Button>
        </a>
        </div>
      </div>
    </div>
  );
}

export default login;
