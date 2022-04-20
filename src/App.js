import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [todaysWow, setTodaysWow] = useState(/*fetch random wow*/)
  const [owenGraphic, setOwenGraphic] = useState(/*imported graphic */)

  return (
    <section className='App'>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
      </Routes>
    </section>
  )
}

export default App
