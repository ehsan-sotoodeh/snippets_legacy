import React from 'react'
import { NavLink } from "react-router-dom";
import SingInSignOut from './SingInSignOut'
import addIcon from '../images/icons/add.svg'
import collection from '../images/icons/apps.svg'
import bookmark from '../images/icons/bookmark.svg'
import home from '../images/icons/home.svg'

const SidebarComponent = () => {
    return (
        <div className="sidebar h-100 px-0">
            <ul className="noBullet text-light">
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/`} >
                        <img className="NavIcon" src={home} />
                        <span className="fontSize07 mt-2" >Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/snippet/-1`} >
                        <img className="NavIcon" src={addIcon} />
                        <span className="fontSize07 mt-2 " >Add</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column justify-content-center "  exact to={`/mySnippets`} >
                        <img className="NavIcon" src={bookmark} />
                        <span className="fontSize07 mt-2 " >My Snippets</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/collections`} >
                        <img className="NavIcon" src={collection} />
                        <span className="fontSize07 mt-2" >Collection</span>
                    </NavLink>
                </li>
                <SingInSignOut  />

            </ul>

        </div>



    )
}


export default SidebarComponent
