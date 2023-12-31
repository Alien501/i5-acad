import React from "react";
import { Link } from "react-router-dom";

import '../css/Men.css'

export default function Men(){
    return(
        <div className="men-container">
            <div className="menu-item">
                <Link to='/create' className="mi">Create New Post</Link>
                <Link to='/manage' className="mi">Manage Posts</Link>
                <Link to='/new' className="mi">Add Category</Link>
            </div>
        </div>
    )
}