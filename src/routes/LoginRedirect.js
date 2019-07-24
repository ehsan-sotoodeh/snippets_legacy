import React, { Component } from 'react'
import queryString from 'query-string';
import {connect } from 'react-redux'
import {fetchMySnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import Cookies from 'universal-cookie';
const cookies = new Cookies();





class loginRedirect extends Component {
    constructor(props){
        super(props);
        let params = queryString.parse(this.props.location.search);





    }

    render() {
        return (
            <div className="fullHeightPage row m-0">
                <SidebarComponent    />
                <div className="col p-0">
                    wait for Login...
                </div>
            </div>
        )
    }
}



export default loginRedirect;
