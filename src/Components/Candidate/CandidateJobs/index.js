import React, { useContext, useEffect, useState } from "react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import RoomIcon from "@mui/icons-material/Room";
import { db } from "../../../firebaseConfig";
import { Box, Button, Chip, Grid, Input, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../context/UserContext";
import Loader from "../../muiComponents/Loader";

function CandidateJobs() {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const userInfo = state.user;
  const [applied, setApplied] = useState(false);
  const [allJobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    try {
      const q = await query(collection(db, "jobsData"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs);

        setLoading(false);
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const applyForJob = async (job) => {
    const applicationId = uuidv4();

    const q = await query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    const job_data = allJobs.map((item) => {
      if (item.uid === job.employerId) {
        item.status = "applied";
      }
    });
    const isApplied = data.find((item) => item.jobId === job.Job_id);

    if (isApplied) {
      alert("already applied");
      return;
    } else {
      try {
        await setDoc(doc(db, "applications", applicationId), {
          applicationId,
          jobId: job.Job_id,
          employerId: job.employerId,
          title: job.title,
          location: job.location,
          createdAt: new Date(),
          candidateId: userInfo.uid,
          company: job.company,
          salary: job.salary,
          experience: job.experience,
          status: "applied",
          skills: job.skills,
          candidate_name: userInfo.displayName,
          // company_name: job.company,
        });

        alert("Job applied successfully");
      } catch (e) {
        console.error("Error adding document", e);
      }
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <h1>Jobs</h1> */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "4rem",
        }}
      >
        {allJobs && allJobs.length > 0 ? (
          allJobs.map((job) => (
            <Grid
              sx={{
                width: "350px",
                minWidth: "350px",
                maxWidth: "350px",
                maxHeight: "350px",
                padding: "1rem",
                margin: "20px",
                textAlign: "left",
                borderRadius: "10px",
                border: "1px solid lightgray",
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  sx={{ margin: "10px 0", display: "block" }}
                  variant="outlined"
                  onClick={() => applyForJob(job)}
                >
                  {job.status === "applied" ? "Applied" : "Apply"}
                </Button>
              </Grid>
            </Grid>
          ))
        ) : allJobs && allJobs.length === 0 ? (
          <div style={{margin: '2rem'}}>No data found</div>
        ) : (
          <div style={{margin: '2rem'}}>No data available</div>
        )}
      </Grid>
    </>
  );
}

export default CandidateJobs;
