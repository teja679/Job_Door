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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RoomIcon from "@mui/icons-material/Room";
import { db } from "../../../firebaseConfig";
import { Button, Grid, Input } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function CandidateJobs() {
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("users"));

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
          status: "applied",
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
    <div>Loading...</div>
  ) : (
    <>
      <h1>Jobs</h1>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", marginBottom: '4rem' }}
        className="sidebar"
      >
        {allJobs && allJobs.length > 0 ? (
          allJobs.map((job) => (
            <Grid
              md={4}
              container
              key={job.applicationId}
              sx={{
                maxWidth: "400px",
                width: "90%",
                padding: "1rem",
                margin: "1rem",
                display: "flex",
                textAlign: "left",
                fontSize: "16px",
                justifyContent: "center",
                border: "1px solid lightgray",
                borderRadius: "0.7rem",
              }}
            >
              <Grid sx={{ fontWeight: "600", textAlign: "left" }} item xs={12}>
                {job.title}
              </Grid>
                <Grid item xs={6} sx={{ fontSize: "15px", color: 'primary.main' }}>
                  <RoomIcon />
                  {job.location}
                </Grid>
                <Grid item xs={6}  sx={{ fontSize: "15px", color: 'primary.main' }}>
                  <CurrencyRupeeIcon />
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
              <Button variant="contained" onClick={() => applyForJob(job)}>
                Apply
              </Button>
            </Grid>
          ))
        ) : allJobs && allJobs.length === 0 ? (
          <div>No data posted</div>
        ) : (
          <div>No data available</div>
        )}
      </Grid>
    </>
  );
}

export default CandidateJobs;
