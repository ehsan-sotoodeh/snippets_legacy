import C from '../store/constants'
const axios = require('axios');
require('dotenv').config()
axios.defaults.withCredentials = true


class CollectionService  {
    constructor(){
        this.serverURL = process.env.REACT_APP_SERVER_ADDRESS;
    }
    
    async fetchCollection(snippetId) {
        try {
            const url = `${this.serverURL}/collection`;
            let response = await axios.get(url,{withCredentials: true});

            console.log(response)
            if(response.data.result){//collection fetched successfully
                return response.data.payload;
            }else{
                throw new Error(response.data.message)
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }



}


const _CollectionService = new CollectionService();
export { _CollectionService as CollectionService };