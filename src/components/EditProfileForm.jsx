import { React, useState } from 'react'
import uploadImage from '/upload-image.png'
import '../assets/UserProfileForm.css'

function EditProfileForm({ onCancel, onSave, user }) {
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSubmit = () => {
    const updatedUser = {
      id: user.id,
      username: username,
      email: email
    }

    onSave(updatedUser)
  }

  return (
    <div className='modal'>
      <div className='form-container'>
        <label htmlFor="file" className="custum-file-upload">
          <div className="icon">
            <img src={uploadImage} alt='Upload image' className='upload-image' />
          </div>
          <div className='upload-text'>
            <span>Click to upload image</span>
          </div>
          <input id="file" type="file" />
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
