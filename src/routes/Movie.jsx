import React from 'react'
import { useParams } from 'react-router'
import MovieDetail from '../components/MovieDetail'
import { Button } from '@mui/material'

const Movie = () => {
    const { id, media_type } = useParams()

    return (
        <>
            <MovieDetail id={id} media_type={media_type}></MovieDetail>
            <Button></Button>
        </>
    )
}

export default Movie
