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
          <Button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            Switch
          </Button>
        <Grid
          xs={12}
          md={3.5}
          sm={5}
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: "block" },
          }}
        >
          <Sidebar selectAjob={selectAjob} jobData={jobData} />
        </Grid>
        <Grid
          xs={12}
          md={8.5}
          sm={7}
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
          }}
        >
          <JobForm setJobData={setJobData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployerJobs;
