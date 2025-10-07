import React from 'react'
import logo from '../../assets/cute-calendar-sticker-free-png-4225752480.png'

function NavBar()
{
    return (
        <nav>
            <img className="logo" src={logo} alt="Calendar Logo"/>
            <h1>Calendify</h1>
            <ul className="nav_links">
                <li>Home</li>
                <li>Room Booking</li>
                <li>Events</li>
                <li>Attendance</li>
            </ul>
            <button className="CTA">Contact</button>
        </nav>
    )
}

export default NavBar
