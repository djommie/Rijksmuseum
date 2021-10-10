import React from "react"

function Footer () {
    return(
        <div className='footer'>
            <ul className='footer-info'>
                <li>Contact</li>
                <li>Over Ons</li>
                <li>Niewsbrief</li>
                <li>Lorem</li>
                <li>Ipsum</li>
            </ul>
            <div className='footer-social-btns'>
                <i className="fa fa-twitter fa-4x icon tw-icon"></i>
                <i className="fa fa-facebook fa-4x icon fb-icon"></i>
                <i className="fa fa-instagram fa-4x icon in-icon"></i>
                <i className="fa fa-whatsapp fa-4x icon wa-icon"></i>
            </div>
        </div>
    )
}

export default Footer