import React from 'react'
import {Box, Typography } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate';


const Rating = (props) => {
    const {rating, count} = props
    return (
        <Box sx={{textAlign:"center", marginRight:"1rem"}}>
                    <Box sx={{display:"flex", justifyContent:'center', flexDirection:'row', alignSelf:'center'}}>
                        <StarRateIcon fontSize="large" sx={{alignSelf:'center'}}></StarRateIcon>
                        <Box sx={{flexDirection:'column'}}>
                            <Typography variant="h6">{rating}/10</Typography>
                            <Typography variant="caption">
                                {count > 1000 ? 
                                (count/1000).toFixed(2) +  "k":
                                count
                                }
                                
                            </Typography>
                        </Box>
                    </Box>
                </Box>
    )
}

export default Rating
