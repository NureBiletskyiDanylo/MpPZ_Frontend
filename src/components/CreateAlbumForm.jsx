import uploadImage from '/upload-image.png' 
import '../assets/UserProfileForm.css'

function CreateAlbumForm({ onCancel }) {
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
                        <input className='input-field' type='text' placeholder='' id='title'/>
                        <label htmlFor='title' className='label-text'>Title</label>
                    </div>
                    <div className='field-wrapper'>
                        <input className='input-field' type='date' placeholder='' id='date'/>
                        <label htmlFor='date' className='label-text'>Date</label>
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

export default CreateAlbumForm