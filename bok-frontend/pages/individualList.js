import React from "react";
import NavBar from "../components/NavBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function individuallist() {
  return (
    <div>
      <NavBar />
      <div>lists</div>
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
