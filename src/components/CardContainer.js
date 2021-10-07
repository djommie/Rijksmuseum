import React from "react"
import Card from "./Card"


function CardContainer( props ) {

    let pieceList = ''

    if (Object.keys(props.state.results).length && props.state.results.length){
        pieceList = props.state.results.map((piece) => {
               return (
                   <Card 
                       pieceTitle={piece.title}
                       artist={piece.principalOrFirstMaker}
                       id={piece.id}
                       webImage={piece.webImage.url}
                   />
               )
           })
    }

    return (
        <div>
            {pieceList}
        </div>
    )
}

export default CardContainer