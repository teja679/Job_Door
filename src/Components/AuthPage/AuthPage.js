import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import { auth } from '../../firebaseConfig'
import { useNavigate } from "react-router-dom";

function AuthPage({ type }) {
  const navigate = useNavigate()
  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('users', JSON.stringify(user))
        if(type === 'candidate'){
          if(!true){
            navigate('/candidate/profile')
          }
          else {
            navigate('/candidate/onboarding') 
          }  
        }
        
        else{
          if(!true){
            navigate('/employer/profile')
          }
          else{
            navigate('/employer/onboarding')
          }
         }
        console.log(user)
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
      <Button
       onClick={signIn}
       >SignIn</Button>
    </div>
  );
}

export default AuthPage;
