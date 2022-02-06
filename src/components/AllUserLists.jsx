import React, { useEffect, useState } from 'react'
import {List, ListItem, ListItemText, IconButton } from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Loading from '../components/Loading'
import DeleteListDialog from './DeleteListDialog';
import serverAPI from '../APIs/serverAPI';
import { useHistory } from "react-router-dom";


const AllUserLists = ({isOwner, loading, userList, getUserList}) => {
    const [open, setOpen] = useState(false)
    const [deleteListID, setDeleteListID] = useState(null)
    const [deleteListName, setDeleteListName] = useState('')
    let history = useHistory();

    const handleRedirect = (link) => {
        history.push(link)
    }


    const handleClickDeleteList = (id, name) => {
        setDeleteListID(id)
        setDeleteListName(name)
        setOpen(true)
    }

    const handleConfirmDelete = async (id) => {
        try{
            const token = localStorage.getItem('token')
            const response = await serverAPI.post('/api/list/authenticated/delete',{
                token: token,
                inputID: id
            })
            if(response.status === 200){
                // Create snackbar logic here
            }
            setOpen(false)
            setDeleteListID(null)
            setDeleteListName('')
            handleClose()
            getUserList()
        }catch(err){
            console.log('delete failed', err)
        }
        
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(()=>{
        getUserList()
    },[getUserList])

    return loading ? 
    <Loading></Loading> : 
    (
            <>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {userList.map((ele) => (
                        <ListItem
                            key={ele.id}
                            disableGutters
                            secondaryAction={
                                <>
                                    <IconButton onClick={()=>{handleRedirect(`/lists/${ele.id}`)}}>
                                        <ReadMoreIcon />
                                    </IconButton>
                                    {isOwner && 
                                        (<IconButton onClick={()=>{handleClickDeleteList(ele.id, ele.list_name)}}>
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>)}
                                </>
                            }
                        >
                            <ListItemText primary={ele.list_name} />
                        </ListItem>
                    ))}
                </List>
                <DeleteListDialog 
                    open={open} 
                    handleClose={handleClose} 
                    deleteListName={deleteListName} 
                    handleConfirmDelete={()=>handleConfirmDelete(deleteListID)}>
                </DeleteListDialog>
            </>
    )
}

export default AllUserLists
