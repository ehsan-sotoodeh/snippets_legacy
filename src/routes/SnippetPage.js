import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets,fetchOneSnippetById,deleteSnippet,updateSnippet,saveSnippet} from '../store/actions'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUndo,faPen,faTimes,faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import RichEditorExample from '../components/RichEditorExample'
import Cookies from 'universal-cookie';
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'

const cookies = new Cookies();

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets,
        userId : parseInt(cookies.get("user_id"))
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOneSnippetById(activeSnippet){
            return dispatch(fetchOneSnippetById(activeSnippet)).then(res=>{
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
        this.pageTitle = "";

        this.activeSnippet  = parseInt(this.props.match.params.snippetId);
        this.isNewSnippet = (this.activeSnippet === -1)? true:false;

        const editableModules = (this.isNewSnippet)? ["title","keywords","content"]:[];
        this.state = {
            errorMessage : "",
            editableModules : [...editableModules] , 
            editedVersion : {"title":"","keywords":"","content":""}
        }
        this.snippet = {};

      }

    componentDidMount() {
       
    }




    enableEdit = (inputModule) =>{
        let editedModules = [...this.state.editableModules,inputModule]
        this.setState({editableModules :editedModules});
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
        outputSnippet["id"] = this.snippet.id;
        outputSnippet["title"] = (editedVersion.title.length > 0) ? editedVersion.title : this.snippet.title;
        outputSnippet["keywords"] = (editedVersion.keywords.length > 0) ? editedVersion.keywords : this.snippet.keywords;
        outputSnippet["content"] = (editedVersion.content.length > 0) ? editedVersion.content : this.snippet.content;
        //if id title keywords are empty show proper message
        this.props.updateSnippet(outputSnippet);
        this.setState({"editableModules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })

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
        this.setState({"editableModules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })
        let result = this.props.saveSnippet(outputSnippet);
        result.then(snippet=>{
            this.activeSnippet  = snippet.id;
            this.isNewSnippet = (this.activeSnippet === -1)? true:false;
            this.snippet.id = snippet.id;
            this.props.history.push(`/snippet/${snippet.id}`);

        });

    }
    refreshSnippet = () =>{
        this.setState({"editableModules":[], "editedVersion" :  {"title":"","keywords":"","content":""} })
    }
    deleteSnippet = () =>{
        this.props.deleteSnippet(this.snippet.id);
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


        if(this.isNewSnippet){
            //its a new snippet
            this.snippet.id = -1
            this.snippet.title = ""
            this.snippet.keywords = ""
            this.snippet.content = ""
            this.snippet.user = this.props.userId;
            

        }else{
            this.snippet = this.getSnippet(this.activeSnippet)
        }
        
        if(!this.snippet){
            return( <h1> Loading... </h1> )
        }


        let isUpdateButtonActive = this.checkIfUpdateButtonIsActive();

        const isModifiable = (this.props.userId === this.snippet.user)?true:false;

        return (
            <div className="snippetPage fullHeightPage row m-0">
                <div className="sidebarColumn d-none d-sm-block p-0">
                    <SidebarComponent active="snippetPage" />
                </div>
                <div className="col p-0">
                    <div className={"mb-1  bg-light " + ((isModifiable)?"":" d-none")}  >
                        <div className="container d-flex bd-highlight justify-content-end ">
                                <SnippetModifyButtons 
                                    saveSnippet={this.saveSnippet}
                                    updateSnippet={this.updateSnippet}
                                    refreshSnippet={this.refreshSnippet}
                                    deleteSnippet={this.deleteSnippet}
                                    isNewSnippet={this.isNewSnippet}
                                    isUpdateButtonActive={isUpdateButtonActive}
                                    
                                    />
                        </div>
                    
                    </div>

                    <div className="mx-3">
                        <p className={(isUpdateButtonActive)?"d-none":"fontSize08 text-danger"}>
                            {this.state.errorMessage}
                        </p>
                        <div className="editableElement position-relative">
                            <TitleModuleJsx 
                                title={this.snippet.title} 
                                isEditable={this.state.editableModules.includes('title')}
                                editedTitle = {this.state.editedVersion.title}
                                handelEdit = {this.handelEdit}
                                />
                                <button className={"editBtn btn btn-outline-success btn-sm  " + ((isModifiable)?" showHideToggle ":"d-none")} onClick={()=>{this.enableEdit('title')}}><FontAwesomeIcon icon={faPen} /></button>


                        </div>

                        <div className="editableElement position-relative">
                            <KeywordsModuleJsx 
                                keywords={this.snippet.keywords} 
                                isEditable={this.state.editableModules.includes('keywords')}
                                editedKeywords = {this.state.editedVersion.keywords}
                                handelEdit = {this.handelEdit}
                                />
                                <button className={"editBtn btn btn-outline-success btn-sm  " + ((isModifiable)?" showHideToggle ":"d-none")} onClick={()=>{this.enableEdit('keywords')}}><FontAwesomeIcon icon={faPen} /></button>

                        </div>

                        

                    </div>

                    <div className="editableElement position-relative">

                        <RichEditorExample 
                            content={this.snippet.content} 
                            handelEdit={this.handelEdit}
                            textAlignment  = "left"
                            readOnly = {!this.state.editableModules.includes('content')}
                            />
                            <button className={"editBtn btn btn-outline-success btn-sm  " + ((isModifiable)?" showHideToggle ":"d-none")} onClick={()=>{this.enableEdit('content')}}><FontAwesomeIcon icon={faPen} /></button>

                    </div>
                </div>
            </div>
        )
    }
}


function SnippetModifyButtons({saveSnippet,updateSnippet,refreshSnippet,deleteSnippet,isNewSnippet,isUpdateButtonActive}){
    const saveUpdateButtonJsx = (isNewSnippet)?(
        <button className={"btn btn-info  " + ((isUpdateButtonActive)? "":"disabled") }  onClick={()=>{saveSnippet()}}> <FontAwesomeIcon icon={faCloudUploadAlt} />&nbsp; &nbsp; Save </button>
    ):(
        <button className={"btn btn-info  " + ((isUpdateButtonActive)? "":"disabled") }  onClick={()=>{updateSnippet()}}> <FontAwesomeIcon icon={faCloudUploadAlt} />&nbsp; &nbsp; Update </button>
    );
    return(
        <>
        <div className="p-2 bd-highlight">
            {saveUpdateButtonJsx}
        </div>
        <div className="p-2 bd-highlight">
            <button className="btn btn-warning" onClick={()=>{refreshSnippet()}}> <FontAwesomeIcon icon={faUndo} />&nbsp; &nbsp;  Reset</button> 
        </div>
        <div className="p-2 bd-highlight">
            <button className="btn btn-danger " onClick={()=>{deleteSnippet()}} > <FontAwesomeIcon icon={faTimes} />&nbsp; &nbsp;  Delete</button>
        </div>
        </>
    )
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


export default connect(mapStateToProps,mapDispatchToProps)(SnippetPage);
