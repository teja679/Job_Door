import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";

const columnName = [
  {
    title: 'Job Title',
    key: 'title'
  },{
    title: 'Job Location',
    key: 'location'
  },{
    title: 'Status',
    key: 'status'
  },
  // {
  //   title: 'Applied On',
  //   key: 'createdAt'
  // },
]
function Applicants() {
  const userInfo = JSON.parse(localStorage.getItem("users"));

  const [allApplications, setAllApplications] = useState(null);

  const fetchJobs = async () => {
    const q = await query(collection(db, "applications"),
    where("employerId", "==", userInfo.uid));
    const querySnapshot = await getDocs(q)
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllApplications(data);
      // console.log("Current jobs: ", jobs);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    
      allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable data={allApplications}
          columnsName={columnName} />
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>No data posted</div>
      ) : (
        <div>No data available</div>
      )
  )
}

export default Applicants