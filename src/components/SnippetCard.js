import React from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark,faShareAlt } from '@fortawesome/free-solid-svg-icons'; 


const SnippetCard = ({snippet}) => {

    let keywordsJsx = snippet.keywords.split(" ").map((keyword,index) =>{
        return(
            <span key={"badge-pill" + index} className="fontSize07 mx-1 padding05 badge badge-pill badge-success">{keyword}</span>

        )
    });

    return (
        <div className="card snippetCard mmmm col-12 ml-2 my-3 " style={{ width: '90%' }}>
            <NavLink snippet={snippet} exact to={
                {
                    pathname: "/snippet/" + snippet.id,
                    snippet:{...snippet}
                }
                }>
                <div className="row ">
                    <div className="col-md-12 ">
                        <div className="card-body padding05" >
                            <div className="card-title d-flex justify-content-start">{snippet.title}</div>
                            <hr/>
                            <div className="d-fle">
                            <div className="d-flex justify-content-start m-0">
                                {keywordsJsx}

                            </div>
                                <div className="d-flex justify-content-end m-0">
                                    <FontAwesomeIcon className="fontSize12 mx-2" icon={faBookmark} />
                                    <FontAwesomeIcon className="fontSize12 mx-2" icon={faShareAlt} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default SnippetCard
