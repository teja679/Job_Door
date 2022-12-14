import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";
import { UserContext } from "../../context/UserContext";

const columnName = [
  {
    title: "Job Title",
    key: "title",
  },
  {
    title: "Job Location",
    key: "location",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Buttons",
    key: "buttons",
  },

  // {
  //   title: 'Applied On',
  //   key: 'createdAt'
  // },
];
function Applicants() {
  const [state, dispatch] = useContext(UserContext);
  const userInfo = state.user;

  const [allApplications, setAllApplications] = useState(null);

  const fetchJobs = async () => {
    try {
      const q = await query(
        collection(db, "applications"),
        where("employerId", "==", userInfo.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllApplications(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const handleClick = async (action, row) => {
    
    const last_message_id = uuidv4();
    const oneToOneMessageId = uuidv4();
    if (action === "accept") {
      /// we need to update status of the application to approved & disable reject button
      try {
        await setDoc(
          doc(db, "applications", row.applicationId),
          {
            status: "approved",
          },
          { merge: true }
        );
      } catch (e) {
        console.error(e);
      }
      try {
        await setDoc(doc(db, "last_messages", last_message_id), {
          lastMessage: "",
          createdAt: new Date(),
          employerId: row.employerId,
          candidateId: row.candidateId,
          jobId: row.jobId,
          applicationId: row.applicationId,
          last_message_id: last_message_id,
          candidate_name: row.candidate_name,
          employer_name: userInfo.displayName,
          conversationId: `${row.employerId}-${row.candidateId}`,
        });
        await setDoc(doc(db, "one-to-one-messages", oneToOneMessageId), {
          createdAt: new Date(),
          conversationId: `${row.employerId}-${row.candidateId}`,
          userType: "employer",
          userId: userInfo.uid,
          message: `hey hello! ${row.title}`,
        });
      } catch (e) {
        console.error(e);
      }
    } else if (action === "reject") {
      await deleteDoc(doc(db, "applications", row.applicationId));
      console.log("reject", row);
    }
  };
  return allApplications && allApplications.length > 0 ? (
    <div>
      <CommonTable
        data={allApplications}
        columnsName={columnName}
        handleClick={handleClick}
      />
    </div>
  ) : allApplications && allApplications.length === 0 ? (
    <div style={{margin: '2rem'}}>No data posted</div>
  ) : (
    <div style={{margin: '2rem'}}>No data available</div>
  );
}

export default Applicants;
