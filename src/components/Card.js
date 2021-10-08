import React from "react"
import { Link } from 'react-router-dom'

function Card({pieceTitle, artist, objectNumber, webImage, altProp}) {

    return (
        <div className='card'>
            <div className='card-text-container'>
                <p>{pieceTitle},</p>
                <p>{artist}</p>
                <Link className="text-link" to={objectNumber}>details</Link>
            </div>
            <div className='card-img-container'>
                <img className='card-img' src={webImage} alt={altProp}></img>
            </div>
        </div>
    )
}

export default Card