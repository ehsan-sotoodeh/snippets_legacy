import React,{Component} from 'react'
import {connect } from 'react-redux'
import {fetchMySnippets , searchSnippets ,bookmarkSnippet ,unBookmarkSnippet} from '../store/actions'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark,faShareAlt } from '@fortawesome/free-solid-svg-icons'; 


const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        fetchMySnippets(){
            dispatch(fetchMySnippets())
        },
        searchSnippets(term){
            dispatch(searchSnippets(term))
        },
        bookmarkSnippet(snippetId){
            dispatch(bookmarkSnippet(snippetId))

        },
        unBookmarkSnippet(snippetId){
            dispatch(unBookmarkSnippet(snippetId))

        }
    }
}


class SnippetCard extends Component{
    constructor(props){
        super(props);

    }

    bookmarkToggle = () =>{
        console.log(this.props.snippet);
        if(this.props.snippet.bookmarkId){
            // already bookmarked -> unBookmark it
            this.props.unBookmarkSnippet(this.props.snippet.id);
        }else{
            // bookmark snippet;
            this.props.bookmarkSnippet(this.props.snippet.id);
        }
        
    }

    render(){
        const snippet = this.props.snippet;
        let keywordsJsx = snippet.keywords.split(" ").map((keyword,index) =>{
            return(
                <span key={"badge-pill" + index} className="fontSize07 mx-1 padding05 badge badge-pill badge-success">{keyword}</span>
    
            )
        });
        const bookmarkedClass = (snippet.bookmarkId)? "text-primary" : "text-secondary";
        return (
            <div className="card snippetCard  col-12 ml-2 my-3 " style={{ width: '90%' }}>

                    <div className="row ">
                        <div className="col-md-12 ">
                            <div className="card-body padding05" >
                            <NavLink snippet={snippet} exact to={
                                {
                                    pathname: "/snippet/" + snippet.id,
                                    snippet:{...snippet}
                                }
                                }>
                                    <div className="card-title d-flex justify-content-start">{snippet.title}</div>
                                </NavLink>
                                <hr/>
                                <div className="d-fle">
                                <div className="d-flex justify-content-start m-0">
                                    {keywordsJsx}
    
                                </div>
                                    <div className="d-flex justify-content-end m-0">
                                        <FontAwesomeIcon 
                                            onClick={this.bookmarkToggle}
                                            className={"fontSize12 mx-2 "+ bookmarkedClass} 
                                            icon={faBookmark} />
                                        <FontAwesomeIcon className="fontSize12 mx-2" icon={faShareAlt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(SnippetCard);

