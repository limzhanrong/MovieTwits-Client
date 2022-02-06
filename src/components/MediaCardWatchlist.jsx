import React, {useState, useCallback} from 'react';
import MediaDropDown from './MediaDropDown';
import { CardActionArea, CardContent, CardMedia, Typography, Card, Box } from '@mui/material';
import { useHistory } from "react-router-dom"
import serverAPI from '../APIs/serverAPI';
import CircularRating from 'components/common/mediacard/CircularRating';
import defaultImage from "../assets/default.jpeg"

const MediaCardWatchlist = ({id, media_type }) => {
    const [movieObject, setMovieObject] = useState({})
    const [image, setImage] = useState()
    const [link, setLink] = useState("")
    const history = useHistory()

    const fetchData = useCallback(
      async () => {
        try{
          const response = await serverAPI.get(`/api/tmdb/${media_type}/${id}`)
          const obj = response.data.results
          obj.media_type = media_type
          setMovieObject(obj)
          let str
          let path = (obj?.poster_path ? obj.poster_path : obj.profile_path)
          if (!path){
            str = defaultImage
          }else{
            str = "https://image.tmdb.org/t/p/w500/" + path

          }
          setImage(str)
          str = `/${media_type ? media_type : 'movie'}/${id}`
          setLink(str)
        }catch(err){
            console.log(err)
        }
      },
      [id, media_type],
    )
    
    React.useEffect(() => {
      fetchData()

    }, [fetchData])
  
    const redirect = (link) => {
      history.push(link);
    }
  
    return (
      <Card className="media-card" key={movieObject.id} onClick={()=>redirect(link)} sx={{marginBottom:"5px"}}>
          <CardActionArea sx={{PointerEvent:"none", height:"100%"}}>
            {/* Media Drop Down */}
            {movieObject?.media_type !== "person" && 
            <MediaDropDown movieObject={movieObject} sx={{position:"absolute", width:"100px", height:"100px"}}/>}
          <CardMedia
            sx={{minHeight:223, width:"100%", height:{lg:"20vw", md:"35vw", sm:"55vw", xs:"100vw"} }}
            className="media-image"
            component="img"
            height=""
            image={image}
            alt="Movie Image"
          />      
          <CardContent sx={{height:80}}>
            <Typography gutterBottom variant="subtitle2" component="div" fontSize="0.7rem">
              {movieObject.title || movieObject.original_name || movieObject.name}
            </Typography>
            {movieObject.vote_average !== undefined && 
            (
              <Box sx={{position:"absolute", right:0, bottom:0, marginRight:1, marginBottom:1}}>
                <CircularRating sx={{marginRight:"10px"}} value={movieObject.vote_average}></CircularRating>
              </Box>
            )
            }
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default MediaCardWatchlist
