import { useState } from 'react'
import { Navigate } from 'react-router'
import LoggedHeader from '../components/LoggedHeader.jsx'
import UserInfo from '../components/UserInfo.jsx'
import AlbumCard from '../components/AlbumCard.jsx'
import EditProfileForm from '../components/EditProfileForm.jsx'
import CreateAlbumForm from '../components/CreateAlbumForm.jsx'
import '../assets/UserProfile.css'
import { useAuth } from '../AuthContext.jsx'

function UserProfile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  const handleEditProfile = async (formData) => {
    setShowEditForm(false);
  };

  const handleCreateAlbum = async (formData) => {
    setShowAlbumForm(false);
  };

  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          <LoggedHeader />
          <div className='user-profile'>
            <UserInfo
              onEditProfile={() => setShowEditForm(true)}
              onCreateAlbum={() => setShowAlbumForm(true)}
            />

            <div className='album-list'>
              {[1, 2, 3].map((id) => (
                <AlbumCard key={id} />
              ))}
            </div>
          </div>
          {showEditForm && (<EditProfileForm onCancel={() => setShowEditForm(false)} onSave={handleEditProfile} />)}
          {showAlbumForm && (<CreateAlbumForm onCancel={() => setShowAlbumForm(false)} onSave={handleCreateAlbum} />)}
        </>
      ) : (
        <Navigate to="/login" replace />
      )};
    </>
  );
}

export default UserProfile
