import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './css/styles.css'
// SlickJS CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NavBar from "./components/NavBar";
import Movie from "./routes/Movie";
import Lists from "./routes/UserLists";
import ListSingle from "./routes/ListSingle";
import Search from "./routes/Search";

import {AuthProvider, SnackBarContext} from "./global/StateContext";
import SnackBarCustom from "./components/SnackBarCustom";
// import AddToWatchListModal from "./components/AddToWatchListModal"



require('dotenv').config();

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4f525e',
      light: '#544e4e',
      dark: '#161616',
      contrastText: '#ffffff',
    },
    secondary:{
      main: '#ffffff',
    }
  },
});






export default function App() {
  const { snackBar, dispatch } = useContext(SnackBarContext)
  // const { watchListModalDispatch } = useContext(AddToWatchListModalContext)
  
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
        <NavBar></NavBar>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/u/:username/lists" component={Lists}/>
            <Route exact path="/search/:media_type" component={Search}/>
            <Route exact path={"/lists/:id"} component={ListSingle}/>
            <Route exact path={["/:media_type/:id"]} component={Movie}/>
            <Route exact path="/" component={Home}/>
            <Route path='*' exact={true} component={Login} />
          </Switch>
          <SnackBarCustom snackBar={snackBar} handleClose={()=>dispatch({type:"CLOSE_SNACKBAR"})}></SnackBarCustom>
        </AuthProvider>
    </Router>
    </ThemeProvider>
  );
}


// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }
