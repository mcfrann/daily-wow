import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import FilteredPage from './Components/FilteredPage/FilteredPage'
import owen from './images/owen-silent.jpg'
import owen2 from './images/owen-opening.jpg'
import owen3 from './images/owen-open.jpg'
import search from './images/search.png'
import Search from './Components/Search/Search'

const App = () => {
  const [todaysWow, setTodaysWow] = useState([])
  const [error, setError] = useState('')
  const [owenGraphic, setOwenGraphic] = useState(owen)
  const [filteredWows, setFilteredWows] = useState([])
  const [allWows, setAllWows] = useState([])
  const [header, setHeader] = useState('Your Daily Wow')
  const [page, setPage] = useState('home')
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRandom()
    fetchAll()
  }, [])

  const start = () => {
    const audio = new Audio(todaysWow.audio)
    audio.play()
    setTimeout(() => setOwenGraphic(owen2), 200)
    setTimeout(() => setOwenGraphic(owen3), 400)
    setTimeout(() => setOwenGraphic(owen2), 600)
    setTimeout(() => setOwenGraphic(owen), 800)
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

  const handleClick = (e) => {
    e.preventDefault()
    console.log(filteredWows)
    const filter = allWows.filter(
      (movie) => movie.movie.toLowerCase() == input.toLowerCase()
    )
    if (!input) {
      alert('please insert an Owen Wilson movie')
    } else {
      setFilteredWows(filter)
    }
    setHeader(`wows in ${input}`)
    setInput('')
    navigate('/filtered')
  }

  const updateInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <section className='App'>
      <div className='page-container'>
        <div className='owen-container'>
          <img
            className='owen-graphic'
            src={owenGraphic}
            alt='owen graphic'
            onClick={start}
          />
        </div>
        <div className='about-container'>
          <div className='top-nav'>
            <input
              className='search'
              value={input}
              onChange={updateInput}
              type='text'
              placeholder='wows by movie'
            ></input>
            <img
              className='search-img'
              src={search}
              alt='search icon'
              onClick={handleClick}
            />
          </div>
          <div className='about-windows'>
            <Routes>
              <Route
                exact
                path='/'
                element={<HomePage todaysWow={todaysWow} error={error} />}
              />
              <Route
                path='/filtered'
                element={<FilteredPage filteredWows={filteredWows} />}
              />
            </Routes>
            {/* {page === 'home' ? (
              <HomePage path='/' todaysWow={todaysWow} error={error} />
            ) : (
              <FilteredPage path='/filtered' filteredWows={filteredWows} />
            )} */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
