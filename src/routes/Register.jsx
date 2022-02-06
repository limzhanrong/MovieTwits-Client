import React from 'react'
import { FormControl, Paper, Container, Button, Typography, TextField, Grid } from '@mui/material'
import serverAPI from '../APIs/serverAPI';
import PasswordInput from '../components/PasswordInput';
import { SnackBarContext } from '../global/StateContext';



const Register = () => {
    const { dispatch } = React.useContext(SnackBarContext)

    const [values, setValues] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword,});
    }
    const handleClickShowConfirmPassword = () => {
        setValues({...values, showConfirmPassword: !values.showConfirmPassword,});
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!(values.username && values.password && values.confirmPassword)){
            dispatch({ type:"OPEN_ERROR_SNACKBAR", message:"Please fill in all fields" })
            return
        }
        if(values.password !== values.confirmPassword){
            dispatch({ type:"OPEN_ERROR_SNACKBAR", message:"Password must match!" })
            return
        }
        try{
            const response = await serverAPI.post('api/user/register/',{
                username: values.username,
                password: values.password
            }).catch((err)=>{
                dispatch({ type:"OPEN_ERROR_SNACKBAR", message:err.response.data })
                return
            })
            if(response.status === 200){
                dispatch({ type:"OPEN_SUCCESS_SNACKBAR", message: "Registration is successful! :)" })
            }
            console.log(response)
        }catch(e){
            console.log(e)
        }
        
    }
    return (
        <>
            <Container className="horizontal-align">
                <Typography variant="h5" my={4}>
                    Register
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
                        <Grid item xs={12}>
                            <PasswordInput
                                value={values.confirmPassword}
                                id="confirmPassword"
                                handleClickShowPassword={handleClickShowConfirmPassword}
                                handleMouseDownPassword={handleMouseDownPassword} 
                                handleChange = {(e)=>setValues({...values, confirmPassword:e.target.value})}
                                visibility = {values.showConfirmPassword}
                                label ="Confirm Password"
                            >
                            </PasswordInput>
                        </Grid>
                        
                        
                        <Grid item xs={12} mt={5}>
                            <Button type="submit" variant="contained">Register</Button>
                        </Grid>
                        </Paper>
                </form>
            </Container>
        </>
    )
}

export default Register
