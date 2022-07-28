import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

function individuallist() {

  var router = useRouter();
  var id = router.query["id"];
  return (
    <div>
      <div>lists</div>
    </div>
  );
}

export default individuallist;
export const getServerSideProps = withPageAuthRequired();
