import React ,{ Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import {connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faKey } from '@fortawesome/free-solid-svg-icons'  
import { faFacebook,faTwitter,faGooglePlus } from '@fortawesome/free-brands-svg-icons'  


const mapStateToProps = (state) =>{
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // fetchOneSnippetById(activeSnippet){
        //     dispatch(fetchOneSnippetById(activeSnippet))
        // },
        // deleteSnippet(activeSnippet){
        //     dispatch(deleteSnippet(activeSnippet))
        // },
        // updateSnippet(snippet){
        //     dispatch(updateSnippet(snippet))
        // }
    }
}
class  SingInSignOut extends Component {

    handelLogin = (event)=>{
        let loginMethod = event.target.name;

        console.log(loginMethod);
    }

    render(){
        return(
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FontAwesomeIcon icon={faKey} /> &nbsp;&nbsp;Login
        </Dropdown.Toggle>
    
        <Dropdown.Menu className="loginDropDown p-0"  > 
            <Dropdown.Item className="googleLogin my-1"   name="google" onClick={this.handelLogin}>
                <FontAwesomeIcon icon={faGooglePlus}   /> &nbsp;&nbsp;  Google 
            </Dropdown.Item>
            <Dropdown.Item className="facebookLogin  my-1"   name="facebook" onClick={this.handelLogin}>
                <FontAwesomeIcon icon={faFacebook}   /> &nbsp;&nbsp;  Facebook 
            </Dropdown.Item>
            <Dropdown.Item className="twitterLogin my-1" name="twitter" onClick={this.handelLogin}>
                <FontAwesomeIcon icon={faTwitter}   /> &nbsp;&nbsp;  Twitter
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        );
    }




    

};

export default connect(mapStateToProps,mapDispatchToProps)(SingInSignOut);


