import { Button, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { EmployersList, JobSeekersList, QuickLinksList } from "../text/data";

function Footer() {
  
  const [state, dispatch] = useContext(UserContext)
  console.log(state)
  const navigate = useNavigate();
  const reRoute = (page) => {
    console.log(page);
    if(state.user){
      navigate(`${page}`);
    }
    else navigate('candidate/auth')
  };
  return (
    <div style={{ backgroundColor: '#232323', color: 'white'}}>
      <Grid container spacing={5} sx={{padding: '4rem', textAlign: 'left'}}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{fontWeight: 600, fontSize: '1.4rem'}}>About Us</Typography> <br />
          <Grid sx={{fontSize: '18px'}}>
            Way to Job is a global online employment platform, which connects
            students, freshers and professionals who are in search of excellent
            job opportunities with the top companies who are in need of talented
            workforce. Way to job provides an exclusive opportunity for the
            colleges and institutions to register their students to get special
            attention from the employers. We are connecting thousands of
            aspirant job seekers with top employment opportunities of MNCs in
            India and abroad, which will give the access to both stakeholders to
            find the exposed positions with various companies and to employ the
            best talent available at the market, which would be tough to find
            mostly.
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography sx={{fontWeight: 600, fontSize: '1.4rem'}}>Quick Links</Typography> <br/>
          {QuickLinksList.map((item, index) => (
            <Grid sx={{fontSize: '20px'}} key={index}>{item}</Grid>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography sx={{fontWeight: 600, fontSize: '1.4rem'}}>Employers</Typography> <br/>
          {EmployersList.map((item, index) => (
            <Grid sx={{fontSize: '20px'}} key={index}>{item}</Grid>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography sx={{fontWeight: 600, fontSize: '1.4rem'}}>Job Seekers</Typography> <br/>
          {JobSeekersList.map((item, index) => (
            <Button fullwidth onClick={()=>reRoute(item.link)} sx={{fontSize: '15px', color: '#fff'}} key={index}>{item.title}</Button>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
