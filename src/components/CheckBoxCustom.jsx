import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'
import serverAPI from '../APIs/serverAPI';


const CheckBoxCustom = ({checked, watchList, watchListModalState, snackBarDispatch, retrieve}) => {
    const [checkState, setCheckState] = useState(checked)

    useEffect(()=>{
            setCheckState(checked)
    },[checked])

    const handleChange = async () => {
        const listID = watchList.id
        const listName = watchList.list_name
        const filmID = watchListModalState?.mediaToAdd?.movieObject.id
        const filmType = watchListModalState?.mediaToAdd?.movieObject?.media_type ? watchListModalState?.mediaToAdd?.movieObject?.media_type : "movie"
        const token = localStorage.getItem('token')
        const response = await serverAPI.post('/api/list/authenticated/toggleShowFromWatchlist', {
            token: token,
            listID: listID,
            filmID: filmID,
            filmType: filmType
        })
        if (response.status === 200){
            let msg
            response.data.action === 'add' ? msg = `Added to ${listName}` : msg = `Removed from ${listName}`
            snackBarDispatch({ type:"OPEN_SUCCESS_SNACKBAR", message:msg })
            
            if(retrieve){
                console.log("retrieve")
                retrieve()
            }
        }else{
            snackBarDispatch({ type:"OPEN_ERROR_SNACKBAR", message:`Failed to add to ${listName}` })
        }
        setCheckState((prevCheck) => {
            return !prevCheck
        })
    }


    return (
        <Checkbox checked={checkState} onChange={handleChange}>

        </Checkbox>
    )
}

export default CheckBoxCustom
