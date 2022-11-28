import { Grid, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import CampaignIcon from "@mui/icons-material/Campaign";

function Section2() {
  const info = [
    {
      icon: <CampaignIcon  sx={{fontSize: '3rem', color: 'gray'}}/>,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },
    {
      icon: <CampaignIcon  sx={{fontSize: '3rem', color: 'gray'}}/>,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },
    {
      icon: <CampaignIcon  sx={{fontSize: '3rem', color: 'gray'}}/>,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },
    {
      icon: <CampaignIcon  sx={{fontSize: '3rem', color: 'gray'}}/>,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },
    {
      icon: <CampaignIcon  sx={{fontSize: '3rem', color: 'gray'}}/>,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },{
      icon: <CampaignIcon />,
      header: "Marketing & Communication",
      para: "237 Jobs Available",
    },
  ];
  return (
    // <Grid container className="section-2">
    //   <Typography variant="h4" sx={{fontWeight: 700, textAlign: 'center'}}>
    //   One Platform Many Solutions
    //   </Typography>
    //   <Grid container sx={{margin: 'auto', justifyContent: 'center'}}>
    //   {info.map((item) => (
    //       <div className="item-div">
    //         {item.icon}
    //         <div className="data-div">
    //           <h2>Marketing & Communication</h2>
    //           <p>237 Jobs Available</p>
    //         </div>
    //       </div>
    //     ))}
    //   </Grid>
    // </Grid>
    <div className="section-2">
      <h1>One Platform Many Solutions</h1>
      <div className="container">
        {info.map((item, index) => (
          <div className="item-div" key={index}>
            {item.icon}
            <div className="data-div">
              <h2>Marketing & Communication</h2>
              <p>237 Jobs Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section2;
