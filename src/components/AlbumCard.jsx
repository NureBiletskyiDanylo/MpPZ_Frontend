import { useNavigate } from 'react-router'
import albumImage from '/album-img.png'

function AlbumCard({ id, image, title, createdAt, pages }) {
  const navigate = useNavigate()
  return (
    <div className='album-card' onClick={() => navigate(`/album/${id}`)}>
      <div className='image-placeholder'>
        <img src={image ?? albumImage} alt='Album Image' className='album-img' />
      </div>
      <div className='album-info'>
        <h3>{title}</h3>
        <p>Date: {createdAt}</p>
        <p>{pages}</p>
      </div>
    </div>
  )
}

export default AlbumCard
