import { useNavigate } from 'react-router'
import edit from '/edit.png'
import pageImage from '/album-img.png'

function PageCard({ imageSrc, date, title, onClick, pageId }) {
  const navigate = useNavigate()

  const handleEditClick = (e) => {
    e.stopPropagation()
    navigate(`/pages/edit/${pageId}`)
  }

  return (
    <div className='page-card' onClick={onClick}>
      <div className='image-placeholder'>
        <img src={imageSrc ?? pageImage} alt='Page Image' className='page-img' />
      </div>

      <div className='page-info'>
        <h3>{title}</h3>
        <p>{date}</p>
      </div>

      <div className='page-card-button'>
        <button className='button' onClick={handleEditClick}>
          <img src={edit} alt='Edit page' className='button-icon' />
          Edit page
        </button>
      </div>
    </div>
  )
}

export default PageCard
