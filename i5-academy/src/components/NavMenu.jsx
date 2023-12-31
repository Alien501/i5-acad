import React from "react";

import '../css/Navmenu.css'
import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function NavMenu({isNavActive, setNow}){
    const navigate = useNavigate()
    const [links, setLinks] = useState(null)

    useEffect(() => {
        async function getCat() {
            const response = await fetch('http://localhost:3000/api/blogs/addc')
            const result = await response.json()
            if(response.ok){
                setLinks(result.map(curr => <Link className="nav-link" to={`/class?name=${curr.cat_name}`} onClick={handleClick} name={curr.cat_name}>{curr.cat_name}</Link>))
            }
        }
        getCat()
    }, [])

    function handleClick(event) {
        console.log('Clicked ' + event.target.name);
        navigate(`/class?name=${event.target.name}`)
        setNow(prev => event.target.name)
    }

    return(
        <div className={`nav-menu-container ${isNavActive?"active": ""}`}>
            <div className="nav-item-container">
                {links}
            </div>
        </div>
    )
}