import React from "react"
import ViewBar from "./ViewBar"

function RoutePlanner( props ) {

    const cmp = (a, b) => (a > b) - (a < b)

    const sortedPieces = props.viewPieces.sort((a, b) => {
        return cmp(a.sortables[0], b.sortables[0]) || cmp(a.sortables[1], b.sortables[1])
      })

    const piecesToView = sortedPieces.map((item, index) => {
        return (
            <ViewBar 
                longTitle={item.longTitle}
                location={item.location}
                id={item.id}
                removePieceFromView={props.removePieceFromView}
                key={index}
            />
            )
    })

    return (
        <div className='routeplanner-container'>
            <h2 className='route-header'>Hieronder vindt u uw optimale route</h2>
                <div className={`route-text ${ props.viewPieces.length ? 'hide' : 'show'}`}>
                    <p>Er staan momenteel nog geen stukken in uw routeplanner.</p>
                    <p>Om stukken toe te voegen kunt u terug naar de zoekpagina door op het Rijksmuseum logo the klikken,</p>
                    <p>vervolgens kunt u gebruik maken van de dynamische zoekfunctie, op een stuk klikken en gebruik maken van de knop om het stuk toe te voegen.</p>
                </div>
            
            {piecesToView}
        </div>
    )
}

export default RoutePlanner