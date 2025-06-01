import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import pageImage from '/album-img.png' 
import jellyfish from '/jellyfish.png'
import whale from '/whale.png'
import back from '/blue-back.png'
import wavesLeft from '/waves-left.png'
import wavesRight from '/waves-right.png'
import '../assets/CreatePageTemplate1.css'

function CreatePageTemplate1() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('First trip to the sea');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1);
  }

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
            value={date} 
            onChange={handleDateChange} 
          />
        </div>

        <div className="content">
          <div className="image-section">
            <label htmlFor="file" className="custum-file-upload" style={{ backgroundImage: `url(${pageImage})`}}>
              <input id="file" type="file" onChange={handleFileChange}/>
            </label>
            <img src={whale} alt='Whale' className='whale-image' />
            <img src={jellyfish} alt='Jellyfish' className='jellyfish-image' />
          </div>
          <div className="text-section">
            <div className='title-container'>
              <input 
                type="text" 
                className="title-input" 
                value={title} 
                onChange={handleTitleChange} 
              />
            </div>
            <div className="lined-textarea-wrapper">
              <textarea className='lined-textarea' value={text} onChange={handleTextChange} rows={8} />
              {[...Array(8)].map((_, i) => (
                <div key={i} className='line-overlay' style={{ top: `${i * 60}px` }} />
              ))}
            </div>
          </div>
        </div>
        <button className="save-button">Save page</button>
      </div>
    </div>
  );
}

export default CreatePageTemplate1