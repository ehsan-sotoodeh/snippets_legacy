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

    constructor(props){
        super(props);
        this.state = {editableMoudules : [] , editedVersion : {"title":"","keywords":"","content":""}}
        this.activeSnippet  = parseInt(this.props.match.params.snippetId);
        let snippet = this.props.snippets.filter(snippet =>{
                return snippet.id === this.activeSnippet;
            })[0]; 
        if(snippet === undefined){
            this.props.fetchOneSnippetById(this.activeSnippet);
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
        console.log(this.state);
        // let editedModules = this.state.editedModules.filter(obj =>{
        //     console.log(obj.moduleName,moduleName)
        //     if(obj.moduleName !== moduleName)
        //         return obj
        // });
        // console.log(editedModules)

        // this.setState({editedModules :[...editedModules,{"moduleName" : moduleName , "content" : moduleNewContent}]});
        // console.log(this.state.editedModules)


    }



    render() {
        let snippet = this.props.snippets.filter(snippet =>{
            return snippet.id === this.activeSnippet;
        })[0]; 


        if(snippet === undefined){
            return( <h1> Loading... </h1> )
        }
        

        let keywords = snippet.keywords;
        let content = snippet.content;

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
                <h1>
                <TitleModuleJsx 
                    title={snippet.title} 
                    isEditable={this.state.editableMoudules.includes('title')}
                    editedTitle = {this.state.editedVersion.title}
                    handelEdit = {this.handelEdit}
                     />

                </h1>

                <h3>
                <KeywordsModuleJsx 
                    keywords={snippet.keywords} 
                    isEditable={this.state.editableMoudules.includes('keywords')}
                    editedKeywords = {this.state.editedVersion.keywords}
                    handelEdit = {this.handelEdit}
                     />
                    
                </h3>
                <p>
                    <ContentModuleJsx 
                    content={snippet.content} 
                    isEditable={this.state.editableMoudules.includes('content')}
                    editedContent = {this.state.editedVersion.content}
                    handelEdit = {this.handelEdit}
                     />

                </p>
                    
                
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
        <h1>
            {content}
        </h1>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(SnippetPage);
