import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

function NavBar() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [inputValue, setInputValue] = useState("");
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
        <div className={styles.navbarContainer}>
          <Link href="/home">
            <a>
              <img className={styles.logo} src="/BokLogo.png"></img>
            </a>
          </Link>
          <TextField
            style={{
              backgroundColor: "#D5D6B4",
              borderRadius: 4,
              border: "none",
              padding: 6,
            }}
            type="text"
            value={inputValue}
            placeholder="Search books..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
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
          ></TextField>
          <IconButton
            aria-label="option"
            className={styles.hamburgerMenu}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <div className={styles.desktopLinksContainer}>
            <Link href="/profile">
              <a
                style={{
                  textDecoration: "none",
                  color: "#484848",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </a>
            </Link>
            <Link href="/myLists">
              <a
                style={{
                  textDecoration: "none",
                  color: "#484848",
                }}
                onClick={() => setMenuOpen(false)}
              >
                My Lists
              </a>
            </Link>
            <Link href="/surpriseme">
              <a
                style={{
                  textDecoration: "none",
                  color: "#484848",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Surprise Me
              </a>
            </Link>
            <Link href="/api/auth/logout">
              <a
                style={{
                  textDecoration: "none",
                  color: "#484848",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          menuOpen
            ? `${styles.menuContainer} ${styles.bgDimOpen}`
            : styles.menuContainer
        }
        onClick={() => setMenuOpen(false)}
      >
        <CloseIcon className={styles.closeIcon} />
      </div>
      <div
        className={
          menuOpen
            ? `${styles.menuContentContainer} ${styles.menuOpen}`
            : styles.menuContentContainer
        }
      >
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={user?.picture} alt={user?.name} />
          <div style={{ fontWeight: "bold" }}>{user?.name}</div>
        </div>
        <div className={styles.linksContainer}>
          <Link href="/home">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </Link>
          <Link href="/profile">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              Profile
            </a>
          </Link>
          <Link href="/stats">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              Stats
            </a>
          </Link>
          <Link href="/myLists">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              My Lists
            </a>
          </Link>
          <Link href="/surpriseme">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              Surprise Me
            </a>
          </Link>
          <Link href="/api/auth/logout">
            <a className={styles.menuLinks} onClick={() => setMenuOpen(false)}>
              Logout
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
