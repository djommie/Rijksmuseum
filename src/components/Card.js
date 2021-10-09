import React from "react"
import { Link } from 'react-router-dom'

function Card({pieceTitle, objectNumber, webImage, altProp}) {

    return (
        <Link className="text-link" to={objectNumber}>
            <div className='card'>
                <div className='card-text-container'>
                    <p>{pieceTitle}</p>
                    <div className='card-details-btn'>
                        <h4>Details</h4>
                    </div>
                </div>
                <div className='card-img-container'>
                    <img className='card-img' src={webImage} alt={altProp}></img>
                </div>
            </div>
        </Link>
    )
}

export default Card