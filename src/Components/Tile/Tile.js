import './Tile.css'

const Tile = ({ key, movie, currentWow, audio }) => {
  const number = ({ currentWow }) => {
    switch (currentWow.toString().split('').pop()) {
      case 1:
        return `1st`
      case 2:
        return `2nd`
      case 3:
        return `3rd`
      default:
        return `${currentWow}th`
    }
  }

  return (
    <div className='wow-tile' id={key}>
      <h1>{movie}</h1>
      <p>This is the {number} occurance of 'wow' in this film.</p>
      <button>play</button>
    </div>
  )
}

export default Tile
