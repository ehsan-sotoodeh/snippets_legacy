import React from 'react'
import { NavLink } from "react-router-dom";


const SnippetCard = ({snippet}) => {
    console.log(snippet)
    return (
        <div>
            <NavLink snippet={snippet} exact to={`/snippet/${snippet.id}`}> 

                <h4>
                    {snippet.title}
                </h4>
                <h3>
                    {snippet.keywords}
                </h3>
                <hr/>
            </NavLink>
        </div>
    )
}

export default SnippetCard
