import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function stats() {
  return <div>stats</div>;
}

export default stats;
export const getServerSideProps = withPageAuthRequired();
