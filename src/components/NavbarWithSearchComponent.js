import React,{Component} from 'react'
import {connect } from 'react-redux'
import { searchSnippets} from '../store/actions'
import queryString from 'query-string';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { NavLink } from "react-router-dom";
import SingInSignOut from './SingInSignOut'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import NavDropdown from 'react-bootstrap/NavDropdown'

const SEARCHBOX_DELAY = 500; // add to settings file

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
}

const mapDispatchToProps = dispatch => {
    return{
        searchSnippets(term){
            dispatch(searchSnippets(term))

        }
    }
}

class NavbarWithSearchComponent extends Component {
    delayTimer;
    constructor(props){
        super(props);
        this.state = {searchKey:this.props.searchKey};

    }

    componentDidMount(){
        this.doSearch();
    }   

    handleSubmit =  (e) => {
        e.preventDefault();
    }

    handleSearchInput = (e) =>{
        this.setState({searchKey:e.target.value});
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.doSearch();
        }, SEARCHBOX_DELAY);
    }
    doSearch = () =>{
        this.props.searchSnippets(this.state.searchKey.trim());
    }

    resetSearch = () =>{
        this.setState({searchKey:""},()=>{
            this.doSearch();
            this.props.resetSearch();
        });

    }



    render(){
        console.log("render", this.props.searchKey)
        return (
            <Navbar bg="light" expand="lg">
            <Form inline>
                    <div id="custom-search-input" className="">
                        <div class="input-group ">
                                <input type="text" class="form-control input-sm" onChange={this.handleSearchInput} value={this.state.searchKey} placeholder="Search..." />
                                <span class="input-group-btn">
                                    <button 
                                        class={"btn btn-info btn-sm rounded-0 " + ((this.state.searchKey.length === 0)? "d-none" : " ")} 
                                        onClick={this.resetSearch} 
                                        type="button">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <button class="btn btn-info btn-sm rounded-0 searchButton" onClick={this.doSearch} type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </span>
                        </div>
                    </div>
                </Form>
            </Navbar>
        );

    }
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
export default connect(mapStateToProps,mapDispatchToProps)(NavbarWithSearchComponent);

