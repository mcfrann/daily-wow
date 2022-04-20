import owen from '../../images/owen-silent.jpg'
import like from '../../images/like.png'
import search from '../../images/search.png'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className='page-container'>
      <div className='owen-container'>
        <img className='owen-graphic' src={owen} alt='owen graphic' />
        {/*set state to image of owen w/ mouth closed. On click, state changes to mouth open, after timeout back to closed.*/}
      </div>
      <div className='about-container'>
        <div className='top-nav'>
          <input
            className='search'
            type='text'
            placeholder='wows by movie'
          ></input>
          <img className='search-img' src={search} alt='search icon' />
          <img className='like' src={like} alt='favorites page' />
        </div>
        <div className='about-windows'>
          <h1 className='about-header'>Your Daily Wow</h1>
          <div className='about-text-container'>
            <p className='about-text'>
              Today's wow was featured in the movie 'Zoolander'. And other
              interesting things.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
