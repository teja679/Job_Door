import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import JobForm from './JobForm'
import Sidebar from './Sidebar'

function EmployerJobs() {
  const [mobileSidebar, setMobileSidebar] = useState(true)
  return (
    <>
    <Grid container spacing={2} sx={{margin: '0'}}>
      <Grid item xs={3} sm={12} sx={{
        display: { xs: mobileSidebar ? 'none' : 'block', sm: 'block'} 
      }} >
        <Sidebar />
      </Grid>
      <Grid xs={9} sm={12} sx={{
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