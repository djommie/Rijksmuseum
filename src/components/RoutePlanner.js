import React from "react"

function RoutePlanner( props ) {

    const piecesToView = props.viewPieces.map((item, index) => {
        return (<div>
            <p>{item.longTitle}</p>
            <p>at: {item.location}</p>
            <button className='remove-piece-btn' onClick={() => props.removePieceFromView(item.id)}>remove</button>
            </div>
        )
    })

    return (
        <div className='routeplanner-container'>
            <h1>Routeplanner</h1>
            {piecesToView}
        </div>
    )
}

export default RoutePlanner