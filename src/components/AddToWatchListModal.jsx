import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, MenuItem , Divider, IconButton, 
  FormGroup, FormControlLabel , List
} 
  from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { AuthContext, AddToWatchListModalContext } from '../global/StateContext';
import serverAPI from '../APIs/serverAPI';
import CheckBoxCustom from './CheckBoxCustom';
import CreateWatchListFromForModale from './CreateWatchListFromForModale';
import { SnackBarContext } from '../global/StateContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  maxWidth: "70%",
  bgcolor: 'background.paper',
  border: '0px solid white',
  boxShadow: 24
};

const AddToWatchListModal = ({ handleClose, retrieve }) => {
  let { useAuthState } = React.useContext(AuthContext);
  let { watchListModalState, useUserWatchListState, memoizedFetchUserWatchList } = React.useContext(AddToWatchListModalContext);
  const snackBarDispatch = React.useContext(SnackBarContext).dispatch

    // eslint-disable-next-line
  const [userWatchLists, setUserWatchLists] = useUserWatchListState
  // eslint-disable-next-line
  const [auth, setAuth] = useAuthState
  const [showCreateWatchListForm, setShowCreateWatchListForm] = useState(false)

  const createWatchList = async (inputTitle, inputDescription) => {
    try {
      const token = localStorage.getItem('token')
    if(token){
        const response = await serverAPI.post('/api/list/authenticated/create',{
          token: token,
          inputTitle: inputTitle,
          inputDescription: inputDescription
        })
        if (response.status){
          snackBarDispatch({ type:"OPEN_SUCCESS_SNACKBAR", message:"Successfully created new watchlist" })
        }else{
          snackBarDispatch({ type:"OPEN_ERROR_SNACKBAR", message:"Failed to create new watchlist" })
        }
    }
    memoizedFetchUserWatchList(auth.token)
    } catch (error) {
      console.log("Create Watchlist error:", error)
    }
    
    setShowCreateWatchListForm(false)
  }

  useEffect(() => {
    if(auth?.authenticated){
      const movieObject = watchListModalState?.mediaToAdd?.movieObject
      if(movieObject){
        const filmId = watchListModalState?.mediaToAdd?.movieObject.id
        const filmType = watchListModalState?.mediaToAdd?.movieObject?.media_type ? watchListModalState?.mediaToAdd?.movieObject?.media_type : "movie"
        memoizedFetchUserWatchList(auth.token, filmId, filmType)
      }else{
        setUserWatchLists(null)
      }
    }
  }, [memoizedFetchUserWatchList, auth, watchListModalState, setUserWatchLists])

  const closeAll = (()=>{
    handleClose()
    setShowCreateWatchListForm(false)
  })


  return (
      <Modal
      open={watchListModalState.open}
      onClose={closeAll}
      onMouseDown={event => event.stopPropagation()}
    >
    <Box sx={{...style}}>
    {auth ?
    <>
        <Box sx={{display:"flex",py:1, px:2, alignItems:"center", justifyContent:"space-between"}}>
          <Typography variant="subtitle1" component="p">
            Add to...{useUserWatchListState.mediaToAdd}
          </Typography>
          <IconButton disableFocusRipple={true} onClick={closeAll}>
            <CloseSharpIcon fontSize="small"/>
          </IconButton>
        </Box>
        
        <Divider/>

        <List
          sx={{
            width: '100%',
            maxHeight:300,
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
          }}
        >
        {userWatchLists && userWatchLists?.map(watchList=>{
          let checked = watchList.list_id ? true : false
          return (
              <FormGroup key={watchList.id}>
                <MenuItem  selected={watchList.list_id==="ok"} 
                onClick={(e)=>{
                  e.stopPropagation()
                  }}
                >
                    <FormControlLabel 
                      control={
                      <CheckBoxCustom
                        retrieve={retrieve}
                        checked={checked} 
                        watchList={watchList} 
                        watchListModalState={watchListModalState}
                        snackBarDispatch = {snackBarDispatch}
                      />}  
                    value={watchList.id} label={watchList.list_name} sx={{width:"100%"}} />
                </MenuItem>
              </FormGroup>
          )})}
          </List>

        <Divider/>
        <CreateWatchListFromForModale 
          setShowCreateWatchListForm={setShowCreateWatchListForm} 
          showCreateWatchListForm={showCreateWatchListForm}
          createWatchList={createWatchList}
        />
              
      </>
        :
        <>
          <Typography>To create a watchlist, login or register</Typography>
        </>
        }
       </Box> 
    </Modal>
  )
}

export default AddToWatchListModal





  