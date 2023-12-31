import React from "react";
import { Link } from "react-router-dom";

// import Realbg from '../assets/res/Real numbers (8).png'

import '../css/Card.css'

export default function Card({cardTitle, cardThumb, id}){
    return(
        <Link to={`view/${id}`} className="card-container">
            <div className="card-content-container">
                <div className="card-image-container">
                    <img src={cardThumb} alt="" />
                </div>
                <div className="card-title-container">
                {cardTitle}
                </div>
            </div>
            <div className="card-overlay"></div>
        </Link>
    )
}