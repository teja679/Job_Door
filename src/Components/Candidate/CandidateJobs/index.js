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
import { v4 as uuid } from "uuid";

function CandidateJobs() {
  const [loading, setLoading] = useState(true)
  const userInfo = JSON.parse(localStorage.getItem("users"));
  const employerId = userInfo.uid;

  const [allJobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    const q = await query(collection(db, "jobsData"));
   
    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      jobs.push(doc.data());
    });
      setAllJobs(jobs);
      setLoading(false)
      // console.log("Current jobs: ", jobs);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const applyJob = async (job) => {
    const applicationId = uuid();
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let jobsData = [];
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        jobsData.push(doc.data());
      });
    })
    console.log(jobsData)
    const isApplied = jobsData.find(item => item.jobId === job.Job_id)
    if(isApplied){
      alert('already applied')
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
        status: 'applied',
        candidate_name: userInfo.displayName,
        company_name: job.company_name
      });

      alert("Job applied successfully");
    } catch (e) {
      console.error("Error adding document", e);
    }
  } 
}
  return (
    loading ? <div>Loading...</div> : 
    <div className="sidebar">
      {allJobs && allJobs.length > 0 ? (
        allJobs.map((job) => (
          <Grid
            container
            key={job.applicationId}
            sx={{
              maxWidth: "600px",
              width: "90%",
              margin: "0",
              display: "flex",
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
            <Button variant="contained" fullWidth onClick={() => applyJob(job)}>
              Apply
            </Button>
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

export default CandidateJobs;
