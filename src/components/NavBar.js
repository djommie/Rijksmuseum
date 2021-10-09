import React from "react"
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

function NavBar() {

    return (
        <div className='navbar'>
            <Link to='/'>
                <img className='home-logo' src={logo}></img>
            </Link>
            <Link to='/route-planner' className='routeplanner-link'>
                <p >Routeplannert</p>
            </Link>
        </div>
    )
}

export default NavBar