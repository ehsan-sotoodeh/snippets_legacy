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
        this.pageTitle = "Collection";
    }

    componentDidMount(){
        this.props.fetchCollection();
    }

    render() {
        if(Object.keys(this.props.collection).length === 0 ){
            return(
                <h3>Loading...</h3>
            )
        }
        const collectionArray = objectToArray(this.props.collection);
        collectionArray.sort(function(a, b) {
            return b[1] - a[1];
        });

        let keywordsJSX = collectionArray.map((keyword,index) =>{
            return(
                <div  key={`keywordCard${index}`} className=" col-12 col-sm-6 col-md-4 col-lg-3 " >
                    <div className="card mt-3">
                        <NavLink to={ "/?search=" + keyword[0]} className="keywordPill    py-1 my-2 float-left" >
                        <div className="d-flex justify-content-start">
                            <span className="ml-2 fontSize11  text-dark ">{keyword[0]}</span>
                        </div>
                        <div className="badgeContainer">
                            <span className="fontSize08 badge badge-secondary ">{keyword[1]}</span>

                        </div>

                            
                        </NavLink>

                    </div>

                </div>
            )
        })
        return (
            <div className="fullHeightPage collectionPage row m-0">
                <div className="sidebarColumn d-none d-sm-block p-0">
                    <SidebarComponent  active="collectionPage"  />
                </div>
                <div className="col m-0 p-0">
                    <NavbarComponent pageTitle={this.pageTitle} />
                    <div className="row m-0 p-0">
                        {keywordsJSX}
                    </div>
                </div>
            </div>
        )
    }
}

function objectToArray(inputObject){
    const resultArray = Object.keys(inputObject).map(function(key) {
        return [key, inputObject[key]];
      });
    const resultAWithoutEmptyObjects = resultArray.filter(obj=>{
        return obj[0].length > 0
    })
    return resultAWithoutEmptyObjects
}

export default connect(mapStateToProps,mapDispatchToProps)(collectionsPage);
