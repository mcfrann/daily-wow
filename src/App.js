import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import FilteredPage from './Components/FilteredPage/FilteredPage'
import Owen from './Components/Owen/Owen'
import Oops from './Components/Oops/Oops'
import search from './images/search.png'

const App = () => {
  const [todaysWow, setTodaysWow] = useState([])
  const [error, setError] = useState('')
  const [filteredWows, setFilteredWows] = useState([])
  const [allWows, setAllWows] = useState([])
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRandom()
    fetchAll()
  }, [])

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
      .then((res) => {
        if (!res.ok) {
          setError('Wow. Nothing is here.')
        } else {
          return res.json()
        }
      })
      .then((movies) => {
        setAllWows((previousMovies) => movies)
      })
  }

  const handleClick = (e) => {
    e.preventDefault()
    const filtered = []
    for (let i = 0; i < allWows.length; i++) {
      if (input.toLowerCase() === allWows[i].movie.toLowerCase()) {
        filtered.push(allWows[i])
      }
    }
    if (!input) {
      alert('please insert an Owen Wilson movie')
    } else if (input && filtered.length === 0) {
      navigate('/oops')
      setInput('')
    } else if (input && filtered.length > 0) {
      setFilteredWows(filtered)
      setInput('')
      navigate('/filtered')
    }
  }

  const updateInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <section className='App'>
      <div className='page-container'>
        <Owen todaysWow={todaysWow} />
        <div className='about-container'>
          <div className='top-nav'>
            <form>
              <input
                className='search'
                value={input}
                onChange={updateInput}
                type='text'
                placeholder='wows by movie'
                required
              ></input>
            </form>
            <img
              className='search-img top'
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
              <Route path='/oops' element={<Oops />} />
            </Routes>
            <div className='bottom-nav'>
              <form>
                <input
                  className='search-bottom'
                  value={input}
                  onChange={updateInput}
                  type='text'
                  placeholder='wows by movie'
                  required
                ></input>
              </form>
              <img
                className='search-img bottom'
                src={search}
                alt='search icon'
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
