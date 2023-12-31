import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ClassView from './classView.jsx'
import './index.css'

import BlogViewPage from './Pages/BlogViewPage.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/view/:id' element={<BlogViewPage/>}/>
          <Route path='/' element={<App/>}/>
          <Route path={`/class`} element={<ClassView />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
