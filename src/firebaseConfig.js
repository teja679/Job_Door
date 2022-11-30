// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTppjHCOdvJRPvXgIUyo8oVHuMt7XgtT4",
  authDomain: "student-naukari.firebaseapp.com",
  projectId: "student-naukari",
  storageBucket: "student-naukari.appspot.com",
  messagingSenderId: "324543717606",
  appId: "1:324543717606:web:739580d9bf36e01e34db27"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
