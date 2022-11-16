import React, { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

function Sidebar() {
  const fetchJobs = () => {
    const q = query(collection(db, "jobsData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      console.log("Current jobs: ", jobs);
    });
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return(
    <div>
      Sidebar
    </div>
  ) 
}

export default Sidebar;
