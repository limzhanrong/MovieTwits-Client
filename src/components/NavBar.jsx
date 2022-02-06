import React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu, ButtonGroup, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from "react-router-dom";
import {AuthContext} from "../global/StateContext";
import serverAPI from '../APIs/serverAPI';
import Search from "./Searchbar";



export default function NavBar() {
  let { useAuthState, logout } = React.useContext(AuthContext);
  // const logout = useLogout
  const [auth, setAuth] = useAuthState
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirect = (link) => {
    setAnchorEl(null);
    history.push(link);
  }
  
  const handleLogout = () =>{
    setAnchorEl(null);
    logout()
    setAuth(false)
  }

  const redirectToList = async () => {
    try{
      const response = await serverAPI.post('/api/user/authenticated/getInfo',{
        token: auth.token
      })
      redirect(`/u/${response.data.username}/lists`)
    }catch(err){
      console.log("redirect to list failed: " + err)
    }
  } 

  React.useEffect(()=>{
    setAnchorEl(null);
    const token = localStorage.getItem('token');
    if(token){
      setAuth({...auth, token:token, authenticated: true})
    }else{
      setAuth(false)
    }// eslint-disable-next-line 
  },[])

  return (
    <Box sx={{ flexGrow: 1, display:"flex", justifyContent:"space-between" }}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent:"space-between"}}>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr:2 }} onClick={()=>redirect('/')}>
              MovieTwits
            </Typography>

            <Search primary sx={{justifyContent:"space-between",justifySelf:"start" }}/>
          </Box>

            <div>
              {auth?.authenticated ? (
                <>
                  <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={()=>{redirectToList()}}>Lists</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>

                    </Menu>
                </>) : (
                  <ButtonGroup variant="text" color="secondary" size="small">
                    <Button onClick={()=>redirect("/login")}>Login</Button>
                    <Button onClick={()=>redirect("/register")}>Register</Button>
                  </ButtonGroup>
                )
              }
              
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
