import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import LastMessage from "./LastMessage";
import MessageArea from "./MessageArea";

function EmployerConversation() {
  const [lastMessageMobile, setLastMessageMobile] = useState(false);
  const [allLastMessages, setAllLastMessages] = useState(null);
  const [allCoversations, setAllCoversations] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("users"));

   const selectAConversation = (data) => {
    console.log(data);
    try {
      const q = query(
        collection(db, "oneToOneMessages"),
        where("conversationId", "==", data.conversationId)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllCoversations(data);
        
        console.log(data)
      });
    } catch (err) {
      console.log(err);
    }
    setLastMessageMobile(false);
  };

  const fetchJobs = async () => {
    try {
      const q = query(
        collection(db, "last_messages"),
        // where("employerId", "==", userInfo.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllLastMessages(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return allLastMessages && allLastMessages.length > 0 ? (
    <Grid container>
      <Grid
        sm={4}
        xs={12}
        sx={{
          display: { xs: lastMessageMobile ? "block" : "none", sm: "block" },
        }}
      >
        <LastMessage
          allLastMessages={allLastMessages}
          selectAConversation={selectAConversation}
        />
      </Grid>
      <Grid
        sm={8}
        xs={12}
        sx={{
          display: { xs: lastMessageMobile ? "none" : "block", sm: "block" },
        }}
      >
        <Button onClick={() => setLastMessageMobile(true)}>Back</Button>
        <MessageArea allCoversations={allCoversations} />
      </Grid>
    </Grid>
  ) : allLastMessages && allLastMessages.length === 0 ? (
    <div>No data posted</div>
  ) : (
    <div>No data available</div>
  );
}

export default EmployerConversation;
