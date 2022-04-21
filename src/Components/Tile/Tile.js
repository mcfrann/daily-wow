import './Tile.css'
import { useState } from 'react'
import owen from '../../images/owen-silent.jpg'
import owen2 from '../../images/owen-opening.jpg'
import owen3 from '../../images/owen-open.jpg'

const Tile = ({ key, movie, currentWow, fullLine, totalWow, audio }) => {
  // const [wow, setWow] = useState(audio)
  const [owenGraphic, setOwenGraphic] = useState(owen)

  const start = () => {
    const newWow = new Audio(audio)
    newWow.play()
    setTimeout(() => setOwenGraphic(owen2), 200)
    setTimeout(() => setOwenGraphic(owen3), 400)
    setTimeout(() => setOwenGraphic(owen2), 600)
    setTimeout(() => setOwenGraphic(owen), 800)
  }

  return (
    <div className='wow-tile' id={key}>
      <h1>
        Wow #{currentWow} of {movie}
      </h1>
      <p>The full line is: '{fullLine}'</p>
      <button className='play-wow' onClick={start}>
        play
      </button>
    </div>
  )
}

export default Tile
