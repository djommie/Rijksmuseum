import React, { useEffect, useState } from "react"


function PieceDetails({ objectNumber, webImageUrl, addPieceToView}) {

    const API_KEY = 'zZD0atBG'
    const detailsApi = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${API_KEY}`
    
    const [data, setData] = useState([])

    async function getData() {
        try{
            const response = await fetch(detailsApi)
            const rawData = await response.json()
            const data = rawData.artObject 

            setData(data)
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => getData(), [])

    const {
        id,
        principalOrFirstMaker,
        longTitle, 
        title, 
        plaqueDescriptionDutch, 
        materials, 
        techniques, 
        productionPlaces, 
        location } = data

    return (
        <div className='piecedetails-container'>
            <h2 className='piecedetails-title'>{longTitle}</h2>
            <div className='piecedetails-img-container'>
                <a href={webImageUrl} target='_blank'>
                    <img className='piecedetails-img' src={webImageUrl} alt={`${title}-image`}></img>
                </a>
            </div>
            <div className='piecedetails-text-container'>
                <p>{plaqueDescriptionDutch}</p>
                <ul>{materials ? 
                                materials.map(material => {
                                    return(
                                        <li>{material}</li>
                                    )
                                })
                                : ''    
                            }
                </ul>
                <p>{techniques}</p>
                <p>{productionPlaces}</p>
                <p>{location ? `Te zien: ${location}` : 'Currently not on display'}</p>
                {location ? <button onClick={() => addPieceToView(id, longTitle, location)}>Add Piece</button> : ''}
                
            </div>
        </div>
    )
}

export default PieceDetails

