import React from 'react'
import { FormControl, InputLabel, InputAdornment, IconButton, Input } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


const PasswordInput = (props) => {
    let {value, handleClickShowPassword, handleMouseDownPassword, handleChange, label, visibility, id} = props
    return (
            <FormControl sx={{ my: 1, width: '30ch' }} variant="standard">
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <Input
                    id={id}
                    type={visibility ? 'text' : 'password'}
                    value={value}
                    onChange={handleChange}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {visibility ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
    )
}

export default PasswordInput
