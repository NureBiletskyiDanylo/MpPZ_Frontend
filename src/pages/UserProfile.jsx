import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import LoggedHeader from '../components/LoggedHeader.jsx';
import UserInfo from '../components/UserInfo.jsx';
import EditProfileForm from '../components/EditProfileForm.jsx';
import CreateAlbumForm from '../components/CreateAlbumForm.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import '../assets/UserProfile.css';
import { useAuth } from '../AuthContext.jsx';

function UserProfile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;
  //TODO: move albums to some context of sorts?
  useEffect(() => {
    if (user?.token) {
      fetch(`${API_URL}/api/Album/my-albums`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => setAlbums(data))
        .catch(err => {
          console.error('Failed to fetch albums:', err);
          setAlbums([]); // fallback
        });
    }
  }, [user?.token]);

  const handleEditProfile = async (formData) => {
    setShowEditForm(false);
  };

  const handleCreateAlbum = async (formData) => {
    setShowAlbumForm(false);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <LoggedHeader />
      <div className='user-profile'>
        <UserInfo
          onEditProfile={() => setShowEditForm(true)}
          onCreateAlbum={() => setShowAlbumForm(true)}
        />

        <div className='album-list'>
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              createdAt={album.createdAt}
              pages={album?.pages}
            />
          ))}
        </div>
      </div>

      {showEditForm && (
        <EditProfileForm onCancel={() => setShowEditForm(false)} onSave={handleEditProfile} />
      )}
      {showAlbumForm && (
        <CreateAlbumForm onCancel={() => setShowAlbumForm(false)} onSave={handleCreateAlbum} />
      )}
    </>
  );
}

export default UserProfile;
