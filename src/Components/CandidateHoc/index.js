import { AppBar, BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import React, { useState } from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from "@mui/icons-material/Favorite"
import { LocationOn } from '@mui/icons-material'

function CandidateHoc({ children}) {
    const [value, setValue] = useState('')
  return (
    <>
      <Box sx={{
        display: {xs: 'none', md: 'block'}
      }}>
        <AppBar position='static'>

        </AppBar>
        </Box>  
        <Box sx={{
        display: {xs: 'block', md: 'none'}
      }}>
        <Box sx={{ width: 500 }}>
            <BottomNavigation
            showLabels 
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            >
                <BottomNavigationAction label='Recents' icon={<RestoreIcon/>} />
                <BottomNavigationAction label='Favorites' icon={<FavoriteIcon/>} />
                <BottomNavigationAction label='NearBy' icon={<LocationOn/>} />
            </BottomNavigation>
        </Box>
        </Box>
        {children}
    </>
  )
}

export default CandidateHoc