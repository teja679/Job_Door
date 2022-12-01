import { useTheme } from "@emotion/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig'
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function EmployerOnboarding() {
  const [state, dispatch] = useContext(UserContext)
  const userData = state.user
  
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData?.email : "",
    phone: "",
    company: "",
    size: '',
    hrEmail: '',
    address: '',
    industry: "",
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
  async function saveInfo (e) {
    e.preventDefault()
    try {
      await setDoc(doc(db, 'userData', `${userData.uid}`), {
        ...userInfo, type: 'employer'
      }, {mergin: true})
      alert('sucessfully submitted')
      navigate('/employer/profile')
    }
    catch (e){
      console.error('Error adding document', e)
    }
    console.log('submit', userInfo)
  }
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
  const industryType = [
    "Agriculture",
    "Manufacturing",
    "It",
    "Banking",
    "Texttile",
    "Automobile",
    "Marketing",
    "Food",
  ];
  return (
    <>
      <h1>Employer Onboarding</h1>
      <form onSubmit={saveInfo}>
        <Grid
          container 
          xs={12}
          spacing={2}
          sx={{
            padding: "1rem",
            maxWidth: "95%",
            height: '90%',
            margin: "20px auto",
          }}
        >
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
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
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
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
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
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
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Company Name</Typography>
            <TextField 
                variant="outlined"
              fullWidth
              value={userInfo.company}
              onChange={(e) =>
                setUserInfo({ ...userInfo, company: e.target.value })
              }
            />
          </Grid>
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Company Size</Typography>
            <TextField
                  variant="outlined"
              fullWidth
              value={userInfo.size}
              onChange={(e) =>
                setUserInfo({ ...userInfo, size: e.target.value })
              }
            />
          </Grid>
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">HR Email</Typography>
            <TextField
                  variant="outlined"
              fullWidth
              value={userInfo.hrEmail}
              onChange={(e) =>
                setUserInfo({ ...userInfo, hrEmail: e.target.value })
              }
            />
          </Grid>
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Company Address</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </Grid>
          <Grid item={true} xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Industry Type</Typography>
            <Select
                fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.industry}
              label="Age"
              onChange={(e) =>
                setUserInfo({ ...userInfo, industry: e.target.value })
              }
            >
              {industryType.map((ind, index) => (
                <MenuItem key={index} value={ind}>
                  {ind}
                </MenuItem>
              ))}
            </Select>
          </Grid>
         <Grid xs={12}>
            <Button type='submit'>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EmployerOnboarding;