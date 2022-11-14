import { useTheme } from "@emotion/react";
import { db } from '../../../firebaseConfig'
import {
  Button,   Grid,  MenuItem,
  OutlinedInput,  Select,  TextField,  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

function EmployerOnboarding() {
  const userData = JSON.parse(localStorage.getItem('users'))
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData?.email : "",
    phone: "",
    company: '',
    size: "",
    hrEmail: "",
    address: "",
    industry: "",
  });
const submitUserInfo = async (e) => {
    e.preventDefault()
    try{
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo, type: 'employer'
      })
    } catch (e) {
        console.error("Error adding document", e)
    }
    console.error("submit", userInfo)
  };
  
  const industryType = [
    "Agriculture",
    "Manufacturing",
    "Food",
    "Texttile",
    "It",
    "Construction",
    "Design",
  ];
  return (
    <form onSubmit={submitUserInfo}>
      <h1>employer Onboarding</h1>
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
          <Typography variant="h6">Company Name</Typography>
          <TextField placeholder="Enter Company Name"
            variant="outlined"
            fullWidth
            value={userInfo.company}
            onChange={(e) =>
              setUserInfo({ ...userInfo, company: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Company Size</Typography>
          <TextField placeholder="Enter Company size"
            variant="outlined"
            fullWidth
            value={userInfo.size}
            onChange={(e) =>
              setUserInfo({ ...userInfo, size: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">HR Email</Typography>
          <TextField required placeholder="Enter HR Email"
            variant="outlined"
            fullWidth
            value={userInfo.hrEmail}
            onChange={(e) =>
              setUserInfo({ ...userInfo, hrEmail: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Company Address</Typography>
          <TextField  placeholder="Enter address"
            variant="outlined"
            fullWidth
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <Typography variant="h6">Industry</Typography>
          <Select
            fullWidth
            labelId="demo"
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
        <Grid item xs={12} >
          <Button fullWidth onClick={submitUserInfo}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding