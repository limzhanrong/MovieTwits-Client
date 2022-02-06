import React from 'react'
import {Box, CircularProgress} from '@mui/material'

const Loading = () => {
    return (
        <Box sx={{marginTop:"10%", display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
            <CircularProgress/>
        </Box> 
    )
}

export default Loading
