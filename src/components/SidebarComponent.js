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

    }
    render(){
        console.log("sidebarActive: " ,this.props.sidebarActive);
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

        return (
            <>
                <div className="sidebarColumn d-none d-sm-block p-0">
                    <div className="sidebar d-none d-sm-block h-100 px-0 ">
                    <img className="logoIcon" src={logo} />
                        <ul className="noBullet text-light">
                                {menuItemsJsx}
                            <SingInSignOut  />
                        </ul>            
                    </div>
                </div>
                <div className="sidebarToggler d-block  d-sm-none" onClick={this.props.toggleSidebar}>
                    <img className="sidebarTogglerArrow " src={arrow} alt="arrow" /> 
                </div> 
            </>
        )

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SidebarComponent);

