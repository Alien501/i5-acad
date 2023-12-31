import './App.css'
import CreateBlog from './pages/CreateBlogs'
import ManageBlog from './pages/ManageBlog'
import AddNewcat from './pages/AddNewCat'
import Men from './pages/Men'
import EditCard from './pages/EditCard'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="admin-container">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Men />} />
            <Route path='/create' element={ <CreateBlog /> } />
            <Route path='/manage' element={ <ManageBlog /> } />
            <Route path='/new' element={ <AddNewcat /> } />
            <Route path="manage/edit/:id" element={<EditCard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
