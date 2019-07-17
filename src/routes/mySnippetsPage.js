import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchMySnippets , searchSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'
import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets,
        userId : parseInt(cookies.get("user_id"))
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        fetchMySnippets(){
            dispatch(fetchMySnippets())
        },
        searchSnippets(term){
            dispatch(searchSnippets(term))

        }
    }
}



class mySnippetsPage extends Component {
    delayTimer;
    constructor(props){
        super(props);
        this.pageTitle = "My Snippets";
        this.state = {"searchKey" : ""}

    }

    componentDidMount(){
        this.props.fetchMySnippets();
    }




    render() {
        console.log("mySnippetsPage")

        let snippetsJsx = this.props.snippets.map((snippet,index) =>{
            return(
                <SnippetCard key={"snippetCard" + index} snippet={snippet} userId={this.props.userId} />
            )
        })
        return (
            <div className="fullHeightPage row m-0">
                <div className="sidebarColumn col-1 p-0">
                    <SidebarComponent />
                </div>
                <div className="col-11 p-0">
                    <NavbarComponent pageTitle={this.pageTitle} />

                        {snippetsJsx}

                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(mySnippetsPage);
