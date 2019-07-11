import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchCollection} from '../store/actions'
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
        collection : state.collection
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchCollection(){
            dispatch(fetchCollection())
        }
    }
}



class collectionsPage extends Component {
    delayTimer;

    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetchCollection();
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
        if(Object.keys(this.props.collection).length === 0 ){
            return(
                <h3>Loading...</h3>
            )
        }
        console.log((this.props.collection)) 
        const collectionArray = objectToArray(this.props.collection)
        console.log(collectionArray) 

        let keywordsJSX = collectionArray.map(keyword =>{
            console.log(keyword)
            return(
                <span className="badge badge-pill badge-primary" >{keyword[0]} x {keyword[1]}</span>
            )
        })
        return (
            <div className="row m-0 h-100">
                <div className="col-1 p-0">
                    <SidebarComponent />
                </div>
                <div className="col-11 p-0">
                    <NavbarComponent 
                    handleSubmit={this.handleSubmit} 
                    handleSearchInput={this.handleSearchInput} 
                    doSearch={this.doSearch}/>

                        {keywordsJSX}

                </div>
            </div>
        )
    }
}

function objectToArray(inputObject){
    var resultArray = Object.keys(inputObject).map(function(key) {
        return [key, inputObject[key]];
      });
    return resultArray
}

export default connect(mapStateToProps,mapDispatchToProps)(collectionsPage);
