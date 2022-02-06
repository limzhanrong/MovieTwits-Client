import React from 'react'
import { Paper, Grid, Typography, Chip, Box } from "@mui/material"
import serverAPI from "../APIs/serverAPI"
import Image from 'mui-image'
import Rating from './Rating'
import Loading from './Loading'
import { convertDate } from '../helpers/HelperFunction'

const MovieDetail = ({id, media_type}) => {
    const [movieObject, setMovieObject] = React.useState()
    const [image, setImage] = React.useState("")
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        async function fetchData(){
            try{
                setLoading(true)
                const response = await serverAPI.get(`/api/tmdb/${media_type}/${id}`)
                const obj = response.data.results
                setMovieObject(obj)
                const str = "https://image.tmdb.org/t/p/w500/" + (obj?.poster_path ? obj.poster_path : obj.profile_path)
                setImage(str)
                setLoading(false)
                console.log(obj)
            }catch(err){
                // setLoading(false)
                console.log(err)
            }
        }
        fetchData()
    },[id, media_type])
    
    return loading ? <Loading/> : (
        <Paper component={Grid} container spacing={0} className="add-padding" sx={{mx:"auto"}} elevation={5}>
            <Grid item md={6} xs={12} sx={{textAlign:'center'}}>
                <Typography variant="h5">{movieObject?.title ? movieObject?.title : movieObject?.name}</Typography>
                <Typography variant="caption">
                    <b>{media_type.toUpperCase() + ": "}</b>
                    {
                    movieObject?.release_date ? 
                    convertDate(movieObject?.release_date) :
                    convertDate(movieObject?.first_air_date) + " - " +  convertDate(movieObject?.last_air_date)}
                </Typography>
            </Grid>
            <Grid item md={6} xs={12} sx={{textAlign:'center'}}>
                <Typography variant="overline">TMDB Rating</Typography>
                <Rating rating={movieObject?.vote_average} count={movieObject?.vote_count}></Rating>
            </Grid>
            <Grid item md={6} xs={12} sx={{textAlign:'center'}}>
                <div>
                <Image 
                className="media-image-large"
                src={image}
                ></Image>
                </div>
            </Grid>
            <Grid item md={6} xs={12} sx={{textAlign:'center'}} p={5}>
                <Typography variant="body1">{movieObject?.overview}</Typography>
                <Box p={2}>
                    {movieObject?.genres.map((ele)=>{
                    return <Chip key={ele.id} sx={{margin:"0.2rem"}} variant="outlined" color="info" size="small" label={ele.name} onClick={()=>{}}/>
                    })}
                </Box>
            </Grid>
        </Paper>
    )
}

export default MovieDetail
