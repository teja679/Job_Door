import { Button, Grid, TextField } from "@mui/material";
import React from "react";

function MessageArea() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          messages
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
              <TextField fullWidth />
            </Grid>
            <Grid xs={2}>
              <Button>Button</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MessageArea;
