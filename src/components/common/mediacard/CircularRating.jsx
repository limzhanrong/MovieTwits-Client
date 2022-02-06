import React from 'react'
import {CircularProgress, Box, Typography} from '@mui/material/';


const CircularRating = ({value}) => {
    let color = "black"
    if(value>=7){
        color = "green"
    }else if(value >=5){
        color = "orange"
    }else{
        color = "red"
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', color:color }}>
            <CircularProgress variant="determinate" color="inherit" value={value*10}/>
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                {`${value}`}
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularRating
