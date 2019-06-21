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

            let snippet = await axios.get(url);
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }
    async updateSnippetById(inputSnippet) {
        try {
            //http://93.188.167.131:3000/snippet?id=5&title=myNewTitle&keywords=MyList Of keywords&content=My dummy content
            let inputSnippetString = urlfy(inputSnippet);
            const url = `${this.serverURL}/snippet/snippet?${inputSnippetString}`;
            let snippet = await axios.put(url)
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }

}

const urlfy = obj => Object
    .keys(obj)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&');

const _SnippetService = new SnippetService();
export { _SnippetService as SnippetService };