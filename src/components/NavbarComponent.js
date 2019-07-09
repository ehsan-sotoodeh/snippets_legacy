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

const NavbarComponent = ({handleSubmit,handleSearchInput,doSearch}) => {

    return (
<nav class="navbar navbar-expand-md navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown d-none">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <div id="custom-search-input">
                <div class="input-group ">
                    <input type="text" class="form-control input-sm" placeholder="Search..." />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-sm rounded-0" type="button">
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </span>
                </div>
            </div>
  </div>
</nav>


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
