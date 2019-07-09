import React from 'react'
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

const NavbarComponent = ({handleSubmit,handleSearchInput,doSearch}) => {

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavDropdown className="d-none" title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            
            <Form inline>
                <div id="custom-search-input" className="mr-3">
                    <div class="input-group ">
                            <input type="text" class="form-control input-sm" onChange={handleSearchInput} placeholder="Search..." />
                            <span class="input-group-btn">
                                <button class="btn btn-info btn-sm rounded-0" onClick={doSearch} type="button">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </span>
                    </div>
                </div>
            </Form>
            <SingInSignOut className="col-sm-12"/>

        </Navbar.Collapse>
        </Navbar>
    )
}

function SearchJsx({handleSubmit,handleSearchInput,doSearch}){
    return (
        <Form
        className={'w-75 d-flex justify-content-start'}
            noValidate
            onSubmit={handleSubmit}
        >


            <Form.Group as={Col} controlId="validationCustomUsername">
                <InputGroup>

                <Form.Control
                    type="text"
                    placeholder="Search"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handleSearchInput}
                />
                <InputGroup.Append>
                        <Button type="submit" onClick={doSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                </InputGroup.Append>

                </InputGroup>
            </Form.Group>
        </Form>
    )
}

export default NavbarComponent
