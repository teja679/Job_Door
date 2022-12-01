import React, { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { Button, Card, Chip, Grid, Input, Typography } from "@mui/material";
import "../styles.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../../../context/UserContext";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import { Box } from "@mui/system";
function Sidebar({ selectAjob }) {
  const [state, dispatch] = useContext(UserContext);
  const userInfo = state.user;
  console.log(userInfo.uid);
  const employerId = userInfo.uid;

  const [allJobs, setAllJobs] = useState(null);
  const fetchJobs = async () => {
    const q = query(
      collection(
        db,
        "jobsData"
        //  where('employerId' == userInfo.uid)
      )
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
      console.log("Current jobs: ", jobs);
    });
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="sidebar" style={{overflow: 'scroll', height: '90vh'}}>
      <Button onClick={() => selectAjob(false)}>
        <AddIcon /> post a job
      </Button>
      {/* <div className="searchbar">
        <SearchIcon />
        <Input placeholder="Search by Job" sx={{ outline: "none" }} />
      </div> */}
      {allJobs && allJobs.length > 0 ? (
        allJobs.map((job) => (
          <Grid
            container
            onClick={() => selectAjob(job)}
            key={job.job_id}
            sx={{
              maxWidth: '350px',
              padding: "1rem",
              margin: "20px 0",
              textAlign: "left",
              borderRadius: "10px",
              border: "1px solid gray",
              fontSize: "16px",
            }}
          >
            <Grid sx={{ fontWeight: "600", fontSize: "1.5rem" }} item xs={12}>
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
                <CurrencyRupeeRoundedIcon /> {job.salary}
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
          </Grid>
        ))
      ) : allJobs && allJobs.length === 0 ? (
        <Grid
          sx={{
            padding: "1rem",
            margin: "20px 0",
            textAlign: "left",
            borderRadius: "10px",
            border: "1px solid gray",
            fontSize: "16px",
          }}
        >
          No data posted
        </Grid>
      ) : (
        <Grid
          sx={{
            padding: "1rem",
            margin: "20px 0",
            textAlign: "left",
            borderRadius: "10px",
            border: "1px solid gray",
            fontSize: "16px",
          }}
        >
          No data available
        </Grid>
      )}
    </div>
  );
}

export default Sidebar;
