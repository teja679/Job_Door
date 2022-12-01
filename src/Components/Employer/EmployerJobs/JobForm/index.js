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
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../../context/UserContext";

function JobForm({ selectAjob, jobData, setJobData}) {
  const [state, dispatch] = useContext(UserContext)
  const userInfo = state.user
  console.log(userInfo)
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
    const Job_id = uuid();
    // localStorage.setItem('jobData', JSON.stringify(jobData))
    try {
      if (jobData.Job_id) {
        await setDoc(doc(db, "jobsData", jobData.Job_id), {
          ...jobData,
        });
      } else {
        
        await setDoc(doc(db, "jobsData", Job_id), {
          Job_id: Job_id,
          ...jobData,
          employerId: userInfo.uid,
          createdAt: new Date(),
          employerName: userInfo.displayName,

        });
      }
      selectAjob(false)
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
    <div
    // sx={{ display: "flex", color: "orange" }}
    >
      <h1>Job Form</h1>
      <form onSubmit={submitJob} className="job-form">
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "95%",
            margin: "auto",
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6">Job Title</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6">Company Name</Typography>
            <TextField
              required 
              variant="outlined"
              fullWidth
              value={jobData.company}
              onChange={(e) =>
                setJobData({ ...jobData, company: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Description</Typography>
            <TextField
              required multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={jobData.desc}
              onChange={(e) => setJobData({ ...jobData, desc: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12}>
            <Button type='submit' variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default JobForm;
