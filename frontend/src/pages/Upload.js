import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const Upload = () => {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [boardId, setBoardId] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null); 
  const navigate = useNavigate();

  const handleUpload = async () => {
    const token = localStorage.getItem('token');
    navigate('/');

    if (!token) {
      alert('Please log in first');
      return;
    }

    const data = {
      url,
      caption,
      boardId,
    };

    try {
      const response = await axios.post(`${API_URL}/api/uploads/upload`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadStatus('success'); 
      } else {
        setUploadStatus('fail');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('fail'); 
    }
  };

  useEffect(() => {
    if (uploadStatus === 'success') {
      navigate('/board'); // Navigate to board when upload is successful
    }
  }, [uploadStatus, navigate]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-orange-400 shadow-md rounded-lg mt-32">
      <h2 className="text-3xl text-center text-white font-mono font-semibold mb-2 ">UPLOAD IMAGE</h2>
      <div className="mt-4 ">
        <label className="block  text-black ">Image URL</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded mb-6"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-black ">Caption</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded mb-6"
          placeholder="Enter image caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-black ">Board ID</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded mb-6"
          placeholder="Enter board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full" onClick={handleUpload}>
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default Upload;
