import React from "react";

import '../css/PageTitle.css'

import headBg from '../assets/res/head-bg.jpg'

export default function PageTitle({title}) {
    return(
        <div className="page-title-container">
            <div className="page-title-bg-container">
                <img src={headBg} alt="" />
            </div>
            <div className="page-title">{title}</div>
        </div>
    )
}