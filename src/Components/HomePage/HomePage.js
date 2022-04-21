import './HomePage.css'

const HomePage = ({ todaysWow, error }) => {
  return (
    <div className='about-text-container'>
      {todaysWow !== [] && !error ? (
        <>
          <p className='about-text'>
            Today's wow was featured in the movie {todaysWow.movie}, directed by{' '}
            {todaysWow.director} in {todaysWow.year}. Owen Wilson plays{' '}
            {todaysWow.character}, a character who says 'wow' a total of{' '}
            {todaysWow.total_wows_in_movie} times throughout the entire duration
            of the film. This particular 'wow' occurs at {todaysWow.timestamp}{' '}
            of the movie.
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
  )
}

export default HomePage
