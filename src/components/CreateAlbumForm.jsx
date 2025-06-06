import uploadImage from '/upload-image.png'
import '../assets/UserProfileForm.css'
import { React, useEffect, useState } from 'react'

function CreateAlbumForm({ onCancel, onSave, user, defaultAlbum = {} }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(defaultAlbum.title || '');
  const [childDOB, setChildDOB] = useState(defaultAlbum.childDateOfBirth || '');
  const [createdAt, setCreatedAt] = useState(
    defaultAlbum.createdAt
      ? new Date(defaultAlbum.createdAt).toISOString().slice(0, 16)
      : ''
  );

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

  const handleSubmit = () => {
    const albumData = {
      title,
      childDateOfBirth: childDOB,
      createdAt: new Date(createdAt).toISOString(),
      ownerId: user.id,
    };
    onSave(albumData, file);
  };

  return (
    <div className='modal'>
      <div className='form-container'>
        <label htmlFor="file" className="custum-file-upload">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="upload-preview"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
            />
          ) : (
            <>
              <div className="icon">
                <img src={uploadImage} alt='Upload image' className='upload-image' />
              </div>
              <div className='upload-text'>
                <span>Click to upload image</span>
              </div>
            </>
          )}
          <input id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <div className='form-left'>
          <div className='field-wrapper'>
            <input
              className='input-field'
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='title' className='label-text'>Title</label>
          </div>

          <div className='field-wrapper'>
            <input
              className='input-field'
              type='date'
              id='childDOB'
              value={childDOB}
              onChange={(e) => setChildDOB(e.target.value)}
            />
            <label htmlFor='childDOB' className='label-text'>Child's Date of Birth</label>
          </div>

          <div className='field-wrapper'>
            <input
              className='input-field'
              type='datetime-local'
              id='createdAt'
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
            <label htmlFor='createdAt' className='label-text'>Created At</label>
          </div>

          <div className='actions'>
            <button className='cancel-button' onClick={onCancel}>Cancel</button>
            <button className='save-button' onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbumForm;
