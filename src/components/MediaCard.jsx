import React, {useState} from 'react';
import MediaDropDown from './MediaDropDown';
import CircularRating from 'components/common/mediacard/CircularRating'
import { CardActionArea, CardContent, CardMedia, Typography, Card, Box } from '@mui/material';
import { useHistory } from "react-router-dom"


export default function MediaCard({movieObject}) {
  const [image, setImage] = useState()
  const [link, setLink] = useState("")
  const history = useHistory()
  
  React.useEffect(() => {
    setImage(`https://image.tmdb.org/t/p/w185/${movieObject.poster_path ? movieObject.poster_path: movieObject.profile_path}`)
    const str = `/${movieObject.media_type ? movieObject.media_type : 'movie'}/${movieObject.id}`
    setLink(str)
  }, [movieObject])


  const redirect = (link) => {
    history.push(link);
  }

  return (
    <Card className="media-card" key={movieObject.id} onClick={()=>redirect(link)} sx={{marginBottom:"5px"}}>
        <CardActionArea sx={{PointerEvent:"none"}}>
          {movieObject?.media_type !== "person" && 
          <MediaDropDown movieObject={movieObject} sx={{position:"absolute", width:"100px", height:"100px"}}/>}
        <CardMedia 
          sx={{minHeight:223}}
          className="media-image"
          component="img"
          height=""
          image={image}
          alt="Movie Image"
        />      
        <CardContent sx={{minHeight:80}}>
          
          <Typography gutterBottom variant="subtitle2" component="div" fontSize="0.7rem">
            {movieObject.title || movieObject.original_name || movieObject.name}
          </Typography>
          {movieObject.vote_average && 

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