import React, { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { Button, Grid, Input } from "@mui/material";
import "../styles.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../../../context/UserContext";

function Sidebar({ selectAjob }) {
  const [state, dispatch] = useContext(UserContext)
  const userInfo = state.user
  console.log(userInfo)
  const employerId = userInfo.uid;

  const [allJobs, setAllJobs] = useState(null);
  const fetchJobs = async () => {
    const q = query(
      collection(
        db,
        "jobsData",
         where('employerId' == employerId)
      )
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
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
    <div className="sidebar">
      <Button fullWidth onClick={() => selectAjob(false)}>
        <AddIcon /> post a job
      </Button>
      <div className="searchbar">
        <SearchIcon />
        <Input placeholder="Search by Job" sx={{ outline: "none" }} />
      </div>
      {allJobs && allJobs.length > 0 ? (
        allJobs.map((job) => (
          <Grid 
            container
            onClick={() => selectAjob(job)}
            key={job.job_id}
            sx={{
              padding: "1rem",
              margin: "10px",
              textAlign: 'left',
              borderRadius: '10px',
              borderBottom: "1px solid gray",
              fontSize: "16px",
              boxShadow: '0px -2px 1px #789',
            }}
          >
            <Grid sx={{fontWeight: '600'}} item xs={12}>
              {job.title}
            </Grid>
            <Grid item xs={12}>
              {job.location}
            </Grid>
            <Grid item xs={12}>
              {job.salary}
            </Grid>
            <Grid item xs={12}>
              {job.experience}
            </Grid>
            <Grid item xs={12}>
              {job.jobType}
            </Grid>
            <Grid item xs={12}>
              {job.domain}
            </Grid>
          </Grid>
        ))
    ) : allJobs && allJobs.length === 0 ? (
        <div>No data posted</div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Sidebar;
