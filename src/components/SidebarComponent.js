import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faPlus,faGlobe,faPenNib,faTh,faBookmark } from '@fortawesome/free-solid-svg-icons'; 
import { NavLink } from "react-router-dom";

const SidebarComponent = () => {
    console.log("SidebarComponent")
    return (
        <div className="sidebar h-100 px-0">
            <ul className="noBullet text-light">
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/`} >
                        <FontAwesomeIcon className="NavIcon" icon={faHome} />
                        <span className="fontSize07 " >Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/snippet/-1`} >
                        <FontAwesomeIcon className="NavIcon" icon={faPenNib } />
                        <span className="fontSize07 " >Add</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column justify-content-center "  exact to={`/mySnippets`} >
                        <FontAwesomeIcon className="NavIcon" icon={faBookmark} />
                        <span className="fontSize07 " >My Snippets</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className="sidebarMenuItem d-flex flex-column"  exact to={`/collections`} >
                        <FontAwesomeIcon className="NavIcon" icon={faTh} />
                        <span className="fontSize07" >Collection</span>
                    </NavLink>
                </li>
            </ul>

        </div>



    )
}


export default SidebarComponent
