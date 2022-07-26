import React from "react";
import TextField from "@mui/material/TextField";
import theme from "../pages/src/theme";

function NavBar() {
  return (
    <div>
      <div>Bok</div>
      <input />
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
      <div>icon</div>
    </div>
  );
}

export default NavBar;
