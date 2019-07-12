import C from './constants'
import fetch from 'isomorphic-fetch'
import { SnippetService } from '../services/snippet.service'
import { BookmarkService } from '../services/bookmark.service'
import { CollectionService } from '../services/collection.service'
import { resolve } from 'path';
let serverURL = C.VIEW.SERVER_URL;


export const fetchAllSnippets = () => async (dispatch , getState) =>{

    try{
        let snippets = await SnippetService.fetchAllSnippets();
        dispatch({
            type: C.SNIPPETS.FETCH_ALL,
            payload: snippets
        });
    }catch(error){
        console.log(error)
        return new Error(error)

    }
}
export const fetchMySnippets = () => async (dispatch , getState) =>{

    try{
        let snippets = await SnippetService.fetchMySnippets();
        dispatch({
            type: C.SNIPPETS.FETCH_ALL,
            payload: snippets
        });
    }catch(error){
        console.log(error)
        return new Error(error)

    }
}
export const fetchOneSnippetById = (snippetId) => async (dispatch , getState) =>{

    try{
        // Tooie action ham is hammon service ke gofti estefadeh kardam
        let snippet = await SnippetService.fetchOneSnippetById(snippetId);
        dispatch({
            type: C.SNIPPETS.FTECH_BY_ID,
            payload: snippet
        });
    }catch(error){
        return new Error(error)

    }
}
export const deleteSnippet = (snippetId) => async (dispatch , getState) =>{

    try{
        let snippet = await SnippetService.deleteSnippet(snippetId);
        dispatch({
            type: C.SNIPPETS.DELETE_ONE_BY_ID,
            payload: snippet
        });
    }catch(error){
        return new Error(error)

    }
}
export const updateSnippet = (snippet) => async (dispatch , getState) =>{

    try{
        console.log(snippet)
        let resultSnippet = await SnippetService.updateSnippetById(snippet);
        dispatch({
            type: C.SNIPPETS.UPDATE_ONE_BY_ID,
            payload: resultSnippet
        });
    }catch(error){
        return new Error(error)

    }
}
export const saveSnippet = (snippet) => async (dispatch , getState) =>{

    try{
        let resultSnippet = await SnippetService.saveSnippet(snippet);
        console.log(resultSnippet)
        dispatch({
            type: C.SNIPPETS.ADD_NEW,
            payload: resultSnippet
        });
        console.log(resultSnippet)

        return resultSnippet;
    }catch(error){
        return new Error(error)

    }
}
export const searchSnippets = (SearchTerm) => async (dispatch , getState) =>{

    try{
        console.log(SearchTerm)
        let resultSnippet = await SnippetService.searchSnippets(SearchTerm);
        dispatch({
            type: C.SNIPPETS.FETCH_BY_SEARCH_TERM,
            payload: resultSnippet
        });
    }catch(error){
        return new Error(error)

    }
}

export const bookmarkSnippet = (snippetId) => async (dispatch , getState) =>{
    console.log("bookmarkSnippet")
    try{
        let resultSnippet = await BookmarkService.bookmarkSnippet(snippetId);
        console.log(resultSnippet)
        dispatch({
            type: C.SNIPPETS.UPDATE_ONE_BY_ID,
            payload: resultSnippet
        });
        console.log(resultSnippet)

        return resultSnippet;
    }catch(error){
        return new Error(error)

    }
}

export const unBookmarkSnippet = (snippetId) => async (dispatch , getState) =>{
    try{
        let resultSnippet = await BookmarkService.unBookmarkSnippet(snippetId);
        dispatch({
            type: C.SNIPPETS.UPDATE_ONE_BY_ID,
            payload: resultSnippet
        });
        
        return resultSnippet;
    }catch(error){
        return new Error(error)

    }
}


export const fetchCollection = (snippetId) => async (dispatch , getState) =>{
    try{
        let collection = await CollectionService.fetchCollection(snippetId);
        dispatch({
            type: C.COLLECTION.FETCH_COLLECTION,
            payload: collection
        });
        
        return collection;
    }catch(error){
        return new Error(error)

    }
}

// export const login = () => async (dispatch , getState) =>{

//     try{
//         let user = await UserService.login(snippetId);
//         dispatch({
//             type: C.SNIPPETS.FTECH_BY_ID,
//             payload: snippet
//         });
//     }catch(error){
//         return new Error(error)

//     }
// }




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

