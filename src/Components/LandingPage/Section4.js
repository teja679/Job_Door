import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Section4() {
  const navigate = useNavigate();
  const navigateToPage = (path) => {
    navigate(path);
  };
  return (
    <div
      style={{
        background: '#1aa7ec',
        color: 'white',
        display: "flex",
        marginTop: "4rem 0",
      }}
    >
      <img
        width="50%"
        src="https://images.squarespace-cdn.com/content/v1/58e1415ab3db2bb2903c6ce6/1491317767134-GNVEOWYORUAPMMUTUZMY/online-job-search.jpg"
        alt="res"
      />
      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          fontWeight: '500',
          justifyContent: "center",
          textAlign: "left",
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <Typography variant="h3" >
          Get Matched The Most Valuable Jobs, Just Drop Your CV at Staffing
          Solutions
        </Typography>
        <p>
          In the subject line of email, write your name, the description of the
          position you want to apply
        </p>
        <Button onClick={()=>navigateToPage('/candidate/auth')} sx={{ p: "1rem",color:'inherit', borderRadius: "5px", width: '12rem' }} variant="contained">
          Upload Your CV
        </Button>
      </div>
    </div>
  );
}

export default Section4;
