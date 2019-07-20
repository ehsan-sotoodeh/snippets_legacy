import React,{Component} from 'react'
import {connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import SingInSignOut from './SingInSignOut'
import addIcon from '../images/icons/add.svg'
import collection from '../images/icons/apps.svg'
import bookmark from '../images/icons/bookmark.svg'
import home from '../images/icons/home.svg'
import logo from '../images/icons/lamp.svg'
import arrow from '../images/icons/arrow.svg'
import {toggleSidebar} from '../store/actions'

const menuItems = [
    {"name": "Home","path" : "/", "icon" :home },
    {"name": "Add","path" : "/snippet/-1", "icon" :addIcon },
    {"name": "Favorites","path" : "/mySnippets", "icon" :bookmark },
    {"name": "Collection","path" : "/collections", "icon" :collection },
]



const mapStateToProps = (state) =>{
    return {
        sidebarActive : state.view.sidebarActive,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleSidebar(){
            dispatch(toggleSidebar())
        }
    }
}



class SidebarComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCloseSidebarAnimation : false
        }
    }

    showCloseAnimation = () =>{
        this.setState({"showCloseSidebarAnimation":true});
    }

    render(){
        const menuItemsJsx = menuItems.map((menuItem,index) =>{
            return(
                <li key={"menuItem" + index}>
                    <NavLink className="sidebarMenuItem d-flex flex-column mt-3"  exact to={menuItem.path} >
                        <img className="NavIcon" src={menuItem.icon} />
                        <span className="fontSize07 mt-2" >{menuItem.name}</span>
                    </NavLink>
                </li>
            )
        });
        const sidebarActive = this.props.sidebarActive;
        const closeSidebarClass = (this.state.showCloseSidebarAnimation)? " slide-left  " : " d-none d-sm-block ";
        const toggleIconAnimationClass = (sidebarActive)? " down-right " : " up-left "
        return (
            <>
                <div className={"sidebarColumn p-0" + ((sidebarActive)?" slide-right ": closeSidebarClass) } >
                    <div className={"sidebar h-100 px-0 " + ((sidebarActive)?"":" d-none d-sm-block ") } >
                    <img className="logoIcon d-none d-sm-block" src={logo} />
                        <ul className="noBullet text-light">
                                {menuItemsJsx}
                            <SingInSignOut  />
                        </ul>            
                    </div>
                </div>
                <div className="sidebarToggler d-block  d-sm-none" onClick={()=>{this.props.toggleSidebar(); this.showCloseAnimation()}}>
                    <img className={"sidebarTogglerArrow " + toggleIconAnimationClass} src={arrow} alt="arrow" /> 
                </div> 
            </>
        )

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SidebarComponent);

