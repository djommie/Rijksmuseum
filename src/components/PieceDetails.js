import React, { useEffect, useState } from "react"


function PieceDetails({ objectNumber, webImageUrl}) {

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

    const {longTitle, title, plaqueDescriptionEnglish, materials, techniques, location } = data
    // const webImageUrl = data.webImage.url

    return (
        <content className='piecedetails-container'>
            <p className='piecedetails-title'>{longTitle}</p>
            <div className='piecedetails-img-container'>
                <a href={webImageUrl} target='_blank'>
                    <img className='piecedetails-img' src={webImageUrl} alt={`${title}-image`}></img>
                </a>
            </div>
        </content>
    )
}

export default PieceDetails

