import uploadImage from '/upload-image.png' 
import '../assets/UserProfileForm.css'

function EditProfileForm({ onCancel }) {
    return(
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
                        <input className='input-field' type='text' placeholder='' id='nickname'/>
                        <label htmlFor='nickname' className='label-text'>Nickname</label>
                    </div>
                    <div className='field-wrapper'>
                        <input className='input-field' type='email' placeholder='' id='email'/>
                        <label htmlFor='email' className='label-text'>Email</label>
                    </div>
                    <div className='actions'>
                        <button className='cancel-button' onClick={onCancel}>Cancel</button>
                        <button className='save-button'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileForm