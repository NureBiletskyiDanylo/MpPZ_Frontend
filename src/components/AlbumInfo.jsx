import albumImage from '/album-img.png'
import edit from '/edit.png'
import add from '/add.png'

function AlbumInfo({ onEditAlbum, onCreatePage}) {
    return(
        <div className='album-info-container'>
            <div className='image-placeholder'>
                <img src={albumImage} alt='Album Image' className='album-image' />
            </div>
            <div className='album-right'>
                <div className='album-info'>
                    <h3>Katherine Langford</h3>
                    <p>14/02/2024</p>
                </div>
                <div className='album-button'>
                    <button className='button' onClick={onEditAlbum}>
                        <img src={edit} alt='Edit album' className='button-icon' />
                        Edit album
                    </button>
                    <button className='button' onClick={onCreatePage}>
                        <img src={add} alt='Add page' className='button-icon' />
                        Add a new page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlbumInfo