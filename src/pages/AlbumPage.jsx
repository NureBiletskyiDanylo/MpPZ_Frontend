import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import LoggedHeader from '../components/LoggedHeader.jsx'
import AlbumInfo from '../components/AlbumInfo.jsx'
import PageCard from '../components/PageCard.jsx'
import CreateAlbumForm from '../components/CreateAlbumForm.jsx'
import '../assets/AlbumPage.css'

function AlbumPage() {
  const [isEditingAlbum, setIsEditingAlbum] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const navigate = useNavigate();

  const handleEditAlbum = () => {
    setShowAlbumForm(false);
  };

  return (
    <>
      <LoggedHeader />
      <div className='album-profile'>
        <AlbumInfo
          onEditAlbum={() => setShowAlbumForm(true)}
          onCreatePage={() => navigate('/create-page')}
        />

        <div className='page-list'>
          {[1, 2, 3].map((id) => (
            <PageCard key={id} />
          ))}
        </div>
      </div>
      {showAlbumForm && (<CreateAlbumForm onCancel={() => setShowAlbumForm(false)} onSave={handleEditAlbum} />)}
    </>
  )
}

export default AlbumPage
