import React from "react";

import '../css/SearchF.css'

export default function SearchF({showFab}) {

    return(
        <div className={`search-menu-container ${showFab?"active":""}`}>
            <input type="text" className="search-ip" placeholder="Search"/>
            <button className="submit-search">Search</button>
        </div>
    )
}