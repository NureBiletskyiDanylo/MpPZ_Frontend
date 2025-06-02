import React, { useState, useEffect } from 'react'
import { useNavigate, useParams  } from 'react-router'
import pageImage from '/album-img.png' 
import jellyfish from '/jellyfish.png'
import whale from '/whale.png'
import back from '/blue-back.png'
import wavesLeft from '/waves-left.png'
import wavesRight from '/waves-right.png'
import '../assets/CreatePageTemplate1.css'

function CreatePageTemplate1({ mode = 'create', pageData: initialData }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [pageData, setPageData] = useState({
    image: null,
    text: '',
    date: new Date().toISOString().split('T')[0],
    title: 'First trip to the sea'
  });
  const { pageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      // Тут має бути запит до API для отримання даних сторінки за id
      // Приклад:
      
      // Тимчасові дані для прикладу:
      const mockData = {
        image: '/mother.jpg',
        text: 'Our amazing trip to the sea...',
        date: '11/08/2024',
        title: 'First trip to the sea'
      };
      setPageData(mockData);
    }
  }, [mode, pageId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPageData(prev => ({...prev, image: URL.createObjectURL(file)}));
    }
  };

  const handleTextChange = (e) => {
    setPageData(prev => ({...prev, text: e.target.value}));
  };

  const handleDateChange = (e) => {
    setPageData(prev => ({...prev, date: e.target.value}));
  };

  const handleTitleChange = (e) => {
    setPageData(prev => ({...prev, title: e.target.value}));
  };

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleSave = () => {
    // Тут має бути логіка збереження даних (враховуючи, що це може бути як створення, так і редагування)
    //const url = mode === 'create' ? `/api/templates/${templateId}/pages` : `/api/pages/${templateId}/${pageId}`;
    //method: mode === 'create' ? 'POST' : 'PUT',
    navigate(-1);
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
              <label htmlFor="file" className="custum-file-upload" style={{ backgroundImage: pageData.image ? `url(${pageData.image})` : `url(${pageImage})`}}>
                <input id="file" type="file" onChange={handleFileChange} disabled={mode === 'view'}/>
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