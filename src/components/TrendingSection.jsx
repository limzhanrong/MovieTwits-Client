import React, {useState} from 'react'
import {ToggleButtonGroup, ToggleButton, Grid,} from '@mui/material';
import MovieSlider from '../components/MovieSlider';


const TrendingSection = () => {
    const [mediaType,setMediaType] = useState()
    const [endPoint, setEndPoint] = useState("api/tmdb/trending/{value}/day")
    const handleChange = (e) => {
        setMediaType(e.target.value)
        setEndPoint(`api/tmdb/trending/${e.target.value}/day`)
    }

    React.useEffect(()=>{
        setMediaType("all")
    },[])

    return (
            <div className="media-card-container">
                <div className="media-title-container">
                    <Grid container spacing={2} sx={{marginLeft:"0"}}>
                    <h1 className="media-title" md={3} xs={12}>Trending</h1>
                    <ToggleButtonGroup
                        sx={{
                            marginTop:"auto",
                            marginBottom:"auto",
                        }}
                        className="media-title"
                        md={3} xs={12}
                        size="large"
                        color="primary"
                        value={mediaType}
                        exclusive
                        onChange={handleChange}
                        >
                        <ToggleButton className="toggle-button" value="all">All</ToggleButton>
                        <ToggleButton className="toggle-button" value="movie">Movie</ToggleButton>
                        <ToggleButton className="toggle-button" value="tv">TV</ToggleButton>
                        <ToggleButton className="toggle-button" value="person">Person</ToggleButton>
                    </ToggleButtonGroup>
                    </Grid>
                </div>
                {/* MovieSlider */}
                <MovieSlider endPoint={endPoint}></MovieSlider>
            </div>
    )
}

export default TrendingSection
