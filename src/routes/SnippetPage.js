import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets,fetchOneSnippetById,deleteSnippet,updateSnippet,saveSnippet} from '../store/actions'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUndo,faPen,faTimes,faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import RichEditorExample from '../components/RichEditorExample'


const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOneSnippetById(activeSnippet){
            return dispatch(fetchOneSnippetById(activeSnippet)).then(res=>{
                console.log(res)
            });
        },
        deleteSnippet(activeSnippet){
            dispatch(deleteSnippet(activeSnippet))
        },
        updateSnippet(snippet){
            dispatch(updateSnippet(snippet))
        },
        saveSnippet(snippet){
           return dispatch(saveSnippet(snippet)).then(res=>{
               return res;
            });
        }
    }
}
class SnippetPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorMessage : "",
            editableMoudules : ["title","keywords","content"] , 
            editedVersion : {"title":"","keywords":"","content":""}
        }
        console.log(this.props.location)
        //this.activeSnippet  = parseInt(this.props.match.params.snippetId);
        // check if it's a new snippet. -1 for new snippet
        // if(!this.activeSnippet === -1){
        //     this.snippet = this.props.snippets.filter(snippet =>{
        //         return snippet.id === this.activeSnippet;
        //     })[0]; 
        //     if(this.snippet === undefined){
        //         this.props.fetchOneSnippetById(this.activeSnippet)
        //     }
        // }
        //this.snippet = this.props.location.snippet;

      }

    componentDidMount() {
       
    }




    enableEdit = (inputModule) =>{
        let editedModules = [...this.state.editableMoudules,inputModule]
        this.setState({editableMoudules :editedModules});
    }
    handelEdit = (event) =>{

        let moduleName = event.target.name;
        let moduleNewContent = event.target.value;

        let editedVersion = this.state.editedVersion;
        editedVersion[moduleName] = moduleNewContent;
        this.setState({"editedVersion":editedVersion})
    }
    updateSnippet = () =>{
        if(!this.checkIfUpdateButtonIsActive()){
            this.setState({"errorMessage":"Title and Keywords fields can't be empty;"})
            return;
        }
        let editedVersion = this.state.editedVersion;
        let outputSnippet = {};
        outputSnippet["id"] = this.activeSnippet
        outputSnippet["title"] = (editedVersion.title.length > 0) ? editedVersion.title : this.snippet.title;
        outputSnippet["keywords"] = (editedVersion.keywords.length > 0) ? editedVersion.keywords : this.snippet.keywords;
        outputSnippet["content"] = (editedVersion.content.length > 0) ? editedVersion.content : this.snippet.content;
        //if id title keywords are empty show proper message
        this.props.updateSnippet(outputSnippet);
        this.setState({"editableMoudules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })

    }
    saveSnippet = () =>{
        if(!this.checkIfUpdateButtonIsActive()){
            this.setState({"errorMessage":"Title and Keywords fields can't be empty;"})
            return;
        }
        let editedVersion = this.state.editedVersion;
        let outputSnippet = {};
        outputSnippet["id"] = this.activeSnippet
        outputSnippet["title"] = (editedVersion.title.length > 0) ? editedVersion.title : this.snippet.title;
        outputSnippet["keywords"] = (editedVersion.keywords.length > 0) ? editedVersion.keywords : this.snippet.keywords;
        outputSnippet["content"] = (editedVersion.content.length > 0) ? editedVersion.content : this.snippet.content;
        //if id title keywords are empty show proper message
        let result = this.props.saveSnippet(outputSnippet);
        result.then(snippet=>{
            this.props.snippets.push(snippet)
            this.props.history.push(`/snippet/${snippet.id}`);

        });
        this.setState({"editableMoudules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })

    }
    refreshSnippet = () =>{
        this.setState({"editableMoudules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })
    }
    deleteSnippet = () =>{
        this.props.deleteSnippet(this.activeSnippet);
        this.props.history.push("/");

    }
    checkIfUpdateButtonIsActive = () =>  {
        const isKeywordsFieldEmpty = ((this.snippet.keywords.length === 0 ) 
          && (this.state.editedVersion.keywords.length === 0))? true:false;
      
        const isTitleFieldEmpty = ((this.snippet.title.length === 0 ) 
            && (this.state.editedVersion.title.length === 0))? true:false;
      
        const isUpdateButtonActive = (isKeywordsFieldEmpty || isTitleFieldEmpty)? false: true;
        return isUpdateButtonActive;
      
    }

    getSnippet = (snippetId) =>{
        //Get snippet from navlink;
        let snippet = this.props.location.snippet;
        if(snippet)
            return snippet;

        // Get snippet from Store;
        snippet = this.props.snippets.filter(snippet =>{
            return snippet.id === snippetId;
        })[0]; 
        if(snippet)
            return snippet;

        // Get snippet from Api;
            this.props.fetchOneSnippetById(snippetId)
    }

    render() {
        const activeSnippet  = parseInt(this.props.match.params.snippetId);
        const isNewSnippet = (activeSnippet === -1)? true:false;
        this.snippet = {};

        if(isNewSnippet){
            //its a new snippet
            this.snippet.id = -1
            this.snippet.title = ""
            this.snippet.keywords = ""
            this.snippet.content = ""

        }else{
            this.snippet = this.getSnippet(activeSnippet)
        }
        
        if(!this.snippet){
            return( <h1> Loading... </h1> )
        }


        let isUpdateButtonActive = this.checkIfUpdateButtonIsActive();

        const saveUpdateButtonJsx = (isNewSnippet)?(
            <button className={"btn btn-info  " + ((isUpdateButtonActive)? "":"disabled") }  onClick={()=>{this.saveSnippet()}}> <FontAwesomeIcon icon={faCloudUploadAlt} />&nbsp; &nbsp; Save </button>
        ):(
            <button className={"btn btn-info  " + ((isUpdateButtonActive)? "":"disabled") }  onClick={()=>{this.updateSnippet()}}> <FontAwesomeIcon icon={faCloudUploadAlt} />&nbsp; &nbsp; Update </button>
        );
        

        return (
            <div className="snippetPage">

                <div className=" mb-1  bg-dark ">
                    <div className="container d-flex bd-highlight ">
                        <div className="mr-auto p-2 bd-highlight">
                        <NavLink className="btn btn-primary" exact to={`/`}><FontAwesomeIcon icon={faHome} /> Home </NavLink>
                        </div>
                        <div className="p-2 bd-highlight">
                            {saveUpdateButtonJsx}
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
                    <p className={(isUpdateButtonActive)?"d-none":"fontSize08 text-danger"}>
                        {this.state.errorMessage}
                    </p>
                    <div className="editableElement position-relative">
                        <TitleModuleJsx 
                            title={this.snippet.title} 
                            isEditable={this.state.editableMoudules.includes('title')}
                            editedTitle = {this.state.editedVersion.title}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="editBtn btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('title')}}><FontAwesomeIcon icon={faPen} /></button>


                    </div>

                    <div className="editableElement position-relative">
                        <KeywordsModuleJsx 
                            keywords={this.snippet.keywords} 
                            isEditable={this.state.editableMoudules.includes('keywords')}
                            editedKeywords = {this.state.editedVersion.keywords}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="editBtn btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('keywords')}}><FontAwesomeIcon icon={faPen} /></button>

                    </div>
{/* 
                    <div className="editableElement">
                        <ContentModuleJsx 
                            content={this.snippet.content} 
                            isEditable={this.state.editableMoudules.includes('content')}
                            editedContent = {this.state.editedVersion.content}
                            handelEdit = {this.handelEdit}
                            />
                            <button className="btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('content')}}><FontAwesomeIcon icon={faPen} /></button>

                    </div> */}
                    

                </div>

                <div className="editableElement position-relative">

                    <RichEditorExample 
                        content={this.snippet.content} 
                        handelEdit={this.handelEdit}
                        textAlignment  = "left"
                        readOnly = {!this.state.editableMoudules.includes('content')}
                        />
                        <button className="editBtn btn btn-outline-success btn-sm showHideToggle" onClick={()=>{this.enableEdit('content')}}><FontAwesomeIcon icon={faPen} /></button>

                </div>
            </div>
        )
    }
}





function TitleModuleJsx({title,isEditable,handelEdit,editedTitle}) {
    if(isEditable){
        let titleValue = (editedTitle)? editedTitle : title;
        return (
            <div>
                <input type="text" name="title" className="w-100" 
                        placeholder={(titleValue.length > 0)? titleValue : "Enter your title"} 
                        value={titleValue} onChange={handelEdit}/>
                <br/>
                <br/>
            </div>
        )
    }
    return(
        <h2 className="position-relative">
            {title}
        </h2>
    )
    
}
function KeywordsModuleJsx({keywords,isEditable,handelEdit,editedKeywords}) {
    if(isEditable){
        let keywordsValue = (editedKeywords.length > 0 )? editedKeywords : keywords;
        return (
            <div>
                <input type="text" name="keywords" className="w-100"
                        placeholder={(keywordsValue.length > 0)? keywordsValue : "Enter your keywords/ separate with spaec"} 
                        value={keywordsValue} onChange={handelEdit}/>
                <br/>
                <br/>

            </div>
        )
    }
    let keywordsJsx = keywords.split(" ").map((keyword,index) =>{
        return(
            <span key={"badge-pill" + index} className="fontSize07 mx-1 padding05 badge badge-pill badge-success ">{keyword}</span>

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
