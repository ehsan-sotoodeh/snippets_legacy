import React ,{ Component } from 'react'
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import {connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faKey,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'  
import { faFacebook,faTwitter,faGooglePlus } from '@fortawesome/free-brands-svg-icons'  
require('dotenv').config()

const cookies = new Cookies();

const mapStateToProps = (state) =>{
    return {
        user : state.user
    }
}



const mapDispatchToProps = dispatch => {
    return{

    }
}
class  SingInSignOut extends Component {
    constructor(props){
        super(props);
        cookies.set('myCat', 'Pacman');

        console.log("cookies",cookies.getAll())
        this.state = {
            username: cookies.get('user_username'),
            profilePhoto: cookies.get('user_profile_photo'),
            token: cookies.get('auth_token')
         }
         console.log(this.state)
        this.handelLogin = this.handelLogin.bind(this);
    }
    

    handelLogin = (event)=>{
        let loginMethod = event.target.name;
        console.log(this.history)
        //this.props.history.push(":3000/");
        let res = window.open(process.env.REACT_APP_SERVER_ADDRESS+"/auth/google", "_blank");
        console.log(res);
        //window.location.replace("http://localhost:4000/auth/google");
        setInterval(()=>{
            console.log(res.closed);
            if(res.closed){
                //window.location.reload();
            }

        },1000)
    }
    handelLogout = ()=>{
        window.location.replace( process.env.REACT_APP_SERVER_ADDRESS+ "/auth/logout");

    }

    render(){
        if(this.state.username){
            return (
                <div>
                    <ProfileComponent 
                        profilePhoto={this.state.profilePhoto}
                        username={this.state.username}
                        handelLogout = {this.handelLogout}
                    />
                    <span className="fontSize08 p-0 m-0 ">Profile</span>

                </div>

            )
        }else{
            return(
                <div>
                    <LoginComponent handelLogin={this.handelLogin} />
                    <span className="fontSize08 p-0 m-0 ">LogIn</span>
                
                </div>

            )
        }

    }




    

};

function ProfileComponent({profilePhoto,username,handelLogout}){
    return (
        <div>
            <Dropdown alignRight className="mt-4" >
                <Dropdown.Toggle size="sm" className="noBackground profilePhotoContainer border-0 p-0 m-0" variant="info" direction="up" id="dropdown-basic">
                    <img className="profilePhoto fontSize12   rounded-circle "   src={profilePhoto} />
                    <div className="minibutton fontSize12 border border-light  rounded-circle "   ></div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="loginDropDown p-0"  > 
                    <Dropdown.Item className=""   >
                    <div className="" onFocus={()=>{alert()}}>
                        <div className="profile-container col-md-12 col-sm-12 text-center">
                                <img src={profilePhoto} alt="" className="header-avatar" />
                                <div className="header-fullname font-weight-bold">{username}</div>              
                        </div>
                    </div>            

                    </Dropdown.Item>

                    <Dropdown.Item className="bg-info text-light d-flex justify-content-center align-items-center" onClick={handelLogout} >
                        <FontAwesomeIcon icon={faSignOutAlt}   /> &nbsp;&nbsp;  Sing out 
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}

function LoginComponent({handelLogin}){
    return(
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FontAwesomeIcon icon={faKey} /> 
        </Dropdown.Toggle>
    
        <Dropdown.Menu className="loginDropDown p-0"  > 
            <Dropdown.Item className="googleLogin my-1"   name="google" onClick={handelLogin.bind(this)}>
                <FontAwesomeIcon icon={faGooglePlus}   /> &nbsp;&nbsp;  Google 
            </Dropdown.Item>
            <Dropdown.Item className="facebookLogin  my-1"   name="facebook" onClick={handelLogin}>
                <FontAwesomeIcon icon={faFacebook}   /> &nbsp;&nbsp;  Facebook 
            </Dropdown.Item>
            <Dropdown.Item className="twitterLogin my-1" name="twitter" onClick={handelLogin}>
                <FontAwesomeIcon icon={faTwitter}   /> &nbsp;&nbsp;  Twitter
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SingInSignOut));


