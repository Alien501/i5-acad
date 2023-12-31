import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../css/ManageBlog.css'
import ModifyCard from "../components/ModifyCard";

export default function ManageBlog() {
    const [pageData, setPageData] = useState(null);

    useEffect(
        () => {
            async function getAllData(){
                try{
                    const res = await fetch('http://localhost:3000/api/blogs')

                    if(!res.ok){
                        console.log('Something went Wrong: ');
                    }else{
                        const result = await res.json()
                        console.log(result);
                        setPageData(
                            () => {
                                const newCard = result.map(cardData =>
                                <ModifyCard
                                    bName={cardData.POST_TITLE}
                                    id={cardData.POST_ID}
                                />
                                )
                                return newCard
                            }
                        )
                    }
                }catch(e){
                    console.log(e);
                }
            }
            getAllData()
        },
        []
    );

    return(
        <div className="manage-blog">
            <h1>Edit blogs</h1>
            <div className="blog-list-container">
                {pageData}
            </div>
        </div>
    )
}