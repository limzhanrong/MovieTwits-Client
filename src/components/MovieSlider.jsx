import React, {useState} from 'react'
import Slider from "react-slick";
import MediaCard from './MediaCard'
// import { Skeleton } from '@mui/material';
import serverAPI from '../APIs/serverAPI';
import Loading from './Loading';


const MovieSlider = ({endPoint}) => {
    const [movieObjects, setMovieObjects] = useState([])
    const [loading, setLoading] = useState(true)

    React.useEffect(()=>{
        async function fetchData(){
            try{
                const response = await serverAPI.get(endPoint)
                setMovieObjects(response.data.results.results)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        fetchData()

    },[endPoint])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        swipeToSlide: true,
        // autoplay:true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return loading? <Loading></Loading>: (
        <Slider {...settings}>
          {movieObjects.map((movieObject)=>{
              return <MediaCard movieObject={movieObject} key={movieObject.id}></MediaCard>
          })}
        </Slider>
    )
}

export default MovieSlider
