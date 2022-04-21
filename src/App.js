import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import FilteredPage from './Components/FilteredPage/FilteredPage'
import owen from './images/owen-silent.jpg'
import search from './images/search.png'

const App = () => {
  const [todaysWow, setTodaysWow] = useState([])
  const [error, setError] = useState('')
  const [owenGraphic, setOwenGraphic] = useState('')
  const [filteredWows, setFilteredWows] = useState([])
  const [allWows, setAllWows] = useState([])
  const [header, setHeader] = useState('Your Daily Wow')
  const [page, setPage] = useState('home')

  useEffect(() => {
    fetchRandom()
    fetchAll()
  }, [])

  const start = () => {
    const audio = new Audio(todaysWow.audio)
    audio.play()
  }

  const fetchRandom = () => {
    return fetch('https://owen-wilson-wow-api.herokuapp.com/wows/random')
      .then((res) => {
        if (!res.ok) {
          setError('Wow. Nothing is here.')
        } else {
          return res.json()
        }
      })
      .then((wow) => {
        const randomWow = {
          id: Date.now(),
          movie: wow[0].movie,
          year: wow[0].year,
          director: wow[0].director,
          character: wow[0].character,
          timestamp: wow[0].timestamp,
          full_line: wow[0].full_line,
          current_wow_in_movie: wow[0].current_wow_in_movie,
          total_wows_in_movie: wow[0].total_wows_in_movie,
          audio: wow[0].audio
        }
        setTodaysWow((previousWow) => randomWow)
      })
  }

  const fetchAll = () => {
    return fetch('https://owen-wilson-wow-api.herokuapp.com/wows/ordered/0-90')
      .then((response) => response.json())
      .then((movies) => {
        setAllWows((previousMovies) => movies)
      })
      .catch((error) => setError('Wow.There are no movies.'))
  }

  const findWow = () => {
    const searchInput = document.querySelector('.search').value.toString()
    if (!searchInput) {
      alert('please insert an Owen Wilson movie')
    } else {
      setFilteredWows(allWows.filter((movie) => movie.movie == searchInput))
      setPage('filtered')
    }
  }

  return (
    <section className='App'>
      <div className='page-container'>
        <div className='owen-container'>
          <img
            className='owen-graphic'
            src={owen}
            alt='owen graphic'
            onClick={start}
          />
          {/*set state to image of owen w/ mouth closed. On click, state changes to mouth open, after timeout back to closed.*/}
        </div>
        <div className='about-container'>
          <div className='top-nav'>
            <input
              className='search'
              type='text'
              placeholder='wows by movie'
            ></input>
            <img
              className='search-img'
              src={search}
              alt='search icon'
              onClick={findWow}
            />
          </div>
          <div className='about-windows'>
            <h1 className='about-header'>{header}</h1>
            {page === 'home' ? (
              <HomePage path='/' todaysWow={todaysWow} error={error} />
            ) : (
              <FilteredPage path='/filtered' filteredWows={filteredWows} />
            )}
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path='/' element={HomePage} />
        <Route path='/filtered' element={FilteredPage} />
      </Routes>
    </section>
  )
}

export default App
