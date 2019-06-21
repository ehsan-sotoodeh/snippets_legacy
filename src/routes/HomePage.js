import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

const SEARCHBOX_DELAY = 3500; // add to settings file

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
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
    delayTimer;
    constructor(props){
        super(props);
        this.state = {"searchKey" : ""}

    }

    componentDidMount(){
        this.props.fetchAllSnippets();
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
        let snippetsJsx = this.props.snippets.map((snippet,index) =>{
            return(
                <SnippetCard key={"snippetCard" + index} snippet={snippet} />
            )
        })
        return (
            <div>
                <br/>

                <SearchJsx handleSubmit={this.handleSubmit} handleSearchInput={this.handleSearchInput} doSearch={this.doSearch} />
                <h1>
                    This is home Page
                </h1>
                {snippetsJsx}
            </div>
        )
    }
}

function SearchJsx({handleSubmit,handleSearchInput,doSearch}){
    return (
        <Form
            noValidate
            onSubmit={handleSubmit}
        >
            <Form.Row>


            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
            </Form.Row>
        </Form>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
