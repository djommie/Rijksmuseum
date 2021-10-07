import React from "react"


function Card({pieceTitle, artist, id, webImage, altProp}) {

    return (
        <div>
            <p>Title: {pieceTitle}</p>
            <p>Artist: {artist}</p>
            <p>id: {id}</p>
            <img src={webImage} alt={altProp} width="20%" height="20%"></img>
        </div>
    )
}

export default Card