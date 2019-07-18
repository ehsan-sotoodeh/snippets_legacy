import React,{Component} from 'react'
import { searchSnippets} from '../store/actions'
import queryString from 'query-string';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { NavLink } from "react-router-dom";
import SingInSignOut from './SingInSignOut'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import NavDropdown from 'react-bootstrap/NavDropdown'



class NavbarComponent extends Component {

    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">{this.props.pageTitle}</Navbar.Brand>
            </Navbar>
        );

    }
}


export default NavbarComponent;

