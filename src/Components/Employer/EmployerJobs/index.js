import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import JobForm from "./JobForm";
import Sidebar from "./Sidebar";

function EmployerJobs() {
  const [postAjob, setPostAjob] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(true);
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    desc: "",
    domain: "",
    skills: [],
  });

  const selectAjob = (data) => {
    if (!data) {
      setJobData({
        title: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        desc: "",
        domain: "",
        skills: [],
      });
      setPostAjob(true);
    } else {
      setJobData(data);
      setPostAjob(true);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          sm={3}
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: "block" },
          }}
        >
          <Sidebar selectAjob={selectAjob} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
          }}
        >
          <JobForm
            jobData={jobData}
            setJobData={setJobData}
            postAjob={postAjob}
          />
        </Grid>
      </Grid>
      <Button onClick={() => setMobileSidebar(!mobileSidebar)}>switch</Button>
    </>
  );
}

export default EmployerJobs;
