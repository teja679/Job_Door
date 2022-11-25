import { Button } from "@mui/material";
import React from "react";
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
function AuthPage({ type }) {
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // localStorage.setItem("users", JSON.stringify(user));

      // const docRef = doc(db, "userData", user.uid);

      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   localStorage.setItem("users", JSON.stringify(user, ...docSnap.data()));

      //   const userInfo = docSnap.data();
      //   const userType = userInfo.type;
      //   localStorage.setItem("userinfo", JSON.stringify(userInfo));
      //   if (type === "candidate") {
      //     if (userType === type) {
      //       setTimeout(() => {
      //         navigate("/candidate/profile");
      //       }, 1200)
      //     } else {
      //       alert("you are already onboarded as employer");
      //       return;
      //     }
      //   } else {
      //     if (userType === type) {
      //       setTimeout(() => {
      //         navigate("/employer/profile");
      //       }, 1200)
      //     } else {
      //       alert("you are already onboarded as candidate");
      //       return;
      //     }
      //   }
      // } else {
      //   if (type === "candidate") {
      //     navigate("/candidate/onboarding");
      //   } else  {
      //     navigate("/employer/onboarding");
      //   }
      // }
      // }
        if (type === "candidate") {
          if (!true) {
            navigate("/candidate/profile");
          } else {
            navigate("/candidate/onboarding");
          }
        } else {
          if (!true) {
            navigate("/employer/profile");
          } else {
            navigate("/employer/onboarding");
          }
        }
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  

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
    //   <div>
    //   <h3>SignIn with google</h3>
    //   <Button
    //    onClick={signIn}
    //    >SignIn</Button>
    // </div>
  );
}

export default AuthPage;
