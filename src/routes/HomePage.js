import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPlus } from '@fortawesome/free-solid-svg-icons'; 

const SEARCHBOX_DELAY = 500; // add to settings file

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
                <Row className={"my-2 p-0  border-secondary border-bottom justify-content-start"}>
                    <Col  md={2}>
                        <Button variant={'success'} ><FontAwesomeIcon icon={faPlus} /> Add New...</Button>
                    </Col>
                    <Col  md={6}>
                    <SearchJsx 
                            
                            handleSubmit={this.handleSubmit} 
                            handleSearchInput={this.handleSearchInput} 
                            doSearch={this.doSearch} />
                    </Col>
                </Row>
                <div className="row mx-3">
                    {snippetsJsx}
                </div>
            </div>
        )
    }
}

function SearchJsx({handleSubmit,handleSearchInput,doSearch}){
    return (
        <Form
        className={'w-100 d-flex justify-content-start'}
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

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
