

let initialState={
    client:"null"
}

const reducer=(state=initialState,action)=>{
    if(action.type=="SET_CLIENT"){
        return{...state,client:action.client}
    }
    return{...state}
}

export default reducer;