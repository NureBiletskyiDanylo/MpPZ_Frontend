import { useState, useEffect } from 'react'
import profileIcon from '/profile-icon.png'
import edit from '/edit.png'
import add from '/add.png'
import { useAuth } from '../AuthContext'

function UserInfo({ onEditProfile, onCreateAlbum }) {
  const { user } = useAuth();

  const [albums, setAlbums] = useState(null);
  const [pfp, setPfp] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!albums) {
      fetch(`${API_URL}/api/Album/my-albums`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => setAlbums(data))
        .catch(err => {
          console.error("Failed to load albums", err);
          setAlbums([]); // fallback
        });
    }
    fetch(`${API_URL}/api/Account/${user.id}`)
      .then(res => res.json())
      .then(res => setPfp(res.profileImage))
      .catch(err => console.error(err));
  }, [albums, user]);

  return (
    <div className='user-info'>
      <div className='profile-info'>
        <div className='image-placeholder'>
          <img src={pfp ?? profileIcon} alt='MemoBaby logo' className='logo-image' />
        </div>
        <h3>{user.username}</h3>
        <div className='line' />
        <p>{user.email}</p>
        <p>Albums: {albums ? albums.length : 'No data'}</p>
      </div>
      <button className='button' onClick={onEditProfile}>
        <img src={edit} alt='Edit' className='button-icon' />
        Edit profile
      </button>
      <button className='button' onClick={onCreateAlbum}>
        <img src={add} alt='Add album' className='button-icon' />
        Create a new album
      </button>
    </div>
  )
}

export default UserInfo
