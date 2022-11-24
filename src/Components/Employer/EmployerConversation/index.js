import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import LastMessage from './LastMessage'
import MessageArea from './MessageArea'

function EmployerConversation() {
  const [lastMessageMobile, setLastMessageMobile] = useState(true)
  const selectAConversation = (data) => {
    console.log(data)
    setLastMessageMobile(false)
  }
  return (
    <Grid container >
      <Grid sm={4} xs={12} sx={{ display: { xs: lastMessageMobile ? 'block' : 'none', sm: 'block'}}}>
        <LastMessage
        selectAConversation={selectAConversation} />
      </Grid>
      <Grid sm={8} xs={12} sx={{ display: { xs: lastMessageMobile ? 'none' : 'block', sm: 'block'}}}>
        <Button onClick={()=>setLastMessageMobile(true)}>
          Back</Button>
        <MessageArea />
      </Grid>
    </Grid>
  )
}

export default EmployerConversation