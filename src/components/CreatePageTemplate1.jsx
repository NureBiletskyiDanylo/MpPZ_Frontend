import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import pageImage from '/album-img.png'
import jellyfish from '/jellyfish.png'
import whale from '/whale.png'
import back from '/blue-back.png'
import wavesLeft from '/waves-left.png'
import wavesRight from '/waves-right.png'
import '../assets/CreatePageTemplate1.css'
import { useAuth } from '../AuthContext'

function CreatePageTemplate1({ mode = 'create', pageData: initialData }) {
  const location = useLocation();
  const { albumId } = location.state || {};
  const [file, setFile] = useState(null);
  const [pageData, setPageData] = useState({
    image: null,
    text: '',
    date: new Date().toISOString().split('T')[0],
    title: 'First trip to the sea'
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
        })
        .catch(err => console.error('Failed to load post:', err));
    }
  }, [mode, pageId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPageData(prev => ({
        ...prev,
        image: URL.createObjectURL(selectedFile)
      }));
    }
  };

  const handleTextChange = (e) => {
    setPageData(prev => ({ ...prev, text: e.target.value }));
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
      formData.append('TemplateId', 1);
      if (file) {
        formData.append('Images', file);
      }

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
  };

  return (
    <div className='page-wrapper'>
      <div className="page-container">
        <img src={wavesLeft} alt='Waves Left' className='waves-left' />
        <img src={wavesRight} alt='Waves Right' className='waves-right' />

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
          <div className="image-section">
            {mode !== 'view' ? (
              <label htmlFor="file" className="custum-file-upload" style={{ backgroundImage: pageData.image ? `url(${pageData.image})` : `url(${pageImage})` }}>
                <input id="file" type="file" onChange={handleFileChange} disabled={mode === 'view'} />
              </label>
            ) : (
              <div className="custum-file-upload" style={{ backgroundImage: pageData.image ? `url(${pageData.image})` : `url(${pageImage})` }} />
            )}
            <img src={whale} alt='Whale' className='whale-image' />
            <img src={jellyfish} alt='Jellyfish' className='jellyfish-image' />
          </div>
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
            <div className="lined-textarea-wrapper">
              <textarea className='lined-textarea' value={pageData.text} onChange={handleTextChange} rows={8} readOnly={mode === 'view'} />
              {[...Array(8)].map((_, i) => (
                <div key={i} className='line-overlay' style={{ top: `${i * 60}px` }} />
              ))}
            </div>
          </div>
        </div>
        {mode !== 'view' && (
          <button className="save-button" onClick={handleSave}>Save page</button>
        )}
      </div>
    </div>
  );
}

export default CreatePageTemplate1
