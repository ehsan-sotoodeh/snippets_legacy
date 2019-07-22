import C from '../store/constants'
const axios = require('axios');
require('dotenv').config()
axios.defaults.withCredentials = true


class SnippetService  {
    constructor(){
        this.serverURL = process.env.REACT_APP_SERVER_ADDRESS;
    }
    
    async fetchAllSnippets() {
        try {
            const url = `${this.serverURL}/snippets`;
            let snippets = await fetch(url , {credentials: "include" , mode: 'cors'} );
            snippets = snippets.json();
            return snippets;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async fetchMySnippets() {
        try {
            const url = `${this.serverURL}/snippets/mySnippets`;
            let snippets = await fetch(url , {credentials: "include" , mode: 'cors'} );
            snippets = snippets.json();
            return snippets;
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async fetchOneSnippetById(snippetId) {
        try {
            const url = `${this.serverURL}/snippets/id/${snippetId}`;

            let snippet = await axios.get(url);
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }
    async updateSnippetById(inputSnippet) {
        try {
            let inputSnippetString = urlfy(inputSnippet);
            const url = `${this.serverURL}/snippets/id/${inputSnippet.id}?${inputSnippetString}`;
            let snippet = await axios.put(url,{withCredentials: true})
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }
    async saveSnippet(inputSnippet) {
        try {
            
            let inputSnippetString = urlfy(inputSnippet);
            const url = `${this.serverURL}/snippets?${inputSnippetString}`;
            let snippet = await axios.post(url);
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }
    async deleteSnippet(snippetId) {
        try {
            const url = `${this.serverURL}/snippets/id/${snippetId}`;
            let snippet = await axios.delete(url,{withCredentials: true})
            return snippet.data
        } catch (error) {
            console.log(error)
        }

    }
    async searchSnippets(searchTerm) {
        try {
            //http://93.188.167.131:3000/snippet/search/items,ccc
            searchTerm = searchTerm.replaceAll(" ", ",");
            const url = `${this.serverURL}/snippets/search/${searchTerm}`;
            let snippet = await axios.get(url)
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


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

const _SnippetService = new SnippetService();
export { _SnippetService as SnippetService };