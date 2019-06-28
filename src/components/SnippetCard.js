import React from 'react'
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';


const SnippetCard = ({snippet}) => {

    let keywordsJsx = snippet.keywords.split(" ").map((keyword,index) =>{
        return(
            <span key={"badge-pill" + index} className="fontSize07 mx-1 padding05 badge badge-pill badge-success">{keyword}</span>

        )
    });

    return (
        <Card className="snippetCard col-12 ml-2 my-1" style={{ width: '90%' }}>
            <NavLink snippet={snippet} exact to={
                {
                    pathname: "/snippet/" + snippet.id,
                    snippet:{...snippet}
                }
                }>
                <div className="row ">
                    <div className="col-md-1 bg-secondary">
                    </div>
                    <div className="col-md-11">
                        <Card.Body className="padding05" >
                            <Card.Title className="d-flex justify-content-start">{snippet.title}</Card.Title>
                            <Card.Text className="d-flex justify-content-start">
                                {keywordsJsx}

                            </Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </NavLink>
        </Card>
    )
}

export default SnippetCard
