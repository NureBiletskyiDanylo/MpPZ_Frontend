import albumImage from '/album-img.png'
import edit from '/edit.png'
import share from '/share.png'
import add from '/add.png'

function formatDate(isoDate) {
  try {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  } catch (err) {
    console.error(err);
  }
}

export function formatISODate(dateString) {
  try {
    const date = new Date(dateString);

    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (err) {
    console.error(err);
  }
}

function AlbumInfo({ onEditAlbum, onCreatePage, album, onShareAlbum }) {
  return (
    <div className='album-info-container'>
      <div className='image-placeholder'>
        <img src={album?.albumProfileImage.imageUrl ?? albumImage} alt='Album Image' className='album-image' />
      </div>
      <div className='album-right'>
        <div className='album-info'>
          <h3>{album?.title}</h3>
          <p>{formatDate(album?.childDateOfBirth)}</p>
          <p>Created: {formatISODate(album?.createdAt)}</p>
        </div>
        <div className='album-button'>
          <button className='button-share' onClick={onShareAlbum}>
            <img src={share} alt='Share album' className='button-icon' />
          </button>
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
