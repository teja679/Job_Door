import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

function CandidateOnboarding() {
  const data = ['Names', 'Email', 'Phone', 'Experience', 'Education', 'Domain', 'Skills']
  return (

    <Grid container spacing={2} sx={{padding: '10px', maxWidth: '95%', margin: '20px auto', 
    boxShadow: '0px 8px 24px #789', background: '#fff', borderRadius: '8px'}}>
      {data.map((item) => (
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>{item}</Typography>
          <TextField variant='outlined' fullWidth />
        </Grid>
      ))}
    </Grid>
  )
}

export default CandidateOnboarding