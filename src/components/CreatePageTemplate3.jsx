import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import pageImage from '/album-img.png'
import back from '/brown-back.png'
import '../assets/CreatePageTemplate3.css'
import { useAuth } from '../AuthContext'

function CreatePageTemplate3({ mode = 'create', pageData: initialData }) {
  const location = useLocation();
  const { albumId } = location.state || {};
  const [fileMap, setFileMap] = useState({});
  const [images, setImages] = useState(null);
  const [pageData, setPageData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: 'Happy 1st birthday'
  });
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && pageId) {
      fetch(`${API_URL}/api/Posts/${pageId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setPageData({
            image: data.images?.[0]?.imageUrl || '',
            title: data.title,
            text: data.text,
            date: data.dateSetByUser.split('T')[0]
          });
          console.log(data)
          setImages({
            topLeft: data?.images?.[0]?.imageUrl || '',
            bottomRight: data?.images?.[1]?.imageUrl || '',
            bottomLeft: data?.images?.[2]?.imageUrl || ''
          })
        })
        .catch(err => console.error('Failed to load post:', err));
    }
  }, [mode, pageId]);

  const handleFileChange = (position) => (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileMap(prev => ({ ...prev, [position]: selectedFile })); // real files
      setImages(prev => ({
        ...prev,
        [position]: URL.createObjectURL(selectedFile) // previews
      }));
    }
  };

  const handleDateChange = (e) => {
    setPageData(prev => ({ ...prev, date: e.target.value }));
  };

  const handleTitleChange = (e) => {
    setPageData(prev => ({ ...prev, title: e.target.value }));
  };

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleSave = async () => {
    if (mode === 'create') {
      const formData = new FormData();
      formData.append('Title', pageData.title);
      formData.append('Text', pageData.text);
      formData.append('AuthorId', user.id);
      formData.append('DateSetByUser', new Date(pageData.date).toISOString());
      formData.append('TemplateId', 3);
      Object.values(fileMap).forEach(file => {
        formData.append('Images', file);
      });

      try {
        const response = await fetch(`${API_URL}/api/Posts/${albumId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
          body: formData
        });

        if (!response.ok) throw new Error('Failed to create post');
        navigate(-1);
      } catch (err) {
        console.error(err);
      }
    } else if (mode === 'edit') {
      const updatedData = {
        id: pageId,
        title: pageData.title,
        text: pageData.text,
        dateSetByUser: new Date(pageData.date).toISOString()
      };

      try {
        const response = await fetch(`${API_URL}/api/Posts`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error('Failed to update post');
        navigate(-1);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className='page-wrapper'>
      <div className="page-container3">

        <div className='top-section'>
          <button className="back-button" onClick={handleBackClick}>
            <img src={back} alt='Back' className='back-image' />
            Back
          </button>
          <input
            type="date"
            className="date-input"
            value={pageData.date}
            onChange={handleDateChange}
            readOnly={mode === 'view'}
          />
        </div>

        <div className="content">
          <div className="text-section">
            <div className='title-container'>
              <textarea
                type="text"
                className="title-input"
                value={pageData.title}
                onChange={handleTitleChange}
                readOnly={mode === 'view'}
              />
            </div>
          </div>
          <div className="image-section top-left">
            {mode !== 'view' ? (
              <label htmlFor="file-top-left" className="custum-file-upload" style={{ backgroundImage: images?.topLeft ? `url(${images.topLeft})` : `url(${pageImage})` }}>
                <input id="file-top-left" type="file" onChange={handleFileChange('topLeft')} disabled={mode === 'view'} />
              </label>
            ) : (
              <div className="custum-file-upload" style={{ backgroundImage: images?.topLeft ? `url(${images?.topLeft})` : `url(${pageImage})` }} />
            )}
          </div>
          <div className="image-section bottom-right">
            {mode !== 'view' ? (
              <label htmlFor="file-bottom-right" className="custum-file-upload" style={{ backgroundImage: images?.bottomRight ? `url(${images.bottomRight})` : `url(${pageImage})` }}>
                <input id="file-bottom-right" type="file" onChange={handleFileChange('bottomRight')} disabled={mode === 'view'} />
              </label>
            ) : (
              <div className="custum-file-upload" style={{ backgroundImage: images?.bottomRight ? `url(${images.bottomRight})` : `url(${pageImage})` }} />
            )}
          </div>
          <div className="image-section bottom-left">
            {mode !== 'view' ? (
              <label htmlFor="file-bottom-left" className="custum-file-upload" style={{ backgroundImage: images?.bottomLeft ? `url(${images.bottomLeft})` : `url(${pageImage})` }}>
                <input id="file-bottom-left" type="file" onChange={handleFileChange('bottomLeft')} disabled={mode === 'view'} />
              </label>
            ) : (
              <div className="custum-file-upload" style={{ backgroundImage: images?.bottomLeft ? `url(${images.bottomLeft})` : `url(${pageImage})` }} />
            )}
          </div>
        </div>
        {mode !== 'view' && (
          <button className="save-button" onClick={handleSave}>Save page</button>
        )}
      </div>
    </div>
  );
}

export default CreatePageTemplate3
