import React, {useEffect, useState} from 'react'

import '../src/App.css'

import CardViewPage from './Pages/cardViewPage'
import NavMenu from './components/NavMenu'
import Nav from './components/Nav'
import FAB from './components/FAB'
import Footer from './components/Footer'
import Card from './components/Card'
import SearchF from './components/SearchF'

function App() {

  const [isNavActive, setIsNavActive] = useState(false)
  const [isSearchCLicked, setIsSearchCLicked] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(null)

  useEffect(() => {
    async function fetchDataFromApi(){
      try {
        const response = await fetch('http://localhost:3000/api/blogs')
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(() => {
          const newCard = result.map(cardData => <Card cardTitle={cardData.POST_TITLE} cardThumb={cardData.POST_THUMB} id={cardData.POST_ID}/>)
          return newCard
        }, [])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
  fetchDataFromApi()}, [])

  function onFabClick(){
    setIsSearchCLicked(!isSearchCLicked)
  }

  function onNavClick() {
      setIsNavActive(!isNavActive)
  }


  return (
    <>
      <Nav isNavActive={isNavActive} onNavClick={onNavClick}/>
      <NavMenu isNavActive={isNavActive} setNow={setNow}/>
      <CardViewPage cards={data} title={'Home'} now={now}/>
      {/* <FAB onFabClick={onFabClick}/> */}
      {/* <SearchF showFab={isSearchCLicked}/> */}
      <Footer />
    </>
  )
}

export default App
