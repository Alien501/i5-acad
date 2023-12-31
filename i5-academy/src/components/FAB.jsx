import React from "react";

import '../css/FAB.css'

export default function FAB({onFabClick}) {
    return(
        <div className="fab-container" onClick={onFabClick} style={
            {
                borderRadius:`${onFabClick?"50%":"25%"}`
            }}>
            <div className="fab-icon-container material-symbols-outlined">
                mystery
            </div>
        </div>
    )
}