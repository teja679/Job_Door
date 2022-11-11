import { initializeApp } from "firebase/app";
import { getAuth  } from  'firebase/auth'

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