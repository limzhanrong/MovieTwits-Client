import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import { Box, Pagination, Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import { useQuery } from '../global/customHooks';
import serverAPI from '../APIs/serverAPI';
import MediaForWatchlist from '../components/MediaForWatchlist';
import AddToWatchListModal from "../components/AddToWatchListModal"
import {AddToWatchListModalContext} from "../global/StateContext";
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

const Search = () => {
    let query = useQuery();
    const history = useHistory()
    const isMounted = useRef(true)
    
    let { media_type } = useParams();
    const [loading, setLoading] = useState(true)
    const [searchResult, setSearchResult] = useState([])
    const [totalNumberOfPage, setTotalNumberOfPage] = useState(0)
    const [page, setPage] = useState(1)
    const [queryString, setQueryString] = useState()
    const { watchListModalDispatch } = useContext(AddToWatchListModalContext)

    const handlePaginationChange = (event, value) => {
        history.push({
            search: `?query=${queryString}&page=${value}`
        })
        window.scrollTo(0, 0)
    }
    const fetchData = useCallback(
        async () => {
            let str = query.get("query")
            const response = await serverAPI.get(`/api/tmdb/search/${media_type}/${str}/${page}`)
            if(isMounted.current){
                setQueryString(str)
                setPage(parseInt(query.get("page")))
                setSearchResult(response.data.results.results)
                setTotalNumberOfPage(response.data.results.total_pages)
            }
        },
        [media_type,page,query]
    )
    useEffect(()=>{
        setLoading(true)
        isMounted.current = true
        if(isMounted){
            fetchData()
        }
        
        setLoading(false)
        return (() => {
            isMounted.current = false
        })
    },[fetchData])
    
    
    return loading ? <Loading/> :(
        <>
            {/* Searching for */}
            <Box p={5}>
                <Typography variant="h5">
                Search result for: {queryString}
                </Typography>
            </Box>
            {/* Media Cards Section */}
            <Box sx={{marginLeft:"2rem", marginRight:"2rem"}}>
                <MediaForWatchlist 
                    mediaType={media_type} 
                    mediaList={searchResult} 
                    page={page} 
                    numberOfMediaPerPage={20}
                    doNotSlice={true}
                >
                </MediaForWatchlist>
            </Box>


            {/* Pagination Section */}
            <Box mt={4} pb={4}>
                <Pagination 
                    page={page}
                    onChange={handlePaginationChange} 
                    sx={{ display:"flex", justifyContent:"center"}} 
                    count={totalNumberOfPage} 
                />
            </Box>

            <AddToWatchListModal handleClose={()=>watchListModalDispatch({type:"CLOSE_ADD_TO_WATCH_LIST_MODAL"})}></AddToWatchListModal>
        </>
    )
}

export default Search

