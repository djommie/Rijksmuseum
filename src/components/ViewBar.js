import React from "react"

function ViewBar( props ) {

    return (
        <div className='viewbar'>
            <p>{props.location}</p> <p>{props.longTitle}</p>
            <button className='remove-piece-btn' onClick={() => props.removePieceFromView(props.id)}>remove</button>
        </div>
    )
}

export default ViewBar