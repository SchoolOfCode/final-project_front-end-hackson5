import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FavouriteSubjectPieChart from "../components/FavouriteSubjectPieChart";

//Displays the users profile information

export default function user() {
   const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
      <div>
        <img src={user?.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <h2>Your Statistic</h2>
        <Typography component="legend">Average Star Rating</Typography>
      <Rating
        readOnly
        name="simple-controlled"
        value= {3}
      />
      <h2>Total Books on Lists:</h2>
      <p>5</p>
      </div>
      <div>
        <FavouriteSubjectPieChart />
      </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();