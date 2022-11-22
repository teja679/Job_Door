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
    <div className="section-2">
      <h1>One Platform Many Solutions</h1>
      <div className="container">
        {info.map((item) => (
          <div className="item-div">
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
