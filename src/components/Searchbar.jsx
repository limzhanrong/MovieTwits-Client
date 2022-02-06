import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory } from "react-router-dom";

const Searchbar = () => {
    const history = useHistory()
    const [input, setInput] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(input)
        history.push(`/search/movie?query=${input}&page=1`)
    }
    return (
        <Box sx={{display: { sm: 'flex', xs: 'none' }}}>
            <form action="" onSubmit={handleSubmit}>
                    <SearchbarStyle value={input} onChange={(e)=>setInput(e.target.value)}>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </SearchbarStyle>
            </form>
        </Box>
        
    )
}

export default Searchbar

const SearchbarStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
