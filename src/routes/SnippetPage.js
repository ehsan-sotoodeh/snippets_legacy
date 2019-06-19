import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets,fetchOneSnippetById} from '../store/actions'
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOneSnippetById(activeSnippet){
            dispatch(fetchOneSnippetById(activeSnippet))
        }
    }
}
class SnippetPage extends Component {
    render() {
        console.log(this.props);
        let activeSnippet  = this.props.match.params.snippetId;
        //inja Id ro as parameter ha migiram
        let snippet = this.props.snippets.filter(snippet =>{
            return snippet.id = activeSnippet;
        })[0]; 

        // bad az tooie store , list snippet ha ro search mikonam ta ooni ke mikham ro
        // peida konam

        if(snippet === undefined){
            // age toie store nabood in fn to ejra mikonam to bere bar asase id snippet ro  begire
                   this.props.fetchOneSnippetById(activeSnippet)
                   return(
                       <h1>
                            Loading...
                        </h1>
                   )

        }
        console.log(snippet)
        let title = snippet.title;
        let keywords = snippet.keywords;
        let content = snippet.content;
        return (
            <div>
                <NavLink snippet={snippet} exact to={`/`}> Home
                </NavLink>

                <h1>
                    {title}
                </h1>
                <h3>
                    {keywords}
                </h3>
                <p>
                    {content}
                </p>
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SnippetPage);
