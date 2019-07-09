import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { NavLink } from "react-router-dom";

const SidebarComponent = () => {

    return (
        <div className="sidebar h-100 px-0">
            <ul className="noBullet text-light">
                <li>
                    <NavLink className="text-light"  exact to={`/snippet/-1`} >
                        <FontAwesomeIcon icon={faPlus} /><br/>
                        New
                    </NavLink>
                </li>
                <li>
                    <NavLink className=""  exact to={`/snippet/-1`} >
                        <FontAwesomeIcon icon={faPlus} />
                    </NavLink>
                </li>
                <li>
                    <NavLink className=""  exact to={`/snippet/-1`} >
                        <FontAwesomeIcon icon={faPlus} />
                    </NavLink>
                </li>
            </ul>

        </div>



    )
}


export default SidebarComponent
