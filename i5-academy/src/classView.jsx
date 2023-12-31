import React, {useEffect, useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'


import '../src/App.css'

import CardViewPage from './Pages/cardViewPage'
import NavMenu from './components/NavMenu'
import Nav from './components/Nav'
import FAB from './components/FAB'
import Footer from './components/Footer'
import Card from './components/Card'
import SearchF from './components/SearchF'

function ClassView({now}) {

  const [isNavActive, setIsNavActive] = useState(false)
  const [isSearchCLicked, setIsSearchCLicked] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams()
  useEffect(() => {
    async function fetchDataFromApi(){
      const response = await fetch(`http://localhost:3000/api/blogs/class?c=${searchParams.get('name')}`, 
      )
      const result = await response.json()
      setData(() => {
        const newCard = result.map(cardData => <Card cardTitle={cardData.POST_TITLE} cardThumb={cardData.POST_THUMB} id={cardData.POST_ID}/>)
        return newCard
      })
    }
    fetchDataFromApi()}, [now])

  function onFabClick(){
    setIsSearchCLicked(!isSearchCLicked)
  }

  function onNavClick() {
      setIsNavActive(!isNavActive)
  }


  return (
    <>
      <Nav isNavActive={isNavActive} onNavClick={onNavClick}/>
      <NavMenu isNavActive={isNavActive}/>
      <CardViewPage cards={data} title={searchParams.get('name')}/>
      {/* <FAB onFabClick={onFabClick}/> */}
      {/* <SearchF showFab={isSearchCLicked}/> */}
      <Footer />
    </>
  )
}

export default ClassView
