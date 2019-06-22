import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets,fetchOneSnippetById,deleteSnippet,updateSnippet} from '../store/actions'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUndo,faPen,faTimes,faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOneSnippetById(activeSnippet){
            dispatch(fetchOneSnippetById(activeSnippet))
        },
        deleteSnippet(activeSnippet){
            dispatch(deleteSnippet(activeSnippet))
        },
        updateSnippet(snippet){
            dispatch(updateSnippet(snippet))
        }
    }
}
class SnippetPage extends Component {

    constructor(props){
        super(props);
        this.state = {editableMoudules : [] , editedVersion : {"title":"","keywords":"","content":""}}
        this.activeSnippet  = parseInt(this.props.match.params.snippetId);
        this.snippet = this.props.snippets.filter(snippet =>{
                return snippet.id === this.activeSnippet;
            })[0]; 
        if(this.snippet === undefined){
            this.props.fetchOneSnippetById(this.activeSnippet)
        }
      }

    componentDidMount() {
       
    }




    enableEdit = (inputModule) =>{
        let editedModules = [...this.state.editableMoudules,inputModule]
        this.setState({editableMoudules :editedModules});
    }
    handelEdit = (event) =>{
        console.log(event.target);

        let moduleName = event.target.name;
        let moduleNewContent = event.target.value;
        let editedVersion = this.state.editedVersion;
        editedVersion[moduleName] = moduleNewContent;
        this.setState({"editedVersion":editedVersion})
    }
    updateSnippet = () =>{
        let editedVersion = this.state.editedVersion;
        let outputSnippet = {};
        outputSnippet["id"] = this.activeSnippet
        outputSnippet["title"] = (editedVersion.title.length > 0) ? editedVersion.title : this.snippet.title;
        outputSnippet["keywords"] = (editedVersion.keywords.length > 0) ? editedVersion.keywords : this.snippet.keywords;
        outputSnippet["content"] = (editedVersion.content.length > 0) ? editedVersion.content : this.snippet.content;
        this.props.updateSnippet(outputSnippet);
        this.setState({"editableMoudules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })

    }
    refreshSnippet = () =>{
        this.setState({"editableMoudules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })
    }
    deleteSnippet = () =>{
        console.log("deleteSnippet")

        this.props.deleteSnippet(this.activeSnippet);
        this.props.history.push("/");

    }



    render() {
        console.log("render")
        this.snippet = this.props.snippets.filter(snippet =>{
            return snippet.id === this.activeSnippet;
        })[0]; 


        if(this.snippet === undefined){
            return( <h1> Loading... </h1> )
        }
        

        let keywords = this.snippet.keywords;
        let content = this.snippet.content;

        return (
            <div className="snippetPage">

                <div className="border-secondary border-bottom mb-1  ">
                    <div className="container d-flex bd-highlight ">
                        <div className="mr-auto p-2 bd-highlight">
                        <NavLink className="btn btn-primary" exact to={`/`}><FontAwesomeIcon icon={faHome} /> Home </NavLink>
                        </div>
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-info " onClick={()=>{this.updateSnippet()}}> <FontAwesomeIcon icon={faCloudUploadAlt} />&nbsp; &nbsp; Update </button>
                        </div>
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-warning" onClick={()=>{this.refreshSnippet()}}> <FontAwesomeIcon icon={faUndo} />&nbsp; &nbsp;  Reset</button> 
                        </div>
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-danger " onClick={()=>{this.deleteSnippet()}} > <FontAwesomeIcon icon={faTimes} />&nbsp; &nbsp;  Delete</button>
                        </div>
                    </div>
                
                </div>

                <div className="mx-3">
                    <div className="editableElement">
                        <TitleModuleJsx 
                            title={this.snippet.title} 
                            isEditable={this.state.editableMoudules.includes('title')}
                            editedTitle = {this.state.editedVersion.title}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('title')}}><FontAwesomeIcon icon={faPen} /></button>


                    </div>

                    <div className="editableElement">
                        <KeywordsModuleJsx 
                            keywords={this.snippet.keywords} 
                            isEditable={this.state.editableMoudules.includes('keywords')}
                            editedKeywords = {this.state.editedVersion.keywords}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('keywords')}}><FontAwesomeIcon icon={faPen} /></button>

                    </div>

                    <div className="editableElement">
                        <ContentModuleJsx 
                            content={this.snippet.content} 
                            isEditable={this.state.editableMoudules.includes('content')}
                            editedContent = {this.state.editedVersion.content}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('content')}}><FontAwesomeIcon icon={faPen} /></button>

                    </div>
                    

                </div>




            </div>
        )
    }
}

function TitleModuleJsx({title,isEditable,handelEdit,editedTitle}) {
    if(isEditable){
        let titleValue = (editedTitle.length > 0 )? editedTitle : title;
        return (
            <input type="text" name="title" value={titleValue} onChange={handelEdit}/>
        )
    }
    return(
        <h1>
            {title}
        </h1>
    )
    
}
function KeywordsModuleJsx({keywords,isEditable,handelEdit,editedKeywords}) {
    if(isEditable){
        let keywordsValue = (editedKeywords.length > 0 )? editedKeywords : keywords;
        return (
            <input type="text" name="keywords" value={keywordsValue} onChange={handelEdit}/>
        )
    }
    let keywordsJsx = keywords.split(" ").map((keyword,index) =>{
        return(
            <span key={"badge-pill" + index} className="fontSize08 mx-1 padding05 badge badge-pill badge-primary ">{keyword}</span>

        )
    });
    return(
        <h1>
            {keywordsJsx}
        </h1>
    )
}
function ContentModuleJsx({content,isEditable,handelEdit,editedContent}) {
    if(isEditable){
        let contentValue = (editedContent.length > 0 )? editedContent : content;
        return (
            <textarea  type="text" name="content"  onChange={handelEdit}>{contentValue}</textarea>
        )
    }
    return(
        <p>
            {content}
        </p>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(SnippetPage);
