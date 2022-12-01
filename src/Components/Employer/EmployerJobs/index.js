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
    company: '',
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
    <div className="jobs"  style={{ height: '80vh'}}>
      <Grid container sx={{
        color: 'rgb(31, 93, 117)',
      }}>
         <Grid
          xs={12}
          md={3}
          sm={6}
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
          }}
        >
          <Sidebar setPostAjob={setPostAjob} selectAjob={selectAjob} />
        </Grid>
        <Grid
          xs={12}
          md={9}
          sm={6}
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
