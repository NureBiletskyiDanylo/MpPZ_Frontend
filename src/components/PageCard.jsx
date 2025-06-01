import { useNavigate } from 'react-router'
import edit from '/edit.png'
import pageImage from '/album-img.png' 

function PageCard({children, onClick, pageId}) {
    const navigate = useNavigate()

    const handleEditClick = (e) => {
        e.stopPropagation()
        navigate(`/edit-page/${pageId}`)
    }

    return(
        <div className='page-card' onClick={onClick}>
            <div className='image-placeholder'>
                <img src={pageImage} alt='Page Image' className='page-img' />
            </div>

            {children || (
                <div className='page-info'>
                    <h3>First birthday</h3>
                    <p>14/02/2025</p>
                </div>
            )}

            <div className='page-card-button'>
                <button className='button' onClick={handleEditClick}>
                    <img src={edit} alt='Edit page' className='button-icon' />
                    Edit page
                </button>
            </div>
        </div>
    )
}

export default PageCard