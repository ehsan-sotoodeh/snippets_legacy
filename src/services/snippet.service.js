import C from '../store/constants'

class SnippetService  {
    constructor(){
        this.serverURL = C.VIEW.SERVER_URL;
    }
    
    async fetchAllSnippets() {
        try {
            const url = `${this.serverURL}/snippet`;
            let snippets = await fetch(url);
            snippets = snippets.json();
            return snippets;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

const _SnippetService = new SnippetService();
export { _SnippetService as SnippetService };