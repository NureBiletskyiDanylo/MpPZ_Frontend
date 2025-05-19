import { useNavigate } from 'react-router'
import albumImage from '/album-img.png' 

function AlbumCard() {
    const navigate = useNavigate()
    return(
        <div className='album-card' onClick={() => navigate('/album')}>
            <div className='image-placeholder'>
                <img src={albumImage} alt='Album Image' className='album-img' />
            </div>
            <div className='album-info'>
                <h3>Katherine Langford</h3>
                <p>Date: 14/02/2025</p>
                <p>Pages: 4</p>
            </div>
        </div>
    )
}

export default AlbumCard