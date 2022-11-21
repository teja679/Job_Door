import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import JobForm from "./JobForm";
import Sidebar from "./Sidebar";

function EmployerJobs() {
  const [mobileSidebar, setMobileSidebar] = useState(true);
  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        sm={3}
        sx={{
          display: { xs: mobileSidebar ? "block" : "none", sm: "block" },
        }}
      >
        <Sidebar />>
      </Grid>
      <Grid
        xs={12}
        sm={3}
        sx={{
          display: { xs: mobileSidebar ? "none" : "block", sm: "block" },
        }}
      >
        <JobForm />
      </Grid>
      <Button
      sx={{
        display: {xs: 'block', sm: 'none'}
      }}>Switch</Button>
    </Grid>
  );
}

export default EmployerJobs;
