import React, { useContext, useEffect, useState } from "react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {
  Box,
  Button,
  Chip,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../context/UserContext";

function Applications() {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const userInfo = state.user;
  const employerId = userInfo.uid;

  const [allApllications, setAllApllications] = useState(null);
  const fetchJobs = async () => {
    const q = await query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    const data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
      console.log(doc.data());
    });
    setAllApllications(data);
    setLoading(false);
    // console.log("Current jobs: ", jobs);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {allApllications && allApllications.length > 0 ? (
            allApllications.map((job) => (
              <Grid
                container
                key={job.applicationId}
                sx={{
                  width: "350px",
                  minWidth: "350px",
                  height: "350px",
                  minHeight: "350px",
                  padding: "1rem",
                  margin: "20px",
                  textAlign: "left",
                  borderRadius: "10px",
                  border: "1px solid lightgray",
                  fontSize: "16px",
                }}
              >
                <Grid
                  sx={{ fontWeight: "600", fontSize: "1.5rem" }}
                  item
                  xs={12}
                >
                  {job.company}
                </Grid>
                <Grid sx={{ fontWeight: "400" }} item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      margin: "0.5rem 0",
                      color: "lightgray",
                    }}
                  >
                    OPEN POSITIONS:
                  </Typography>{" "}
                  {job.title}
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                >
                  <Grid item xs={12} sx={{ display: "flex", color: "navy" }}>
                    <RoomRoundedIcon /> {job.location}
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", color: "orange" }}>
                    <CurrencyRupeeRoundedIcon />
                    <Typography sx={{ fontSize: "1.2rem",}}>
                      {job.salary}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {job.experience}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {job.jobType}
                </Grid>
                <Grid sx={{ color: "lightgray", fontSize: "0.8rem" }}>
                  <Typography sx={{ fontSize: "0.8rem", margin: "0.5rem 0" }}>
                    SKILLS REQUIRED
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {job.skills.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Chip
                    color={"primary"}
                    sx={{ borderRadius: "10px" }}
                    label="Applied"
                  />
                </Grid>
              </Grid>
            ))
          ) : allApllications && allApllications.length === 0 ? (
            <div>No data found</div>
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </>
  );
}

export default Applications;
