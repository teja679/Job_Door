import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { orderByValue } from "firebase/database";

import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebaseConfig";
import LastMessage from "../../common/LastMessage";
import MessageArea from "../../common/MessageArea";
import { UserContext } from "../../context/UserContext";

function EmployerConversation() {
  const [lastMessageMobile, setLastMessageMobile] = useState(true);
  const [selectConversation, setSelectConversation] = useState(null);
  const [allLastMessages, setAllLastMessages] = useState(null);
  const [allCoversations, setAllCoversations] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const userInfo = state.user;

  const selectAConversation = (data) => {
    setSelectConversation(data);
    try {
      const q = query(
        collection(db, "one-to-one-messages"),
        where("conversationId", "==", data.conversationId)
        // orderByValue("createdAt")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllCoversations(data);
      });
    } catch (err) {
      console.error(err);
    }
    setLastMessageMobile(false);
  };

  const fetchJobs = async () => {
    try {
      const q = query(
        collection(db, "last_messages"),
        where("employerId", "==", userInfo.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllLastMessages(data);
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const postMessage = async (message) => {
    const oneToOneMessageId = uuidv4();

    var d = new Date();
    try {
      await setDoc(
        doc(db, "last_messages", selectConversation.last_message_id),
        {
          last_message: message,
          createdAt: new Date().getTime(),
        },
        { merge: true }
      );
      await setDoc(doc(db, "one-to-one-messages", oneToOneMessageId), {
        message: message,
        createdAt: d.getMonth() + "" + d.getDate() + "" + d.getTime(),
        conversationId: selectConversation.conversationId,
        userId: userInfo.uid,
        userType: "employer",
        // employerId: selectConversation.employerId,
        // candidateId: selectConversation.candidateId,
      });
    } catch (e) {
      console.error(e);
    }
  };
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
          type="employer"
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
        <Button
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={() => setLastMessageMobile(true)}
        >
          Back
        </Button>
        <MessageArea
          postMessage={postMessage}
          allCoversations={allCoversations}
        />
      </Grid>
    </Grid>
  ) : allLastMessages && allLastMessages.length === 0 ? (
    <div style={{margin: '2rem'}}>No data posted</div>
  ) : (
    <div style={{margin: '2rem'}}>No data available</div>
  );
}

export default EmployerConversation;
