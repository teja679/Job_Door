import { Grid, Typography } from "@mui/material";
import React from "react";
import { section3_info } from "../text/data";

function Section3() {
  return (
    <Grid
      container
      sx={{ padding: "3rem 0", border: "1px solid lightgray" }}
      className="section-2"
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, width: "100%", textAlign: "center" }}
      >
        Featured Job Circulars
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          padding: "2rem",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        {section3_info.map((item, index) => (
          <Grid
            key={index}
            md={3}
            sm={6}
            xs={12}
            item
            sx={{
              margin: "1.5rem",
              padding: "1rem",
              border: "1px solid lightgray",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              alignItems: "left",
              gap: "1rem",
            }}
          >
            <div style={{display: "flex", alignItems: "center", justifyContent: 'flex-start' }}>
              <img src={item.img} width="60" alt="logo" />
              <div style={{margin: 0}}>
                <h2>{item.company}</h2>
                <p>{item.jobType}</p>
              </div>
            </div>
            <Grid sm={12}>{item.title}</Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Section3;
