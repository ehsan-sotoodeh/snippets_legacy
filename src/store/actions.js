import C from './constants'
import fetch from 'isomorphic-fetch'
import { SnippetService } from '../services/snippet.service'
import { CategoryService } from '../services/category.service'
let serverURL = C.VIEW.SERVER_URL;


export const fetchAllSnippets = () => async (dispatch , getState) =>{
    try{
        let snippets = await SnippetService.fetchAll();
        dispatch({
            type: C.SNIPPETS.FETCH_ALL,
            payload: snippets
        });
    }catch(error){
        return new Error(error)

    }
}



// SNIPPETS : {
//     FETCH_ALL : "FETCH_ALL",
//     FTECH_BY_ID : "FTECH_BY_ID",
//     FETCH_BY_SEARCH_TERM : "FETCH_BY_SEARCH_TERM",
//     ADD_NEW : "ADD_NEW",
//     UPDATE_ONE_BY_ID :"UPDATE_ONE_BY_ID",
//     DELETE_ONE_BY_ID : "DELETE_ONE_BY_ID"
// },
// KEYWORDS : {
//     FETCH_ALL : "FETCH_ALL",
//     FETCH_BY_SEARCH_TERM : "FETCH_BY_SEARCH_TERM"

// },
// VIEW : {
//     SET_ACTIVE_SNIPPET : "SET_ACTIVE_SNIPPET",
//     SERVER_URL : "http://dev.sotoodeh.pro:3000/"
// }

