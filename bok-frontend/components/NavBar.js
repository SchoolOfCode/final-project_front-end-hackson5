import {useState} from "react";
import TextField from "@mui/material/TextField";
import theme from "../pages/src/theme";
import styles from "../styles/NavBar.module.css"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import Link from "next/link"

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>   
    <div className={styles.container}>
     <div className={styles.ImagePadding}>
     <Link href="/"> 
      <a><Image src="/BokLogo.png" width="100" height="60"></Image></a>
     </Link>
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
      <IconButton aria-label="option" className={styles.HamburgerMenu}  onClick={() => setMenuOpen(true)}>
        <MenuIcon></MenuIcon>
      </IconButton>
    </div>
      {menuOpen && <div className={styles.menuContainer}>
        <CloseIcon onClick={() => setMenuOpen(false)}/>
          <div className={styles.menuContentContainer}> 
        <Link href="/"><a onClick={() => setMenuOpen(false)}>Home</a></Link>
        <Link href="/user"><a onClick={() => setMenuOpen(false)}>Profile</a></Link>
        <Link href="/stats"><a onClick={() => setMenuOpen(false)}>Stats</a></Link>
        <Link href="/displayallreadinglist"><a onClick={() => setMenuOpen(false)}>Lists</a></Link>
      </div>
      </div>}
    </div>
  );
}

export default NavBar;
