import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function MessageArea({ postMessage, allCoversations }) {
  const [message, setMessage] = useState("");
  const loggedIn_user = JSON.parse(localStorage.getItem("user"));
  console.log("userInfo", loggedIn_user);
  const textMessage = () => {
    console.log("hai");
  };
  return (
    <>
      {allCoversations ? (
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            {allCoversations.map((item) => {
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
                  key={item.conversationId}
                >
                  <div
                    style={{
                      background: "#e6ffe6",
                      padding: "8px 16px",
                      borderRadius: "5px",
                    }}
                  >
                    {item.message}
                  </div>
                  {/* <div>{item.time}</div> */}
                </div>
              );
            })}
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
              <Grid item md={10} sm={6}>
                <TextField
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item md={2} sm={2} sx={{zIndex: '100'}}>
                <Button
                  fullWidth
                  sx={{ p: 2 }}
                  variant="contained"
                  onClick={() => postMessage(message)}
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
