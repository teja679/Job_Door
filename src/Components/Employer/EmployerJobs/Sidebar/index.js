import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, querySnapshot } from "firebase/firestore";
import { db } from '../../../../firebaseConfig'
import { Button, Grid } from "@mui/material";

function Sidebar({ selectAjob }) {
  const [allJobs, setAllJobs] = useState(null);
  const fetchJobs = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const q = query(collection(db, "jobsData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
       querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs)
        console.log("Current jobs: ", jobs);
    }) 
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  return(
    <div>
      <Button
       onClick={() => selectAjob(false)}
       >post a job</Button>
      {allJobs && allJobs.length > 0 ? (
        allJobs.map((job) => (
          <Grid
            container
            onClick={() => selectAjob(job)}
            key={job.job_id}
            sx={{
              padding: "10px",
              margin: "10px",
              border: "1px solid",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            <Grid item xs={12}>
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