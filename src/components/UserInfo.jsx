import profileIcon from '/profile-icon.png' 
import edit from '/edit.png'
import add from '/add.png'

function UserInfo({ onEditProfile, onCreateAlbum}) {
    return(
        <div className='user-info'>
            <div className='profile-info'>
                <div className='image-placeholder'>
                    <img src={profileIcon} alt='MemoBaby logo' className='logo-image' />
                </div>
                <h3>marie@gmail.com</h3>
                <div className='line' />
                <p>marie@gmail.com</p>
                <p>Albums: 3</p>
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