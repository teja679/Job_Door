import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { section2_info } from "../text/data";
function Section2() {
  return (
    <Grid container className="section-2">
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, width: "100%", textAlign: "center" }}
      >
        One Platform Many{" "}
        <span style={{ color: "blue" }}> Solutions</span>
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          padding: "2rem",
          justifyContent: "space-between",
          textAlign: 'left',
        }}
      >
        {section2_info.map((item, index) => (
          <Grid minWidth={0}
            key={index}
            md={3} sm={6} xs={12}
            item
            flexGrow={1}
            sx={{
              margin: '1.5rem',
              padding: '1.5rem',
              border: '1px solid lightgray',
              borderRadius: '1rem',
              display: "flex",
              backgroundColor: "#fff",
              alignItems: "center",
              gap: '1rem'
            }}
          >
            <img src={item.img} alt='item' />
            <Typography variant="h5">
              {item.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Section2;
