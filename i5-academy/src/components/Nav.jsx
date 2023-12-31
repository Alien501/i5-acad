import React from 'react'


import '../css/Nav.css'

export default function Nav({isNavActive, onNavClick}) {
    return(
        <nav className="nav-container">
            <div className="nav-logo">I5 Academy</div>
            <div className={`nav-ham-container ${isNavActive?"active": ""}`} onClick={() => onNavClick()}>
                <div className="ham-line"></div>
                <div className="ham-line"></div>
            </div>
        </nav>
    )
}