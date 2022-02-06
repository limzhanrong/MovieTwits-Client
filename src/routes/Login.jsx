import React from 'react'
import { FormControl, Paper, Container, Button, Typography, TextField, Grid } from '@mui/material'
import serverAPI from '../APIs/serverAPI';
import PasswordInput from '../components/PasswordInput';
import { AuthContext, SnackBarContext } from '../global/StateContext';
import { useHistory } from "react-router-dom";


const Login = () => {
    const { useAuthState } = React.useContext(AuthContext)
    const { dispatch } = React.useContext(SnackBarContext)

    const history = useHistory()

    // eslint-disable-next-line 
    const [auth, setAuth] = useAuthState
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword,});
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!(values.username && values.password)){
            dispatch({type:"OPEN_ERROR_SNACKBAR", message:"Please fill in all fields"})
            return
        }
        try{
            const response = await serverAPI.post('api/user/login/',{
                username: values.username,
                password: values.password
            }).catch((err)=>{
                dispatch({type:"OPEN_ERROR_SNACKBAR", message:err.response.data})
                return
            })
            // Set auth if successful
            if(response?.status === 200){
                const id = response.data.id
                const username = response.data.username
                const token = response.data.token
                setAuth( { id : id, username : username, token : token, authenticated: true } )
                localStorage.setItem('token', token);
                dispatch({type:"OPEN_SUCCESS_SNACKBAR", message:"Login is successful! :)"})
                history.push('/')
            }
        }catch(e){
            console.log(e)
        }
        
    }
    return (
        <>
            <Container className="horizontal-align">
                <Typography variant="h5" my={4}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                <Paper component={Grid} container spacing={0} className="add-padding" sx={{mx:"auto"}} elevation={5}>
                        <Grid item xs={12}>
                            <FormControl sx={{ my: 1, width: '30ch' }} variant="outlined">
                                <TextField
                                    label="Username"
                                    value={values.username}
                                    onChange={(e)=>setValues({...values, username:e.target.value})}
                                    variant="standard"
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                value={values.password}
                                id="password"
                                handleClickShowPassword={handleClickShowPassword}
                                handleMouseDownPassword={handleMouseDownPassword} 
                                handleChange = {(e)=>setValues({...values, password:e.target.value})}
                                visibility = {values.showPassword}
                                label ="Password"
                                >
                            </PasswordInput>
                        </Grid>
                        
                        <Grid item xs={12} mt={5}>
                                <Button type="submit" onSubmit={handleSubmit} variant="contained">Login</Button>
                        </Grid>
                </Paper>
                </form>
            </Container>
        </>
    )
}

export default Login
