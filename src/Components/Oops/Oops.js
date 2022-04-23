import { useNavigate } from 'react-router-dom'
import './Oops.css'

const Oops = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <h1 className='about-header'>Oops</h1>
      <div className='oops-container'>
        <p className='oops-text'>
          Wow. This is embarassing. There's nothing here. Please try your search
          again.
        </p>
      </div>
      <button className='back-home' onClick={handleClick}>
        Back to Today's Wow
      </button>
    </>
  )
}

export default Oops
