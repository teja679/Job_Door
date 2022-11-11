import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import { auth } from '../../firebaseConfig'

function AuthPage({ type }) {
  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        
        // console.log(user)
      })
      .catch((error) => {
        console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <h1>welcome {type} please SignIn</h1>
      <h3>SignIn with google</h3>
      <Button onClick={signIn}>SignIn</Button>
    </div>
  );
}

export default AuthPage;
