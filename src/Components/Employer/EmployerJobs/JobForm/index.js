import { useTheme } from "@emotion/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function JobForm() {
  // const jobsData = JSON.parse(localStorage.getItem("users"));

  const [jobData, setJobData] = useState({
    name: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    desc: "",
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
  const submitJob = async (e) => {
    e.preventDefault();
    alert('jobdata')
    const job_id = uuid();
    // localStorage.setItem('jobData', JSON.stringify(jobData))
    try {
      console.log('Hai')
      if (jobData.job_id) {
        await setDoc(doc(db, "jobsData", jobData.job_id), {
          ...jobData,
        });
      } else {
        console.log("hai");
        await setDoc(doc(db, "jobsData", job_id), {
          job_id: job_id,
          ...jobData,
          empployerId: jobData.uid,
          createdAt: new Date(),
        });
      }
      alert("Job Data updated");
    } catch (e) {
      console.error("Error adding document", e);
    }
    console.log("submit", jobData);
  };
  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData({
      ...jobData,
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
    <>
      <h1>Job Form</h1>
      <form className="job-from">
        <Grid
          container
          spacing={2}
          sx={{
            padding: "10px",
            maxWidth: "95%",
            margin: "auto",
            // boxShadow: "0px 8px 24px #789",
            // background: "#fff",
            borderRadius: "8px",
            // background: 'rgba(0,228,255,1)'
          }}
        >
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Name</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={jobData.name}
              onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Location</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={jobData.location}
              onChange={(e) =>
                setJobData({ ...jobData, location: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Salary</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={jobData.salary}
              onChange={(e) =>
                setJobData({ ...jobData, salary: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Experience</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={jobData.experience}
              onChange={(e) =>
                setJobData({ ...jobData, experience: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Job Type</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={jobData.jobType}
              onChange={(e) =>
                setJobData({ ...jobData, jobType: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Description</Typography>
            <TextField
              required
              row={2}
              variant="outlined"
              fullWidth
              value={jobData.desc}
              onChange={(e) => setJobData({ ...jobData, desc: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Domain</Typography>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jobData.domain}
              label="Age"
              onChange={(e) =>
                setJobData({ ...jobData, domain: e.target.value })
              }
            >
              {domainItems.map((domain, index) => (
                <MenuItem key={index} value={domain}>
                  {domain}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "1rem 0" }}>
            <Typography variant="h6">Skills</Typography>
            <Select
              required
              fullWidth
              id="demo-multiple-chip"
              multiple
              value={jobData.skills}
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
                  // style={getStyles(skill, jobData.skills, theme)}
                >
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} onClick={submitJob}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default JobForm;
