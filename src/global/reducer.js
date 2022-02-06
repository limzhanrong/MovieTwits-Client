export const reducer = (state, action) =>{
    switch (action.type) {
      case 'OPEN_SUCCESS_SNACKBAR':
        return { ...state, status:"success", open : true, message: action.message };
      case 'OPEN_ERROR_SNACKBAR':
        return { ...state, status: "error", open : true, message: action.message };
      case 'CLOSE_SNACKBAR':
        return { ...state, open : false };
      default:
        throw new Error();
    }
}

export const AddToWatchListModalReducer = (state,action) => {
  switch(action.type){
    case 'OPEN_ADD_TO_WATCH_LIST_MODAL':
      console.log({...state, mediaToAdd: action.mediaToAdd, open:true})
      return {...state, mediaToAdd: action.mediaToAdd, open:true}
    case 'CLOSE_ADD_TO_WATCH_LIST_MODAL':
      return {...state, open:false}
    default:
      throw new Error()
  }
}