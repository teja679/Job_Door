import { Tune } from "@mui/icons-material";
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
    setPostAjob(true)
    setMobileSidebar(false)
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
    <div className="jobs">
      <Grid container sx={{
        color: 'rgb(31, 93, 117)',
        background: 'rgb(238, 252, 255)',
        //  height: '100vh',
      }}>
         <Grid
          xs={12}
          md={3.5}
          sm={5}
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
          }}
        >
          <Sidebar setPostAjob={setPostAjob} selectAjob={selectAjob} />
        </Grid>
        <Grid
          xs={12}
          md={8.5}
          sm={7}
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: "block" },
          }}
        >
          <Button fullWidth
          sx={{
            display: { xs: 'block', sm : 'none'}
          }} 
          onClick={() => setMobileSidebar(true)}>
            Back
          </Button>
          <JobForm selectAjob={selectAjob} jobData={jobData} setJobData={setJobData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployerJobs;
