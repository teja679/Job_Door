import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import JobForm from './JobForm'
import Sidebar from './Sidebar'

function EmployerJobs() {
  const [mobileSidebar, setMobileSidebar] = useState(true)
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={3} sm={3} sx={{
        display: { xs: mobileSidebar ? 'none' : 'block', sm: 'block'} 
      }} >
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={9} sx={{
        display: { xs: mobileSidebar ? 'block' : 'none', sm: 'block'} 
      }}>
        <JobForm />
      </Grid>
    </Grid>
    <Button onClick={() => setMobileSidebar(!mobileSidebar)}>switch</Button>
    </>
  )
}

export default EmployerJobs