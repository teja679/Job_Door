import { Grid, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularIndeterminate from "../muiComponents/Loader";
import { Box } from "@mui/system";
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
function LastMessage({ type, allLastMessages, selectAConversation }) {

  return (
    <>
      {allLastMessages && allLastMessages.length > 0 ? (
        <div style={{
          boxShadow: '2px 0px 5px #eee',}}>
          {allLastMessages.map((item) => (
        <Grid
          container
          key={item.conversationId}
          onClick={() => selectAConversation(item)}
          sx={{
            cursor: 'pointer',
            textAlign: "left",
            // margin: "10px",
            padding: "10px",
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        > 
        <Grid item={true} xs={12} md={12} sx={{display: 'flex', alignItems: 'center'}}>
          <AccountCircleIcon sx={{ bgColor: 'gray' ,color:'lightgray' ,fontSize: '3.2rem', marginRight: '1rem'}} />
        <Grid item={true} display='block' sx={{
            paddingRight: '1rem',}}>
          <Typography variant="h5">
            { type === 'candidate' ? item.employer_name : item.candidate_name} <br />
          </Typography>
          <Box sx={{display: 'flex',}}>
          <Typography variant="p" sx={{
            overflow: 'hidden',padding: '0 1rem 0 0' }}>
            {item.last_message}
          </Typography>
            
            
          </Box>
        </Grid>
          </Grid>
        </Grid>
      ))}
        </div>
      ) : allLastMessages && allLastMessages.length === 0 ? (
        <Grid
        container
        sx={{
          margin: "10px",
          padding: "10px",
        }}
      > No Data</Grid>
      ) : (
        <CircularIndeterminate />
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
          <Grid item={true} xs={9}>
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
