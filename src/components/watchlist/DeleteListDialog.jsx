import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import React from 'react'

const DeleteListDialog = ({ open, handleClose, deleteListName, handleConfirmDelete }) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm to delete list: {deleteListName}</DialogTitle>
            <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete}>Delete</Button>
                </DialogActions>
        </Dialog>
    )
}

export default DeleteListDialog
