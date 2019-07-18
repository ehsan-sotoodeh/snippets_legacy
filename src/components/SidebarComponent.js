import React,{Component} from 'react'
import { NavLink } from "react-router-dom";
import SingInSignOut from './SingInSignOut'
import addIcon from '../images/icons/add.svg'
import collection from '../images/icons/apps.svg'
import bookmark from '../images/icons/bookmark.svg'
import home from '../images/icons/home.svg'
import logo from '../images/icons/lamp.svg'

const menuItems = [
    {"name": "Home","path" : "/", "icon" :home },
    {"name": "Add","path" : "/snippet/-1", "icon" :addIcon },
    {"name": "Favorites","path" : "/mySnippets", "icon" :bookmark },
    {"name": "Collection","path" : "/collections", "icon" :collection },
]

class SidebarComponent extends Component {
    
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

        return (
            <div className="sidebar h-100 px-0">
            <img className="logoIcon" src={logo} />
                <ul className="noBullet text-light">
                        {menuItemsJsx}
                    <SingInSignOut  />
    
                </ul>
    
            </div>
    
    
    
        )

    }
}



export default SidebarComponent
