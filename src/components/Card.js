import React from "react"


function Card({pieceTitle, artist, id, webImage, altProp}) {

    return (
        <div className='card'>
            <div className='card-text-container'>
                <p>{pieceTitle},</p>
                <p>{artist}</p>
            </div>
            <div className='card-img-container'>
                <img className='card-img' src={webImage} alt={altProp}></img>
            </div>
        </div>
    )
}

export default Card