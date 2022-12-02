import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import "./styles.css";
import { section2_info } from "../text/data";
import { UserContext } from "../context/UserContext";
function Section2() {
  
  const [state, dispatch] = useContext(UserContext);
  return (
    <Grid container  style={{
      margin: "4rem 0",
      color: state.darkMode ? "#fff" : "#111",
      backgroundColor: state.darkMode ? "#111" : "#fff",
     padding: '3rem 0', border: '1px solid lightgray'}} className="section-2">
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, width: "100%", textAlign: "center" }}
      >
        One Platform <br /> Many{" "}
        <span style={{ color: "blue" }}> Solutions</span>
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          padding: "2rem",
          justifyContent: "center",
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
              minWidth: '250px',
              padding: '1.5rem',
              border: '1px solid lightgray',
              borderRadius: '1rem',
              display: "flex",
              backgroundColor: "#fff",
              alignItems: "center",
              gap: '1rem'
            }}
          >
            <img width='64' src={item.img} alt='item' />
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
