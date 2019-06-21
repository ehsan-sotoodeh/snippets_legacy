import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets,fetchOneSnippetById,deleteSnippet,updateSnippet} from '../store/actions'
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
        console.log(inputModule)
        console.log(this.state)
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
        console.log("refreshSnippet",this.activeSnippet);
    }
    deleteSnippet = () =>{
        console.log("deleteSnippet",this.activeSnippet);
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
            <div>
                <NavLink exact to={`/`}> Home
                </NavLink>
                <br/>
                <hr/>
                <br/>
                <button onClick={()=>{this.enableEdit('title')}}> Edit title</button>
                <button onClick={()=>{this.enableEdit('keywords')}}> Edit keywords</button>
                <button onClick={()=>{this.enableEdit('content')}}> Edit content</button>
                <br/>
                <br/>
                
                <TitleModuleJsx 
                    title={this.snippet.title} 
                    isEditable={this.state.editableMoudules.includes('title')}
                    editedTitle = {this.state.editedVersion.title}
                    handelEdit = {this.handelEdit}
                     />


                <KeywordsModuleJsx 
                    keywords={this.snippet.keywords} 
                    isEditable={this.state.editableMoudules.includes('keywords')}
                    editedKeywords = {this.state.editedVersion.keywords}
                    handelEdit = {this.handelEdit}
                     />
                    
                    <ContentModuleJsx 
                    content={this.snippet.content} 
                    isEditable={this.state.editableMoudules.includes('content')}
                    editedContent = {this.state.editedVersion.content}
                    handelEdit = {this.handelEdit}
                     />

                <br/>
                <br/>
                <br/>
                <hr/>
                <button onClick={()=>{this.updateSnippet()}}>Update</button>
                <button onClick={()=>{this.refreshSnippet()}}>Refresh</button>
                <button onClick={()=>{this.deleteSnippet()}}>Delete</button>

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
    return(
        <h1>
            {keywords}
        </h1>
    )
}
function ContentModuleJsx({content,isEditable,handelEdit,editedContent}) {
    if(isEditable){
        let contentValue = (editedContent.length > 0 )? editedContent : content;
        return (
            <input type="text" name="content" value={contentValue} onChange={handelEdit}/>
        )
    }
    return(
        <p>
            {content}
        </p>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(SnippetPage);
