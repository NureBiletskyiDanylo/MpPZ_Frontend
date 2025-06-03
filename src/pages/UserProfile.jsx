import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import LoggedHeader from '../components/LoggedHeader.jsx';
import UserInfo from '../components/UserInfo.jsx';
import EditProfileForm from '../components/EditProfileForm.jsx';
import CreateAlbumForm from '../components/CreateAlbumForm.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import { formatISODate } from '../components/AlbumInfo.jsx';
import '../assets/UserProfile.css';
import { isEmail, useAuth } from '../AuthContext.jsx';

function UserProfile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const { user, isLoading, setUserData } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAlbums = async (token) => {
    fetch(`${API_URL}/api/Album/my-albums`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(err => {
        console.error('Failed to fetch albums:', err);
      });
  }

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    fetchAlbums(user.token);
  }, [user, isLoading]);

  const handleEditProfile = async (formData) => {
    if (!isEmail(formData.email)) {
      toast.error(`Invalid email: ${formData.email}`);
      return;
    }
    if (!formData.username) {
      toast.error('Username must not be empty');
      return;
    }

    await fetch(`${API_URL}/api/Account/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      //NOTE: this endpoint returns nothing on success
      .then(res => {
        console.log(res);
        if (res.ok) {
          toast.success('Profile updated');
          //XXX: we have to set new user data directly, as we don't receive the
          // new data from backend
          setUserData(user.id, user.token, formData.username, formData.email);
        } else {
          console.error('Update error ' + res.status);
        }
      })
      .catch(err => {
        console.error('Failed to update user profile:', err);
      });
    setShowEditForm(false);
  };

  const handleCreateAlbum = async (formData, imageFile) => {
    const params = new URLSearchParams({
      title: formData.title,
      childDateOfBirth: formData.childDateOfBirth,
      createdAt: formData.createdAt,
      ownerId: formData.ownerId
    });
    const formDataToSend = new FormData();
    formDataToSend.append('AlbumImage', imageFile);

    fetch(`${API_URL}/api/Album?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
      body: formDataToSend
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          //NOTE: the endpoint doesn't return anything,
          // so we have to re-fetch albums
          toast.success('Album posted');
          fetchAlbums(user.token);
        } else {
          console.error('Error posting album: ' + res.status);
          toast.error('Error posting album');
        }
      })
      .catch(err => {
        console.error('Failed to post album:', err);
        toast.error('Error posting album');
      });
    setShowAlbumForm(false);
  };

  if (!user) return null;

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
              image={album.albumProfileImage.imageUrl}
              title={album.title}
              createdAt={formatISODate(album.createdAt)}
              pages={album?.pages}
            />
          ))}
        </div>
      </div>

      {showEditForm && (
        <EditProfileForm onCancel={() => setShowEditForm(false)} onSave={handleEditProfile} user={user} />
      )}
      {showAlbumForm && (
        <CreateAlbumForm onCancel={() => setShowAlbumForm(false)} onSave={handleCreateAlbum} user={user} />
      )}
    </>
  );
}

export default UserProfile;
