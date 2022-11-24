import React, { useEffect, useState } from "react";
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
import { Button, Grid, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuid } from "uuid";

function Applications() {
  const [loading, setLoading] = useState(true)
  const userInfo = JSON.parse(localStorage.getItem("users"));
  const employerId = userInfo.uid;

  const [allApllications, setAllApllications] = useState(null);
  const fetchJobs = async () => {
    const q = await query(collection(db, "applications"),
    where("candidateId", "==", userInfo.uid))
    const data = [];

    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllApllications(data);
      setLoading(false)
      // console.log("Current jobs: ", jobs);
  
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    loading ? <div>Loading...</div> : 
    <div className="sidebar">
      {allApllications && allApllications.length > 0 ? (
        allApllications.map((job) => (
          <Grid
            container
            onClick={() => (job)}
            key={job.applicationId}
            sx={{
              maxWidth: "600px",
              width: "90%",
              padding: "1rem",
              margin: "auto",
              display: "flex",
              // flexDirection: 'column',
              borderRadius: "10px",
              fontSize: "16px",
              boxShadow: "0px -2px 1px #789",
            }}
          >
            <Grid sx={{ fontWeight: "600" }} item xs={12}>
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
            <Button variant="contained" fullWidth>
              {/* Apply */}
            </Button>
          </Grid>
        ))
      ) : allApllications && allApllications.length === 0 ? (
        <div>No data f</div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Applications