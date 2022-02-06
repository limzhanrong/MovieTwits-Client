import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent , TextField, DialogActions, Button } from '@mui/material'
import serverAPI from '../APIs/serverAPI'

const CreateListDialog = ({ open, setOpen, getUserList }) => {
    const [inputTitle, setInputTitle] = useState("") 
    const [inputDescription, setInputDescription] = useState("") 

    const handleClose = () =>{
        setInputTitle("")
        setInputDescription("")
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('token')
            if(token){
                await serverAPI.post('/api/list/authenticated/create',{
                    token: token,
                    inputTitle: inputTitle,
                    inputDescription: inputDescription
                })
                getUserList()
                handleClose()
            }
        }catch(err){
            console.log('error submiting form',err)
        }
        
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create List</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                <TextField
                    autoComplete="off"
                    value = {inputTitle}
                    autoFocus
                    margin="dense"
                    id="listName"
                    label="list name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setInputTitle(e.target.value)}
                />
                <TextField
                    sx={{marginTop: "1.5rem"}}
                    value = {inputDescription}
                    id="outlined-multiline-static"
                    label="desription"
                    multiline
                    fullWidth
                    onChange={(e)=>setInputDescription(e.target.value)}
                    rows={4}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </form>
      </Dialog>
    )
}

export default CreateListDialog
