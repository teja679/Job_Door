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
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";

function CandidateProfile() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    domain: "",
    skills: [],
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
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };
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
                disabled={!edit}
                placeholder="Enter name"
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
              <TextField
                required
                type="email"
                disabled
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
                type="number"
                required
                disabled={!edit}
                placeholder="Enter phone number"
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
                required
                disabled={!edit}
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
                disabled={!edit}
                placeholder="Enter education"
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
                required
                disabled={!edit}
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
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Skills</Typography>
              <Select
                required
                disabled={!edit}
                placeholder="Skills"
                label="skills"
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
              {edit ? (
                <>
                  <Button onClick={saveInfo}>Save</Button>
                  <Button onClick={() => setEdit(!edit)}>Cancel</Button>
                </>
              ) : (
                <Button fullWidth onClick={() => setEdit(!edit)}>
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

export default CandidateProfile;
