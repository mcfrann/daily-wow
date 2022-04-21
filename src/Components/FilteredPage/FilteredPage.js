import './FilteredPage.css'
import Tile from '../Tile/Tile'

const FilteredPage = ({ filteredWows }) => {
  const filtered = filteredWows.map((wow) => (
    <Tile
      key={Date.now()}
      movie={wow.movie}
      currentWow={wow.current_wow_in_movie}
      audio={wow.audio}
    />
  ))

  return <div className='filtered-container'>{filtered}</div>
}

export default FilteredPage
