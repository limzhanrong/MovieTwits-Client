import React, {useContext} from 'react'
import MovieSlider from '../components/MovieSlider';
import TrendingSection from '../components/TrendingSection';
import AddToWatchListModal from "../components/AddToWatchListModal"
import {AddToWatchListModalContext} from "../global/StateContext";


const Home = () => {
    const { watchListModalDispatch } = useContext(AddToWatchListModalContext)

    return (
        <div>
            <div className="media-card-container">
                <h1 className="media-title">Popular Movies</h1>
                <MovieSlider endPoint="api/tmdb/popular/1">Popular</MovieSlider>
            </div>
            <TrendingSection></TrendingSection>
            <AddToWatchListModal handleClose={()=>watchListModalDispatch({type:"CLOSE_ADD_TO_WATCH_LIST_MODAL"})}></AddToWatchListModal>
        </div>
    )
}

export default Home
