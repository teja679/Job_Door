import { useTheme } from "@emotion/react";
import { db } from '../../../firebaseConfig'
import {
  Button,   Grid,  MenuItem,
   Select,  TextField,  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

function EmployerProfile() {
  const userData = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false);
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
  
  async function fetchUserInfo() {
    try {
      const docRef = doc(db, "userData", userData.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such comment!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);
  
  async function saveInfo() {
    try {
      await setDoc(
        doc(db, "userData", `${userData.uid}`),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("Sucessfully updated");
      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  }

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
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
    <form>
      <h1>Profile</h1>
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
          <TextField 
            required
            disabled={!edit} placeholder="Enter name"
            variant="outlined"
            fullWidth
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Email</Typography>
          <TextField
            required type='email'
            disabled={!edit}
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
            required type='number'
            disabled={!edit}
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
          required
          disabled={!edit}
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
            required
            disabled={!edit}
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
             type='email'
            disabled={!edit}
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
            required
            disabled={!edit}
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
            required
            disabled={!edit}
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
            <Grid item xs={12}>
              {edit ? (
                <>
                  <Button variant="contained" onClick={saveInfo}>Save</Button>
                  <Button variant="contained" onClick={() => setEdit(!edit)}>Cancel</Button>
                </>
              ) : (
                <Button variant="contained" onClick={() => setEdit(!edit)}>
                  Edit
                </Button>
              )}
            </Grid>
      </Grid>
    </form>
        )}
      </>
  );
}

export default EmployerProfile