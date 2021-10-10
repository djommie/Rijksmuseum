import React, { useEffect, useState } from "react"


function PieceDetails({ objectNumber, webImageUrl, addPieceToView}) {

    const API_KEY = 'zZD0atBG'
    const detailsApi = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${API_KEY}`
    
    const [data, setData] = useState([])
    
    
    useEffect(() => {
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
        getData()
    }, [])

    const {
        id,
        longTitle, 
        title, 
        plaqueDescriptionDutch, 
        materials, 
        techniques, 
        productionPlaces, 
        location } = data

        console.log([] ? 'true' : 'false')

    return (
        <div className='piecedetails-container'>
            <h2 className='piecedetails-title'>{longTitle}</h2>
            <div className='piecedetails-img-container'>
                <a href={webImageUrl} target='_blank' rel='noreferrer'>
                    <img className='piecedetails-img' src={webImageUrl} alt={title}></img>
                </a>
            </div>
            <div className='piecedetails-text-container'>
                <p className='piecedetails-plaque'>{plaqueDescriptionDutch}</p>

                <dl className='piecedetails-materials'>
                    {materials[0] ? <dt>materialen gebruikt voor dit stuk</dt> : ''}
                    {materials ? materials.map(material => {
                                    return(
                                        <dd>{material}</dd>
                                    )
                                })
                                : ''    
                            }
                </dl>

                <dl className='piecedetails-techniques'>
                    {techniques[0] ? <dt>Technieken gebruikt bij dit stuk</dt> : ''}
                    {techniques ? techniques.map(technique => {
                                    return(
                                        <dd>{technique}</dd>
                                    )
                                })
                                : ''    
                            }
                </dl>

                <p className='piecedetails-places'>{productionPlaces[0] ? `Dit stuk is gemaakt in ${productionPlaces}` : ''}</p>
                <p className='piecedetails-location'>{location ? `Dit stuk is momenteel te zien op  ${location}` : 'Staat momenteel niet ten toon'}</p>
                {location ? <button className='piecedetails-add-btn' onClick={() => addPieceToView(id, longTitle, location)}>Add Piece</button> : ''}
                
            </div>
        </div>
    )
}

export default PieceDetails

