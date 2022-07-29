import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

//Displays the reading stats for a user

function stats() {
  return <div>stats</div>;
}

export default stats;
export const getServerSideProps = withPageAuthRequired();
