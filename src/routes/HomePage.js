import React, { Component } from 'react'
import {connect } from 'react-redux'
import {fetchAllSnippets} from '../store/actions'
import SnippetCard from '../components/SnippetCard'


const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAllSnippets(){
            dispatch(fetchAllSnippets())
        }
    }
}

class HomePage extends Component {
    componentDidMount(){
        this.props.fetchAllSnippets();
    }
    render() {
        console.log(this.props.snippets);
        let snippetsJsx = this.props.snippets.map((snippet,index) =>{
            return(
                <SnippetCard key={"snippetCard" + index} snippet={snippet} />
            )
        })
        return (
            <div>
                <h1>
                    This is home Page
                </h1>
                {snippetsJsx}
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
