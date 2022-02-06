import React, {useState} from 'react'
import { Box, Typography, MenuItem ,IconButton, 
    FormGroup, TextField, Input,
    InputLabel, Button} 
from '@mui/material'
import AddSharpIcon from '@mui/icons-material/AddSharp';

const CreateWatchListFromForModale = ({ setShowCreateWatchListForm, showCreateWatchListForm, createWatchList }) => {
    const [inputTitle, setInputTitle] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const handleSubmit = () => {
        setInputTitle("")
        setInputDescription("")
        createWatchList(inputTitle,inputDescription)
    }
    return (
        <>
            {
            showCreateWatchListForm ? 
            (
              <FormGroup sx={{mx:"20px", my:"20px",display:"flex", justifyContent:"flex-end"}}>
                <InputLabel shrink>Name</InputLabel>
                <Input value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)} placeholder="Enter watchlist name..." />
                <InputLabel shrink sx={{marginTop:3}}>Description</InputLabel>
                <TextField
                  value={inputDescription}
                  onChange={(e)=>setInputDescription(e.target.value)}
                  multiline
                  rows={3}
                  variant="standard"
                  placeholder="Enter watchlist description..."
                />
                <Box sx={{mt:1,mb:-1,display:"flex", justifyContent:"flex-end"}}>
                <Button sx={{width:"50%"}} variant="text" onClick={handleSubmit}>Create</Button>
                </Box>
              </FormGroup>
            )
            :(
              <MenuItem 
              sx={{display:"flex",py:1, px:2, alignItems:"center", backGroundColor:'transparent'}}
              onClick={(e)=>{
                e.stopPropagation()
                setShowCreateWatchListForm(true)
              }}
              >
                <IconButton disableFocusRipple={true}>
                  <AddSharpIcon fontSize="small"/>
                </IconButton>
                <Typography variant="subtitle1" component="p">
                    Create new watchlist
                </Typography>
              </MenuItem>
            )
        }

        </>
    )
}

export default CreateWatchListFromForModale
