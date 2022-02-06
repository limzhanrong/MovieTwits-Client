import React, { useState, createContext , useEffect, useReducer, useCallback } from 'react'
import serverAPI from '../APIs/serverAPI'
import { reducer, AddToWatchListModalReducer } from './reducer'
import { useHistory } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const history = useHistory();
    const [auth, setAuth] = useState({
        id:'',
        username:'',
        token:'',
        authenticated: false
    })
    
    const logout =useCallback( () =>{
        setAuth({
            id:'',
            username:'',
            token:'',
            authenticated: false
        })
        localStorage.removeItem("token")
        history.push('/')
    }, [history])

    const fetchUserInfo = useCallback(
        async (token) => {
            try{
                const response = await serverAPI.post('/api/user/authenticated/getInfo',{
                  token: token
                })
                console.log('Fetch user info:', response)
                if(response){
                    setAuth(auth=>({ ...auth, id: response.data.user_id, token:token, username:response.data.username, authenticated: true}))
                }
              }catch(err){
                console.log("fetch user info failed: " + err)
              }
        }, []
    )

    // async function fetchUserInfo(token) {
    //     try{
    //         const response = await serverAPI.post('/api/user/authenticated/getInfo',{
    //           token: token
    //         })
    //         console.log('Fetch user info:', response)
    //         if(response){
    //             setAuth(auth=>({ ...auth, id: response.data.user_id, token:token, username:response.data.username, authenticated: true}))
    //         }
    //       }catch(err){
    //         console.log("fetch user info failed: " + err)
    //       }
    // }

    // Adds Axios interceptors for 401 and 403 requests

    useEffect(() => {
        const serverInterceptor = serverAPI.interceptors.response.use(undefined, (error) => {
            console.log('intercepted: ', error.response);
            if(error.response.status === 401 || error.response.status === 403){
                logout()
            }
            return Promise.reject(error);
        });

        const token = localStorage.getItem('token');
        if(token){
            fetchUserInfo(token)
        }
        
        // Clean up function. Removes interceptor when component is unmounted
        return () => {
            serverAPI.interceptors.response.eject(serverInterceptor)
        }
    }, [fetchUserInfo, logout])

    return (
        <AuthContext.Provider value={{useAuthState: [auth, setAuth], logout: logout, fetchUserInfo:fetchUserInfo}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const SnackBarContext = createContext()

export const SnackBarProvider = (props) => {
    const initialState = {open: false, status:"error", message:"Please fill in all fields"}
    const [snackBar, dispatch] = useReducer(reducer, initialState)

    return (
        <SnackBarContext.Provider value={{snackBar: snackBar, dispatch: dispatch}}>
            {props.children}
        </SnackBarContext.Provider>
    )
}

export const AddToWatchListModalContext = createContext()

export const AddToWatchListModalProvider = (props) => {
    const initialState = {open: false, mediaToAdd:null}
    const [userWatchLists,setUserWatchLists] = useState([])
    const [watchListModalState, watchListModalDispatch] = useReducer(AddToWatchListModalReducer, initialState)

    const memoizedFetchUserWatchList = useCallback(
        (token, filmId, filmType) => {
            fetchUserWatchlist(token, filmId, filmType)
    },[]);
    
    async function fetchUserWatchlist(token, filmId, filmType) {
        try{
            const response = await serverAPI.post('/api/list/authenticated/retrieveListsWithFilmIdExistance',{
                token: token,
                filmId,
                filmType
            })
            console.log('Fetch user watchlist:', response.data.rows)
            if(response){
                setUserWatchLists(response.data.rows)
            }
            }catch(err){
            console.log("fetch user watchlist failed: " + err)
            } 
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            memoizedFetchUserWatchList(token)
        }
    },[memoizedFetchUserWatchList])

    
    return (
        <AddToWatchListModalContext.Provider value={{
            watchListModalState, 
            watchListModalDispatch,
            fetchUserWatchlist,
            useUserWatchListState : [userWatchLists, setUserWatchLists],
            memoizedFetchUserWatchList
            }}>
            {props.children}
        </AddToWatchListModalContext.Provider>
    )
}

