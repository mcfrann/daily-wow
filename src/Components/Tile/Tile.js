import './Tile.css'

const Tile = ({ key, movie, currentWow, fullLine, audio }) => {
  const start = () => {
    const wow = new Audio(audio)
    wow.play()
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
