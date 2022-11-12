import { useTheme } from "@emotion/react";
import {
  Button,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function CandidateOnboarding() {
  const data = JSON.parse(localStorage.getItem('users'))
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: data?.email ? data?.email : "",
    phone: "",
    experience: "",
    education: "",
    domain: "",
    skills: [],
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const submitUserInfo = () => {
    localStorage.setItem('user', userInfo)
    console.log("submit", userInfo);
  };
  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };
  const theme = useTheme();

  const skillSet = [
    "Java",
    "JavaScript",
    "React",
    "HTML",
    "Angular",
    "CSS",
    "Bootstrap",
  ];
  const domainItems = [
    "Frontend",
    "Backend",
    "Full Stack",
    "React",
    "JavsScript",
    "Java",
    "C++",
  ];
  return (
    <form onSubmit={submitUserInfo}>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "10px",
          maxWidth: "95%",
          margin: "20px auto",
          boxShadow: "0px 8px 24px #789",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Name</Typography>
          <TextField required placeholder="Enter name"
            variant="outlined"
            fullWidth
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Email</Typography>
          <TextField required disabled
            variant="outlined"
            fullWidth
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Phone</Typography>
          <TextField  placeholder="Enter phone number"
            variant="outlined"
            fullWidth
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Experience</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.experience}
            onChange={(e) =>
              setUserInfo({ ...userInfo, experience: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Education</Typography>
          <TextField required placeholder="Enter education"
            variant="outlined"
            fullWidth
            value={userInfo.education}
            onChange={(e) =>
              setUserInfo({ ...userInfo, education: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Domain</Typography>
          <Select
            fullWidth
            labelId="demo"
            id="demo-simple-select"
            value={userInfo.domain}
            label="Age"
            onChange={(e) =>
              setUserInfo({ ...userInfo, domain: e.target.value })
            }
          >
            {domainItems.map((domain, index) => (
              <MenuItem key={index} value={domain}>
                {domain}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} >
          <Typography variant="h6">Skills</Typography>
          <Select required placeholder="Skills"
            label='skills'
            fullWidth
            id="demo-multiple-chip"
            multiple
            value={userInfo.skills}
            onChange={handleSkillChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {skillSet.map((skill) => (
              <MenuItem
                key={skill}
                value={skill}
                // style={getStyles(skill, userInfo.skills, theme)}
              >
                {skill}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} >
          <Button fullWidth onClick={submitUserInfo}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CandidateOnboarding;
