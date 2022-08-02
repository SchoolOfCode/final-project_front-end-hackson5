import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField, } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchIcon from '@mui/icons-material/Search';

function NavBar() {
  const router = useRouter();
  const [inputContent, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    router.push("search/?id=" + route);
  };

  return (
    <div>
      <div className={styles.container}>
       
          <Link href="/home">
            <a>
              <Image src="/BokLogo.png" width="100" height="60"  ></Image>
            </a>
          </Link>
       <TextField     
        style={{backgroundColor: "#D5D6B4",  borderRadius: 4, border: "none", padding: 6  }}
        type="text"
        placeholder="Search books..."
        variant="standard"
      
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end" >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
            setRoute(e.target.value);
            setInputValue(e.target.value);
          }}
        onKeyDown={(e) => {
            e.key === "Enter" ? handleSubmit(e) : console.log(false);
          }}
      >
      </TextField>
        <IconButton
          aria-label="option"
          className={styles.HamburgerMenu}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
      </div>
      {menuOpen && (
        <div className={styles.menuContainer}>
          <CloseIcon onClick={() => setMenuOpen(false)} />
          <div className={styles.menuContentContainer}>
            <Link href="/home">
              <a onClick={() => setMenuOpen(false)}>Home</a>
            </Link>
            <Link href="/profile">
              <a onClick={() => setMenuOpen(false)}>Profile</a>
            </Link>
            <Link href="/stats">
              <a onClick={() => setMenuOpen(false)}>Stats</a>
            </Link>
            <Link href="/myLists">
              <a onClick={() => setMenuOpen(false)}>My Lists</a>
            </Link>
            <Link href="/surpriseme">
              <a onClick={() => setMenuOpen(false)}>Surprise Me</a>
            </Link>
            <Link href="/api/auth/logout">
              <a onClick={() => setMenuOpen(false)}>Logout</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;


