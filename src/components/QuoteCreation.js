import React, { useState } from 'react';
import { uploadImage, createQuote } from '../api';
import { useNavigate } from 'react-router-dom';

const QuoteCreation = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append('file', image);
      const url = await uploadImage(formData);
      setMediaUrl(url);
    } catch (err) {
      setError('Image upload failed');
    }
  };

  const handleCreateQuote = async () => {
    if (!text || !mediaUrl) {
      setError('Please enter text and upload an image');
      return;
    }
    try {
      await createQuote(token, text, mediaUrl);
      alert('Quote created!');
      navigate('/quote-list')
    } catch (err) {
      setError('Failed to create quote');
    }
  };

  return (
    <div className="quote-creation">
      <h1>Create Quote</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter quote text"
        />
        <input type="file" onChange={handleImageChange} />
      </div>
      {mediaUrl && <img style={{ width: '200px', height: 'auto' }} src={mediaUrl} alt="Preview" />}
      {error && <p className="error">{error}</p>}
      <div>
        <button className='btn' onClick={handleImageUpload}>Upload Image</button>
        <button className='btn' onClick={handleCreateQuote}>Create Quote</button>
      </div>
    </div>
  );
};

export default QuoteCreation;
