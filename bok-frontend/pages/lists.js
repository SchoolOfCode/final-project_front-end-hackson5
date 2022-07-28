import React from "react";
import ReadingList from "../components/ReadingList";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function lists() {
  return <div>{/* <ReadingList /> */}</div>;
}

export default lists;
export const getServerSideProps = withPageAuthRequired();
