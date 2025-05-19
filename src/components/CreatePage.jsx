import React, { useState } from 'react';
import pageImage from '/album-img.png' 
import jellyfish from '/jellyfish.png'
import whale from '/whale.png'
import back from '/blue-back.png'
import '../assets/CreatePage.css';

function CreatePage() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="page-container">
      <button className="back-button">
        <img src={back} alt='Back' className='back-image' />
         Back
      </button>
      <div className="content">
        <div className="image-section">
          <label htmlFor="file" className="custum-file-upload" style={{ backgroundImage: `url(${pageImage})`}}>
            <input id="file" type="file" onChange={handleFileChange}/>
          </label>
          <img src={whale} alt='Whale' className='whale-image' />
        </div>
        <div className="text-section">
          <h3>First trip to the sea</h3>
          <img src={jellyfish} alt='Jellyfish' className='jellyfish-image' />
          <div className="lined-textarea-wrapper">
            <textarea className='lined-textarea' value={text} onChange={handleTextChange} rows={10} />
            {[...Array(10)].map((_, i) => (
              <div key={i} className='line-overlay' style={{ top: `${i * 60}px` }} />
            ))}
          </div>
        </div>
      </div>
      <button className="save-button">Save page</button>
    </div>
  );
}

export default CreatePage