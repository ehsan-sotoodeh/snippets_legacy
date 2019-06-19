import C from '../store/constants'
const axios = require('axios');

class SnippetService  {
    constructor(){
        this.serverURL = C.VIEW.SERVER_URL;
    }
    
    async fetchAllSnippets() {
        try {
            const url = `${this.serverURL}/snippet`;
            let snippets = await fetch(url , {mode: 'cors'});
            snippets = snippets.json();
            return snippets;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async fetchOneSnippetById(snippetId) {
        try {
            const url = `${this.serverURL}/snippet/${snippetId}`;

            let snippet = await axios.get(url)
            // .then(function (response) {
            //     console.log(response);
            //     snippet = response.json();
            //     return snippet;
            // })
            // .catch(function (error) {
            //     console.log(error);
            //     //throw new Error(error)
    
            // });
            console.log( snippet.data)
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }

}

const _SnippetService = new SnippetService();
export { _SnippetService as SnippetService };