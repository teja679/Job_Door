import { useTheme } from "@emotion/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig'
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
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function CandidateOnboarding() {
  
  const [state, dispatch] = useContext(UserContext)
  // const userData = JSON.parse(localStorage.getItem('users'))
  const userData = state.user;
  // console.log(userData)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData?.email : "",
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
  const submitUserInfo = async (e) => {
    e.preventDefault()
    // console.log(userData)

    try {
      await setDoc(doc(db, 'userData', `${userData.uid}`), {
        ...userInfo, type: 'candidate'
      })
      alert('sucessfully submitted')
      navigate('../../candidate/profile')
    }
    catch(e){
      console.error('Error adding document', e)
    }
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
    <>
      <h1>Candidate Onboarding</h1>
      <form onSubmit={submitUserInfo}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "1rem",
            maxWidth: "95%",
            height: '90%',
            margin: "20px auto",
            // boxShadow: "0px 8px 24px #789",
            // background: "#fff",
            borderRadius: "8px",
            marginBottom: '4rem'
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Name</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Email</Typography>
            <TextField disabled
              required
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
            <TextField
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
            <TextField
              required
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
              labelId="demo-simple-select-label"
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
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Skills</Typography>
            <Select
              required
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
          <Grid item xs={12}>
            <Button variant="contained" type='submit'>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CandidateOnboarding;
