import React, { useState, useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/system';
import { AddToWatchListModalContext } from '../global/StateContext';


const MediaDropDown = ({movieObject}) => {
  const { watchListModalDispatch } = useContext(AddToWatchListModalContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
  };
  const handleAddButton = (event) => {
      event.stopPropagation();
      watchListModalDispatch({type:"OPEN_ADD_TO_WATCH_LIST_MODAL", mediaToAdd:{movieObject}})
      setAnchorEl(null);
  };
  const handleClose = (event) => {
      event.stopPropagation();
      setAnchorEl(null);
  }

  return (
    <Box sx={{position:"absolute", right:"0", margin:"0.5rem"}} onMouseDown={event => event.stopPropagation()}>
        <MoreHorizIcon
        sx={{color:"white", fontSize:"30px"}}
        onClick={handleClick}
        />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          <MenuItem onClick={handleAddButton}>
            Add
          </MenuItem>
      </Menu>
    </Box>
  );
}

export default MediaDropDown
