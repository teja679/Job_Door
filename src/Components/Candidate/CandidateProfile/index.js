import { useTheme } from "@emotion/react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { uploadBytesResumable, ref } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getDownloadURL } from "firebase/storage";

function CandidateProfile() {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const userData = state.user;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
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
  async function fetchUserInfo() {
    try {
      const docRef = doc(db, "userData", userData.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data", docSnap.data());
        setUserInfo(docSnap.data());
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [pdfUrl, setPdfUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);

  const submitFile = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfUrl(downloadURL);
          console.log(downloadURL, "url");
        });
      }
    );
  };

  const saveInfo = async (e) => {
    try {
      await setDoc(
        doc(db, "userData", `${userData.uid}`),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("sucessfully updated");
      setEdit(false);
    } catch (e) {
      console.error("Error adding document", e);
    }
    console.log("submit", userInfo);
  };
  const handleSkillChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setUserInfo({
        ...userInfo,
        skills: typeof value === "string" ? value.split(",") : value,
      });
    },
    [userInfo]
  );
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
  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>Profile</h1>
      <form>
        <Grid
          container
          spacing={2} 
          sx={{
            padding: "1rem",
            maxWidth: "95%",
            height: "90%",
            margin: "20px auto",
            // boxShadow: "0px 8px 24px #789",
            // background: "#fff",
            borderRadius: "8px",
            textAlign: 'left',
            marginBottom: '4rem'
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography item md={6} variant="h6">Name</Typography>
            <TextField  item md={6} 
              disabled={!edit}
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
            <TextField
              disabled
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
            <Typography variant="h6">Experience</Typography>
            <TextField
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
              disabled={!edit}
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
              disabled={!edit}
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
              disabled={!edit}
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
          <Grid item xs={6}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <input type="file" />
              <Button onChange={submitFile}>Upload</Button>
            </div>
          </Grid>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
            {!edit ? (
              <Button variant="contained" onClick={() => setEdit(true)}>
                Edit
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={saveInfo}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEdit(false)}>
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CandidateProfile;
