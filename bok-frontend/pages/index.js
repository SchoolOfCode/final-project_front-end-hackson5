import React from "react";
import Image from "next/image";
import styles from "../styles/Login.module.css";

function login() {
  return (
    <div className={styles.loginContainer}>
      <Image src="/BokLogo.png" width="100" height="60"></Image>
      <div className={styles.buttonContainer}>
        <a href="/api/auth/login">Signup</a>
        <a href="/api/auth/login">Login</a>
      </div>
    </div>
  );
}

export default login;
