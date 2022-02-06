import React from 'react'
import {Grid, Box} from '@mui/material'
import MediaCardWatchlist from './MediaCardWatchlist'


const MediaForWatchlist = ({ mediaList, isOwner, page, numberOfMediaPerPage, mediaType, doNotSlice }) => {
    let slicedMediaList
    if(doNotSlice !== true){
        const start = (page - 1) * numberOfMediaPerPage
        const end = Math.min(start + numberOfMediaPerPage, mediaList.length)
        console.log(start,end)
        slicedMediaList = mediaList.slice(start, end)
    }else{
        slicedMediaList = mediaList
    }
    
    return (
        <Box>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 12, md: 12, lg: 5 }} >
            {slicedMediaList.map((ele) => {
                return (
                <Grid item xs={12} sm={6} md={4} lg={1} key={ele.film_id ? ele.film_id : ele.id}>
                    {/* First condition is for watchlist retrieval from database 
                    VS second condition which is retrieval from tmdb's API */}
                    {
                        ele.film_id 
                        ?<MediaCardWatchlist id={ele.film_id} media_type={ele.film_type} isOwner={isOwner}></MediaCardWatchlist>
                        :<MediaCardWatchlist id={ele.id} media_type={mediaType} isOwner={isOwner}></MediaCardWatchlist>
                    }
                </Grid>)
            })}
            </Grid>
        </Box>
    )
}

export default MediaForWatchlist
