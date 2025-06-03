import { React, useEffect, useState } from 'react'
import uploadImage from '/upload-image.png'
import '../assets/UserProfileForm.css'

function EditProfileForm({ onCancel, onSave, user }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSubmit = () => {
    const updatedUser = {
      id: user.id,
      username: username,
      email: email
    }

    onSave(updatedUser, file);
  }

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

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
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <div className='form-left'>
          <div className='field-wrapper'>
            <input
              className='input-field'
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='username' className='label-text'>Nickname</label>
          </div>

          <div className='field-wrapper'>
            <input
              className='input-field'
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='email' className='label-text'>Email</label>
          </div>

          <div className='actions'>
            <button className='cancel-button' onClick={onCancel}>Cancel</button>
            <button className='save-button' onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm
