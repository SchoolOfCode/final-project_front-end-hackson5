import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Rating from "@mui/material/Rating";
import styles from "../styles/Profile.module.css";
import Typography from "@mui/material/Typography";
import FavouriteSubjectPieChart from "../components/FavouriteSubjectPieChart";
import FavouriteAuthorsBarChart from "../components/FavouriteAuthorsBarChart";
import MonthlyBooksReadLineChart from "../components/MonthlyBooksReadLineChart";

//Displays the users profile information

export default function user() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className={styles.ProfileContainer}>
        <div className={styles.UserContainer}>
          <img src={user?.picture} alt={user.name} className={styles.UserAvatar}/>
          <div>{user.name}</div>
        </div>
        <div className={styles.StatsContainer}>
        <div>
          <h2>Your Statistics</h2>
          <div className={styles.StarAndTotBooks}>
          <Typography component="legend">Average Star Rating</Typography><br/>
          <Rating readOnly name="simple-controlled" value={4.5} />
          <div>Total Books on Lists:</div><br/>
          <h1>5</h1>
          </div>
        </div>
        <div>
          <h3>Favourite Subject</h3>
          <FavouriteSubjectPieChart />
        </div>
        <div>
          <h3>Favourite Authors</h3>
          <FavouriteAuthorsBarChart />
        </div>
        <div>
          <h3>Monthly Books Read</h3>
          <MonthlyBooksReadLineChart />
        </div>
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
