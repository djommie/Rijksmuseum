import React from 'react'

function PageButtons (props) {
    return(
        <div className={`page-buttons-container ${props.showNextBtn || props.showPrevBtn ? '' : 'hide'}`}>
            <button
                className={
                    `nav-button 
                    prev-button
                    ${props.showPrevBtn ? 'show' : 'hide'}
                    ${props.loading ? 'greyed-out' : ''}
                    `}
                onClick={props.handlePrevClick}
            >
                &lt;
            </button>
            <button
                className={
                    `nav-button
                    next-button
                    ${props.showNextBtn ? 'show' : 'hide'}
                    ${props.loading ? 'greyed-out' : ''}
                    `}
                onClick={props.handleNextClick}
            >
            &gt;
            </button>
        </div>
    )
}

export default PageButtons