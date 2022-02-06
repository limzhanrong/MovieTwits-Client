import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackBarCustom = ({snackBar, handleClose}) => {
    return (
        <Snackbar open={snackBar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackBar.status} sx={{ width: '100%' }}>
                {snackBar.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarCustom
