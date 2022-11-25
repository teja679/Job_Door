import { Grid } from "@mui/material";
import React from "react";

const mock = [
  {
    id: 1,
    name: "Srimanthula",
    lastMessage: "Hello, Iam SYT",
    time: "12:00 PM",
  },
  {
    id: 2,
    name: "Srimanthula",
    lastMessage: "Hello, Iam SYT",
    time: "12:00 PM",
  },
  {
    id: 3,
    name: "Srimanthula",
    lastMessage: "Hello, Iam SYT",
    time: "12:00 PM",
  },
  {
    id: 4,
    name: "Srimanthula",
    lastMessage: "Hello, Iam SYT",
    time: "12:00 PM",
  },
  {
    id: 5,
    name: "Srimanthula",
    lastMessage: "Hello, Iam SYT",
    time: "12:00 PM",
  },
];
function LastMessage({ allLastMessages, selectAConversation }) {
  return (
    <>
      {allLastMessages && allLastMessages.length > 0 ? (
        <div>
          {allLastMessages.map((item) => (
        <Grid
          container
          key={item.conversationId}
          onClick={() => selectAConversation(item)}
          sx={{
            textAlign: "left",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Grid item xs={9}>
            {item.employer_name}
          </Grid>
          <Grid item xs={3}>
            {item.candidate_name}
          </Grid>
          <Grid item xs={12}>
            {item.lastMessage}
          </Grid>
        </Grid>
      ))}
        </div>
      ) : allLastMessages && allLastMessages.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default LastMessage;

/*
(
      {mock.map((item) => (
        <Grid
          container
          key={item.id}
          onClick={() => selectAConversation(item)}
          sx={{
            textAlign: "left",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Grid item xs={9}>
            {item.name}
          </Grid>
          <Grid item xs={3}>
            {item.time}
          </Grid>
          <Grid item xs={12}>
            {item.lastMessage}
          </Grid>
        </Grid>
      ))}
      )
      */
