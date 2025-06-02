import React, { useState, useEffect } from 'react'
import { useNavigate, useParams  } from 'react-router'
import pageImage from '/album-img.png' 
import back from '/brown-back.png'
import '../assets/CreatePageTemplate3.css'

function CreatePageTemplate3({ mode = 'create', pageData: initialData }) {
  const [images, setImages] = useState({
    topLeft: null,
    bottomRight: null,
    bottomLeft: null
  });
  const [pageData, setPageData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: 'Happy 1st birthday'
  });
  const { pageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      // Тут має бути запит до API для отримання даних сторінки за id
      // Приклад:
      
      // Тимчасові дані для прикладу:
      const mockData = {
        date: '11/08/2024',
        title: 'Happy 1st birthday',
        images: {
          topLeft: '/mother.jpg',
          bottomRight: '/mother.jpg',
          bottomLeft: '/mother.jpg'
        }
      };
      setPageData({
        date: mockData.date,
        title: mockData.title
      });
      setImages(mockData.images);
      setPageData(mockData);
    }
  }, [mode, pageId]);

  const handleFileChange = (section) => (e) => {
    const file = e.target.files[0];
    if (file) {
        setImages(prev => ({
            ...prev,
            [section]: URL.createObjectURL(file)
        }));
    }
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
                <label htmlFor="file-top-left" className="custum-file-upload" style={{ backgroundImage: images.topLeft ? `url(${images.topLeft})` : `url(${pageImage})`}}>
                    <input id="file-top-left" type="file" onChange={handleFileChange('topLeft')} disabled={mode === 'view'}/>
                </label>
                ) : (
                <div className="custum-file-upload" style={{ backgroundImage: images.topLeft ? `url(${images.topLeft})` : `url(${pageImage})` }} />
                )}
            </div>
            <div className="image-section bottom-right">
                {mode !== 'view' ? (
                <label htmlFor="file-bottom-right" className="custum-file-upload" style={{ backgroundImage: images.bottomRight ? `url(${images.bottomRight})` : `url(${pageImage})`}}>
                    <input id="file-bottom-right" type="file" onChange={handleFileChange('bottomRight')} disabled={mode === 'view'}/>
                </label>
                ) : (
                <div className="custum-file-upload" style={{ backgroundImage: images.bottomRight ? `url(${images.bottomRight})` : `url(${pageImage})`}} />
                )}
            </div>
            <div className="image-section bottom-left">
                {mode !== 'view' ? (
                <label htmlFor="file-bottom-left" className="custum-file-upload" style={{ backgroundImage: images.bottomLeft ? `url(${images.bottomLeft})` : `url(${pageImage})`}}>
                    <input id="file-bottom-left" type="file" onChange={handleFileChange('bottomLeft')} disabled={mode === 'view'}/>
                </label>
                ) : (
                <div className="custum-file-upload" style={{ backgroundImage: images.bottomLeft ? `url(${images.bottomLeft})` : `url(${pageImage})` }} />
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