import React from "react";

import '../css/WriteToUs.css'

export default function WriteToUs() {
    return(
        <div className="write-to-us-container">
            <div className="form-legend">Write to Us</div>
            <div className="ip-container">
                <input type="text" className="text-box-ip" placeholder="Name"/>
                <input type="email" className="text-box-ip" placeholder="Email"/>
                <input type="number" className="text-box-ip" placeholder="Phone No."/>
                <textarea type="text" className="text-box-ip" placeholder="Your thoughts"/>
                <button className="submit-feed">Submit</button>
            </div>
        </div>
    )
}