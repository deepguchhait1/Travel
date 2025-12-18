import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Delete from './pages/Delete'
import Update from './pages/Update'
import Detail from './pages/Detail'
export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/delete/:id' element={<Delete />} />
          <Route path='/edit/:id' element={<Update />} />
          <Route path='/details/:id' element={<Detail />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}
