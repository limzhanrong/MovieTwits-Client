import React, { useContext, useState, useEffect, useCallback, } from 'react'
import { useParams } from 'react-router'
import {Box, Grid, Typography, Button } from '@mui/material'
import AllUserLists from '../components/AllUserLists';
import { AuthContext } from '../global/StateContext';
import CreateListDialog from '../components/CreateListDialog';
import serverAPI from '../APIs/serverAPI';

const Lists = () => {
    const {username} = useParams()
    const { useAuthState, fetchUserInfo} = useContext(AuthContext)
    const [auth] = useAuthState

    const [isOwner, setIsOwner] = useState(false)


    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(true)
    const [userList, setUserList] = useState([])

    const getUserList = useCallback(async () => {
        console.log('getUserList')
        const response = await serverAPI.get(`/api/list/public/${username}/getLists`)
            setUserList(response.data.list)
            setLoading(false)
    }, [username])

    const handleClickAddList = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            fetchUserInfo(token)
            if (auth?.username === username){
                setIsOwner(true)
            }
        }else{
            setIsOwner(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[username, auth.username])

    return (
            <>
                <Box p={5}>
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                        <Grid>
                            <Typography variant="h5">{isOwner ? "My List":(`${username}'s List`)}</Typography>
                        </Grid>
                        <Grid>
                            {isOwner && <Button variant="contained" sx={{minWidth:"99px"}} onClick={handleClickAddList}>Add List</Button>}
                        </Grid>
                    </Box>
                    <Grid sx={{padding:"1rem"}}>
                        <AllUserLists isOwner={isOwner} loading={loading} userList={userList} getUserList={getUserList}/>
                    </Grid>
                </Box>
                <CreateListDialog open={open} setOpen={setOpen} handleClose={handleClose} getUserList={getUserList}></CreateListDialog>
            </>     

    )
}

export default Lists
