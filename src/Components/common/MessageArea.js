import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function MessageArea({ postMessage, allCoversations }) {
  const [message, setMessage] = useState('')
  const textMessage = () => {
    console.log('hai')
  }
  return (
    <>
      {allCoversations ? (
        <Grid container>
          <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column'}}>
            {
              allCoversations.map(item => (
                <div style={{
                  background: '#eaeaea',
                  borderRadius: '0px 16px 16px 16px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }} key={item.conversationId}>
                  <div>{item.message}</div>
                  <div>{item.time}</div>
                </div>
              ))
            }
            
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              // position: "fixed",
              bottom: "100px",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid xs={10}>
                <TextField fullWidth value={message} onChange={(e)=>setMessage(e.target.value)} />
              </Grid>
              <Grid xs={2}>
                <Button onClick={()=>postMessage(message)}>Send</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>Please select a conversation</div>
      )}
    </>
  );
}

export default MessageArea;
