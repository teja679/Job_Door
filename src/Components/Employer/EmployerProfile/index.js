import { useTheme } from "@emotion/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
import React, { useEffect, useState } from "react";

function EmployerProfile() {
  const [edit, setEdit] = useState(false)
  const userData = JSON.parse(localStorage.getItem('users'))

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData?.email : "",
    phone: "",
    comnpany: "",
    size: '',
    hrEmail: '',
    address: '',
    industry: "",
  });
  async function fetchUserInfo() {
    try {
      const docRef = doc(db, 'userData', userData.uid)

      const docSnap = await getDoc(docRef)

      if(docSnap.exists()) {
        console.log('Document Data', docSnap.data())
      }
    }
    catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);
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
  async function saveInfo () {
    try {
      await setDoc(doc(db, 'userData', `${userData.uid}`), {
        ...userInfo,
      }, {mergin: true})
      alert('Successfully updated');
      setEdit(!edit);
    }
    catch (e){
      console.error('Error adding document', e)
    }
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
      <h1>Profile</h1>
      <form>
        <Grid
          xs={10}
          container
          spacing={2}
          sx={{
            padding: "1rem",
            maxWidth: "95%",
            height: '90%',
            margin: "20px auto",
            boxShadow: "0px 8px 24px #789",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Name</Typography>
            <TextField
              required 
              disabled={!edit}
              variant="outlined"
              fullWidth
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
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
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Company Name</Typography>
            <TextField 
            disabled={!edit}
              variant="outlined"
              fullWidth
              value={userInfo.company}
              onChange={(e) =>
                setUserInfo({ ...userInfo, company: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Company Size</Typography>
            <TextField
              disabled={!edit}
              variant="outlined"
              fullWidth
              value={userInfo.size}
              onChange={(e) =>
                setUserInfo({ ...userInfo, size: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Phone</Typography>
            <TextField  
            disabled={!edit}
            variant="outlined"
              fullWidth
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">HR Email</Typography>
            <TextField
              disabled={!edit}
              variant="outlined"
              fullWidth
              value={userInfo.hrEmail}
              onChange={(e) =>
                setUserInfo({ ...userInfo, hrEmail: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Address</Typography>
            <TextField
            disabled={!edit}
            required
              variant="outlined"
              fullWidth
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{padding: '10px'}}>
            <Typography variant="h6">Industry</Typography>
            <Select
            disabled={!edit}
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
          <Grid item xs={12}>
            {!edit ? (
              <Button onClick={()=>setEdit(!edit)}>Edit</Button>
            ) : (
              <>
                <Button onClick={saveInfo}>Save</Button>
                <Button onClick={()=>setEdit(!edit)}>Cancel</Button> 
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EmployerProfile;