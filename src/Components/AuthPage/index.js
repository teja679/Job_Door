import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./styles.css";

import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  getDoc,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { UserContext } from "../context/UserContext";
function AuthPage({ type }) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // localStorage.setItem("users", JSON.stringify(user));
        dispatch({ type: "SET_USER", payload: user });
  
        const docRef = doc(db, "userData", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // localStorage.setItem(
          //   "users",
          //   JSON.stringify(user, ...docSnap.data())
          // );

          const userInfo = docSnap.data();
          const userType = userInfo.type;
          // localStorage.setItem("userInfo", JSON.stringify(userInfo));
          dispatch({ type: "SET_USER_INFO", payload: userInfo });
      
          if (type === "candidate") {
            if (userType === type) {
              navigate("/candidate/profile");
            } else {
              navigate('/')
              alert("you are already onboarded as employer");
              // return;
            }
          } else {
            if (userType === type) {
              navigate("/employer/profile");
            } else {
              navigate('/')
              alert("you are already onboarded as candidate");
              // return;
            }
          }
        } else {
          if (type === "candidate") {
            navigate("/candidate/onboarding");
          } else {
            navigate("/employer/onboarding");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="auth-page">
      <img
        src="https://www.freeiconspng.com/uploads/login-icon-png-21.png"
        alt="loginImage"
      />
      <div className="heading">
        <p>Welcome {type}</p>
        <p>Please Sign In</p>
      </div>
      <div className="logins">
        <Button onClick={signIn}>
          <img
            width="40"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
            alt="google"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default AuthPage;
