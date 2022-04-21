import owen from '../../images/owen-silent.jpg'
import like from '../../images/like.png'
import search from '../../images/search.png'
import Sound from 'react-sound'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilteredPage from '../FilteredPage/FilteredPage'
import './HomePage.css'

const HomePage = () => {
  const [todaysWow, setTodaysWow] = useState([])
  const [error, setError] = useState('')
  const [owenGraphic, setOwenGraphic] = useState('')
  const [filteredWows, setFilteredWows] = useState([])
  const [allWows, setAllWows] = useState([])

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
    }
    console.log(searchInput)
    console.log(filteredWows)
  }

  return (
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
          <Link to='/filtered'>
            <img
              className='search-img'
              src={search}
              alt='search icon'
              onClick={findWow}
            />
          </Link>
        </div>
        <div className='about-windows'>
          <h1 className='about-header'>Your Daily Wow</h1>
          <div className='about-text-container'>
            {todaysWow !== [] && !error ? (
              <>
                <p className='about-text'>
                  Today's wow was featured in the movie {todaysWow.movie},
                  directed by {todaysWow.director} in {todaysWow.year}. Owen
                  Wilson plays {todaysWow.character} and says 'wow' a total of{' '}
                  {todaysWow.total_wows_in_movie} times throughout the entire
                  duration of the film. This particular 'wow' occurs at{' '}
                  {todaysWow.timestamp} of the movie.
                  <br />
                  <br />
                  Full line: "{todaysWow.full_line}"
                  <br />
                  <br />
                  Click on Owen to hear it!
                </p>
              </>
            ) : todaysWow === [] && error ? (
              <p className='about-text'>{error}</p>
            ) : (
              <p className='about-text'>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
