import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchMySnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import SingInSignOut from '../components/SingInSignOut'
import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { NavLink } from "react-router-dom";

const SEARCHBOX_DELAY = 500; // add to settings file

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        fetchMySnippets(){
            dispatch(fetchMySnippets())
        },
        searchSnippets(term){
            dispatch(searchSnippets(term))

        }
    }
}



class mySnippetsPage extends Component {
    delayTimer;
    constructor(props){
        super(props);
        this.state = {"searchKey" : ""}

    }

    componentDidMount(){
        this.props.fetchMySnippets();
    }


    handleSubmit =  (e) => {
        e.preventDefault();
    }

    handleSearchInput = (e) =>{
        this.setState({"searchKey":e.target.value});
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.doSearch();
        }, SEARCHBOX_DELAY);
    }
    doSearch = () =>{
        this.props.searchSnippets(this.state.searchKey.trim());
    }

    render() {
        console.log("mySnippetsPage")

        let snippetsJsx = this.props.snippets.map((snippet,index) =>{
            return(
                <SnippetCard key={"snippetCard" + index} snippet={snippet} />
            )
        })
        return (
            <div className="row m-0">
                <div className="col-1 p-0">
                    <SidebarComponent />
                </div>
                <div className="col-11 p-0">
                    <NavbarComponent 
                    handleSubmit={this.handleSubmit} 
                    handleSearchInput={this.handleSearchInput} 
                    doSearch={this.doSearch}/>

                        {snippetsJsx}

                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(mySnippetsPage);
