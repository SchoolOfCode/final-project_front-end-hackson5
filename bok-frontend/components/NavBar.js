import React from "react";
import TextField from "@mui/material/TextField";
import theme from "../pages/src/theme";
import styles from "../styles/NavBar.module.css"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";

function NavBar() {
  return (
    <div className={styles.container}>
     <div className={styles.ImagePadding}>
      <Image src="/BokLogo.png" width="100" height="60"></Image>
      </div>
      <TextField
        id="standard-basic"
        label="Search..."
        variant="standard"
        sx={{
          color: "primary.main",
          backgroundColor: "primary.main",
          borderRadius: 2,
          border: 1,
          borderColor: "primary.main",
        }}
      />
      <IconButton aria-label="option" className={styles.HamburgerMenu}>
        <MenuIcon ></MenuIcon>
      </IconButton>
    </div>
  );
}

export default NavBar;
