import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useParams } from 'react-router'
import serverAPI from '../APIs/serverAPI'
import { Box } from '@mui/system'
import { Typography, Link, Pagination } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import Loading from '../components/Loading'
import MediaForWatchlist from '../components/MediaForWatchlist'
import AddToWatchListModal from "../components/AddToWatchListModal"
import {AddToWatchListModalContext} from "../global/StateContext";

const ListSingle = () => {
    const numberOfMediaPerPage = 20
    const { id }  = useParams()
    const[list, setList] = useState({})
    const[mediaList, setMediaList] = useState([])
    const[page, setPage] = useState(1)
    const[totalNumberOfPage, setTotalNumberOfPage] = useState(1)
    const[loading,setLoading] = useState(true)
    const { watchListModalDispatch } = useContext(AddToWatchListModalContext)

    const paginate = useCallback((arrayLength)=>{
        setTotalNumberOfPage(Math.ceil(arrayLength/numberOfMediaPerPage))
    },[])
    // Api call and set list
    const retrieve = useCallback(
        async () => {
            try{
                const response = await serverAPI.get(`/api/list/public/${id}`)
                setList(response.data)
                const mediaListResponse = await serverAPI.get(`/api/list/public/getMediaFromWatchlist/${id}`)
                setMediaList(mediaListResponse.data.response)
            }catch(err){
                console.log(err)
            }
        },
        [id],
    )

    const handlePaginationChange = (event,value) => {
        setPage(value);
    }
    

    useEffect(() => {
        setLoading(true)
        
        retrieve()
        // console.log(auth)
        paginate(mediaList.length)
        setLoading(false)
    }, [retrieve,paginate,mediaList.length])
    return loading ? <Loading></Loading> : (
        <>
        {/* List Information Section */}
            <Box sx={{margin:"50px"}}>
                <Typography variant="h3">{list.list_name}</Typography>
                <Box sx={{ display: "flex" }} onClick={()=>{}}>
                    <FaceIcon/>
                    <Link href="#" underline="hover">
                        <Typography  variant="subtitle1" sx={{ fontWeight: '600' }}>{list.username}'s watchlist </Typography>
                    </Link>
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        <FiberManualRecordIcon sx={{verticalAlign:"middle",fontSize:6}}/>
                        &nbsp;
                        {mediaList.length} shows
                    </Typography>
                </Box>
                
                <Typography variant="body2">{list.description}</Typography>
            </Box>
        {/* Media Cards Section */}
            <Box sx={{marginLeft:"2rem", marginRight:"2rem"}}>
                <MediaForWatchlist page={page} numberOfMediaPerPage={numberOfMediaPerPage} mediaList={mediaList}></MediaForWatchlist>
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
            <AddToWatchListModal retrieve={retrieve} handleClose={()=>watchListModalDispatch({type:"CLOSE_ADD_TO_WATCH_LIST_MODAL"})}></AddToWatchListModal>

        </>
        
    )
}

export default ListSingle

