import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import FilteredPage from './Components/FilteredPage/FilteredPage'

const App = () => {
  return (
    <section className='App'>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/filtered' element={<FilteredPage />} />
      </Routes>
    </section>
  )
}

export default App
