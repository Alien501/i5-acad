import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import '../css/BlogViewPage.css'


import WriteToUs from "../components/WriteToUs";
import CardViewPage from '../Pages/cardViewPage'
import NavMenu from '../components/NavMenu'
import Nav from '../components/Nav'
import FAB from '../components/FAB'
import Footer from '../components/Footer'
import Card from '../components/Card'
import SearchF from '../components/SearchF'

export default function BlogViewPage(){
    const [data, setData] = useState(null)
    const [isNavActive, setIsNavActive] = useState(false)
    const [isSearchCLicked, setIsSearchCLicked] = useState(false)
    const {id} = useParams()

    useEffect(
        () => {            
            async function fetchBlog() {
                const response = await fetch(`http://localhost:3000/api/blogs/${id}`)
        
                const result = await response.json()
        
                setData(result[0])
            }
            fetchBlog()
        },
        []
    )


    
  function onFabClick(){
    setIsSearchCLicked(!isSearchCLicked)
  }

  function onNavClick() {
      setIsNavActive(!isNavActive)
  }


    return(
        <>
            <Nav isNavActive={isNavActive} onNavClick={onNavClick}/>
            <NavMenu isNavActive={isNavActive}/>
            {data && <div className="blog-view-container">
                <div className="blog-text-container">
                    <div className="blog-title-container">
                        <div className="blog-image-container">
                            <img src={data.POST_THUMB} alt="Thumbnail" />
                        </div>
                        <div className="blog-head-text">
                            {data.POST_TITLE}
                        </div>
                    </div>
                    <hr />
                    <div dangerouslySetInnerHTML={{__html: data.POST_CONTENT}} className="blog-content-container">
                       {/* {data.POST_CONTENT} */}
                    </div>
                </div>
                <WriteToUs />
            </div>}

            <FAB onFabClick={onFabClick}/>
            <SearchF showFab={isSearchCLicked}/>
            <Footer />
        </>
    )
}