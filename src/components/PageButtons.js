import React from 'react'

function PageButtons (props) {
    return(
        <div className='page-buttons-container'>
            <button
                className={
                    `nav-button 
                    ${props.showPrevBtn ? 'show' : 'hide'}
                    ${props.loading ? 'greyed-out' : ''}
                    `}
                onClick={props.handlePrevClick}
            >
                Prev
            </button>
            <button
                className={
                    `nav-button 
                    ${props.showNextBtn ? 'show' : 'hide'}
                    ${props.loading ? 'greyed-out' : ''}
                    `}
                onClick={props.handleNextClick}
            >
                Next
            </button>
        </div>
    )
}

export default PageButtons