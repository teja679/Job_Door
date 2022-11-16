import { useTheme } from "@emotion/react";
import { db } from "../../../../firebaseConfig";
import { v4 as uuid } from "uuid";
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
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function JobForm({ postAjob, jobData, setJobData }) {
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("user"));

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
  async function submitJob(e) {
    const job_id = uuid();
    if (jobData.job_id) {
      await setDoc(doc(db, "jobsData", jobData.job_id), {
        ...jobData,
      });
    } else {
      await setDoc(doc(db, "jobsData", job_id), {
        ...jobData,
        job_id: job_id,
        employerId: userInfo.uid,
        createdAt: new Date(),
      });
    }
    alert("Job Posted Successfully");
  }
  return (
    <>
      {postAjob ? (
        <form onSubmit={submitJob}>
          <h1>Job Form</h1>
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
              <Typography variant="h6">Job Title</Typography>
              <TextField
                required
                variant="outlined"
                fullWidth
                value={jobData.title}
                onChange={(e) =>
                  setJobData({ ...jobData, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Salary</Typography>
              <TextField
                type="number"
                required
                variant="outlined"
                fullWidth
                value={jobData.salary}
                onChange={(e) =>
                  setJobData({ ...jobData, salary: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Experience</Typography>
              <TextField
                required
                variant="outlined"
                fullWidth
                value={jobData.experience}
                onChange={(e) =>
                  setJobData({ ...jobData, experience: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                fullWidth
                required
                multiline
                rows={4}
                variant="outlined"
                value={jobData.desc}
                onChange={(e) =>
                  setJobData({ ...jobData, desc: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Domain</Typography>
              <Select
                required
                fullWidth
                labelId="demo"
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
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Skills</Typography>
              <Select
                required
                placeholder="Skills"
                label="skills"
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
            <Grid>
              <Button variant="contained" color="primary" onClick={submitJob}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>please select a job</div>
      )}
    </>
  );
}

export default JobForm;
