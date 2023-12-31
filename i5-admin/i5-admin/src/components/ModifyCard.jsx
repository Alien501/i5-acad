import React from "react";

import { Link } from "react-router-dom";

import '../css/ManageBlog.css'

export default function ModifyCard({bName, id}) {
    
    async function deleteBlog(event) {
        console.log(event.target.id);
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`,
        {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        }
        )
        if (response.ok) {
            alert('Deleted Successfully!')
        }else {
            alert('Not Deleted Successfully!')
        }
    }

    return(
        <div className="blog-card-container">
            <div className="blog-name">{bName}</div>
            <Link to={`edit/${id}`} className="blog-btn edt">Edit</Link>
            <button className="blog-btn del" id={id} onClick={deleteBlog}>Delete</button>
        </div>
    )
}