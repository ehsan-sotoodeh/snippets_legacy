import C from './constants'
import {combineReducers} from 'redux'
import initialState from './initialState.json'


export const snippets = (state = initialState,action)=>{
    let newState = []
    console.log(state)
    console.log(action.type)

    switch(action.type){
        case C.SNIPPETS.FETCH_ALL :
            return state = [...action.payload];

        case C.SNIPPETS.FTECH_BY_ID :
            return [...state,action.payload];

        case C.SNIPPETS.FETCH_BY_SEARCH_TERM:
            return state = [...action.payload];

        case C.SNIPPETS.ADD_NEW:
            return state = [...state,action.payload];

        case C.SNIPPETS.UPDATE_ONE_BY_ID:
            newState = state.filter(snippet =>{
                return snippet.id !== action.payload.id
            })
            return [...newState,action.payload];

        case C.SNIPPETS.DELETE_ONE_BY_ID:
            let deletedId = parseInt(action.payload);
            newState = state.filter(snippet =>{
                return snippet.id !== deletedId
            })
            return state = [...newState];
            
        default:
            return state;
    }
}

export const keywords = (state = {},action)=>{
    switch(action.type){
        case C.KEYWORDS.FETCH_ALL :
            return state = [...action.payload];

        case C.KEYWORDS.FETCH_BY_SEARCH_TERM:
            return state = [...action.payload];

        default:
            return state;
    }
}
export const view = (state = {},action)=>{
    switch(action.type){
        case C.VIEW.SET_ACTIVE_SNIPPET :
            return state = [...action.payload];
        default:
            return state;
    }
}
export const user = (state = {},action)=>{
    switch(action.type){ //TODO replace with user actions
        case C.VIEW.SET_ACTIVE_SNIPPET :
            return state = [...action.payload];
        default:
            return state;
    }
}


export default combineReducers({
    snippets,
    keywords,
    view,
    user
});