import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import NavbarWithSearchComponent from '../components/NavbarWithSearchComponent'
import SidebarComponent from '../components/SidebarComponent'
import queryString from 'query-string';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets,
        userId : parseInt(cookies.get("user_id"))
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAllSnippets(){
            dispatch(fetchAllSnippets())
        },
        searchSnippets(term){
            dispatch(searchSnippets(term))

        }
    }
}



class HomePage extends Component {
    constructor(props){
        super(props);
        this.pageTitle = "Snippets"
        let params = queryString.parse(this.props.location.search);
        console.log("auth_token",)
        if(params['auth_token']){
            //login landing 
            for (let [key, value] of Object.entries(params)) {
                cookies.set(key, value, { path: '/' });
    
            }
    
            window.close();
        }


        if(params.search){
            this.state = {searchKey:params.search};
        }else{
            this.state = {searchKey : ""}
        }


    }

    componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        if(!params.search){
            // we have handled search in constructor before.
            this.props.fetchAllSnippets();
            this.setState({searchKey: ""});

        }      
    }

    resetSearch =() =>{
        // reset search on X button in search component
        this.props.history.push('/')
        this.setState({"searchKey" : ""});
    }

    render() {

        let snippetsJsx = this.props.snippets.map((snippet,index) =>{
            return(
                <SnippetCard key={"snippetCard" + index} snippet={snippet} userId={this.props.userId} />
            )
        })
        return (
            <div className="fullHeightPage row m-0">
                <SidebarComponent   />

                <div className=" col  p-0">
                    <NavbarWithSearchComponent 
                        searchKey={this.state.searchKey} 
                        resetSearch={this.resetSearch} 
                        pageTitle = {this.pageTitle}
                        
                    />

                        {snippetsJsx}

                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
