import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apikey = process.env.REACT_APP_PEXELS_API_KEY; 

const ImageDetail = () => {
  const { imageId } = useParams();  
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/photos/${imageId}`, {
          headers: {
            Authorization: apikey,
          },
        });
        setImage(response.data);

     
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  if (!image) return <div>Loading...</div>;

  const handleBack = () => {
    navigate('/'); // Navigate back to the homepage
  };

  const handleSave = async () => {
    try {
      const imageDetails = {
        imageUrl: image.src.large,
        photographer: image.photographer,
        altText: image.alt,
      };

      const response = await axios.post(`${API_URL}/api/auth/save-pin`, imageDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.data) {
        console.log('Image pinned successfully:', response.data);
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center">
        <img src={image.src.large} alt={image.photographer} />
      </div>
      <h2 className="ml-[520px] mt-4 mb-4">{image.photographer}</h2>
      <p className="text-center mb-4">{image.alt}</p>
      <div className="flex justify-center gap-24">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full" onClick={handleSave}>
          Like
        </button>
        <button className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full" onClick={handleSave}>
          Save
        </button>
        <button className="ml-4 bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ImageDetail;
