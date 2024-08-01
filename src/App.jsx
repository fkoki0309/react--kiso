import { useState } from 'react'
import './App.css'
import { ThreadList } from './ThreadList'
import Header from './Header'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import MakeThread from './MakeThread'
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/threads/new" element={<MakeThread />} />
          </Routes>
        </BrowserRouter>
      </div>






    </>
  )
}

export default App
