import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

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
        <div className={styles.ImagePadding}>
          <Link href="/home">
            <a>
              <Image src="/BokLogo.png" width="100" height="60"></Image>
            </a>
          </Link>
        </div>
        <input
          type="text"
          name="route"
          placeholder="Search Book..."
          value={inputContent}
          onChange={(e) => {
            setRoute(e.target.value);
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" ? handleSubmit(e) : console.log(false);
          }}
        />
        {/* <TextField
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
      /> */}
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
