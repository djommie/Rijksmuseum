import React from "react"
import Card from "./Card"
import Home from "./Home"

function CardContainer( props ) {

    let pieceList = <Home />

    if (Object.keys(props.state.results).length && props.state.results.length){
        pieceList = props.state.results.map((piece, index) => {
               return (
                   <Card 
                        key={index}
                        pieceTitle={piece.longTitle}
                        objectNumber={piece.objectNumber}
                        webImage={piece.webImage.url}
                        altProp={`${piece.title}-image`}
                   />
               )
           })
    }

    return (
        <div className='card-container'>
            {pieceList}
        </div>
    )
}

export default CardContainer