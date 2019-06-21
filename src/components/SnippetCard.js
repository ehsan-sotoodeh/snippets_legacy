import React from 'react'
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';


const SnippetCard = ({snippet}) => {
    let keywordsArray = snippet.keywords.split(" ");
    console.log(keywordsArray)
    let keywordsJsx = keywordsArray.map(keyword =>{
        return(
            <Badge className="fontSize08 mx-1 padding05 " pill variant="info ">
                {keyword}
            </Badge>
        )
    });

    return (

        <Card className="snippetCard col-12 ml-2 my-1" style={{ width: '90%' }}>
            <NavLink snippet={snippet} exact to={`/snippet/${snippet.id}`}>
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
