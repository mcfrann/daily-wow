import './App.css'
import { useState, useEffect } from 'react'
// import { Link, Route } from 'react-router-dom'

const App = () => {
  const [todaysWow, setTodaysWow] = useState(/*fetch random wow*/)
  const [owenGraphich, setOwenGraphic] = useState(/*imported graphic */)

  return (
    <section className='App'>
      <div className='page-container'>
        <div className='owen-container'>
          {/* <img className='owen-graphich' src=imported graphich alt="owen graphic" />  */}
          {/*set state to image of owen w/ mouth closed. On click, state changes to mouth open, after timeout back to closed.*/}
        </div>
        <div className='about-container'>
          <h1 className='about-header'>about today's wow:</h1>
          <div className='about-text-container'>
            <p className='about-text'>
              Today's wow was featured in the movie 'Zoolander'. And other
              interesting things.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
