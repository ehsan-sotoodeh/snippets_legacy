import C from '../store/constants'
const axios = require('axios');
require('dotenv').config()
axios.defaults.withCredentials = true


class BookmarkService  {
    constructor(){
        this.serverURL = process.env.REACT_APP_SERVER_ADDRESS;
    }
    
    async bookmarkSnippet(snippetId) {
        try {
            const url = `${this.serverURL}/bookmark/snippetId/${snippetId}`;
            let response = await axios.post(url,{withCredentials: true});

           
            if(response.data.result){//bookmarking was successful 
                const snippet = response.data.payload;
                return snippet;
            }else{
                throw new Error(response.data.message)
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }
    async unBookmarkSnippet(snippetId) {
        try {
            const url = `${this.serverURL}/bookmark/snippetId/${snippetId}`;
            let response = await axios.delete(url,{withCredentials: true});

           
            if(response.data.result){//unBookmarking was successful 
                const snippet = response.data.payload;
                return snippet;
            }else{
                throw new Error(response.data.message)
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }


}


const _BookmarkService = new BookmarkService();
export { _BookmarkService as BookmarkService };