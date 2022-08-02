import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FavouriteSubjectPieChart from "../components/FavouriteSubjectPieChart";
import MonthlyBookReadBarChart from "../components/MonthlyBookReadBarChart";

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
          <Rating readOnly name="simple-controlled" value={4.5} />
          <h2>Total Books on Lists:</h2>
          <p>5</p>
        </div>
        <div>
          <h3>Favourite Subject</h3>
          <FavouriteSubjectPieChart />
        </div>
        <div>
          <h3>Monthly Books Read</h3>
          <MonthlyBookReadBarChart />
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
