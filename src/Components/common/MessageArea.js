import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Container } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MessageArea({ postMessage, allCoversations, setLastMessageMobile,employerName }) {
  const [message, setMessage] = useState("");
  const loggedIn_user = JSON.parse(localStorage.getItem("user"));
  console.log(employerName)
  return (
    <>
      {allCoversations ? (
        <Grid container>
          <Grid
            item={true}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              marginBottom: { xs: "7.5rem", sm: "7rem", md: '3.5rem' }
            }}
          >
             <AppBar position="fixed" sx={{ backgroundColor: 'white',display: { xs: "block", sm: "none" } }}>
          <Container maxWidth="xl">
            <Toolbar container disableGutters>
              <IconButton
                sx={{
                  mr: 1, 
                }}
              >
                <ArrowBackIcon onClick={() => setLastMessageMobile(true)} />
              </IconButton>
              <Grid item={true} xs={12} md={12} sx={{display: 'flex', alignItems: 'center'}}>
          <AccountCircleIcon sx={{ bgColor: 'gray' ,color:'lightgray' ,fontSize: '3.2rem', marginRight: '1rem'}} />
        
          <Typography variant="h5" sx={{color: '#111'}}>
            {employerName}
          </Typography>
          </Grid>

            </Toolbar>
          </Container>
        </AppBar>
            {allCoversations.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    justifyContent:
                      item.userId === loggedIn_user.uid
                        ? "flex-end"
                        : "flex-start",

                    // borderRadius: '0px 16px 16px 16px',
                    gap: "1rem",
                    padding: "10px",
                  }}
                  key={item.conversationId + index}
                >
                  <Typography
                    style={{
                      width: "80%",
                      background: "#e6ffe6",
                      padding: "8px 16px",
                      display: "flex",
                      borderRadius: "5px",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.message}
                  </Typography>
                  {/* <div>{item.time}</div> */}
                </div>
              );
            })}
          </Grid>
          <Grid
            item={true}
            xs={12}
            sx={{
              // position: "fixed",
              bottom: "100px",
              width: "100%",
            }}
          >
            <Grid
              container
              sm={8}
              align="center"
              sx={{
                textAlign: "left",
                position: "fixed",
                bottom: { xs: "3.5rem", sm: "3.5rem", md: 0 },
              }}
            >
              <Grid
                item={true}
                md={10}
                sm={10}
                xs={10}
                sx={{ bgcolor: "#fff" }}
              >
                <TextField
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item={true} md={2} sm={2} xs={2} sx={{ zIndex: "100" }}>
                <Button
                  fullWidth
                  sx={{ p: 2 }}
                  variant="contained"
                  onClick={() => postMessage(message, setMessage)}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ p: 5, m: 5 }} variant="h5">
          Please select a conversation
        </Typography>
      )}
    </>
  );
}

export default MessageArea;
