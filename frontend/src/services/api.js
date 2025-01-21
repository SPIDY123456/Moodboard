import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      return response.data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('token');  
  };


  
export const uploadImage = async (imageUrl, caption, token, boardId) => {
  try {
    const payload = {
      url: imageUrl,    
      caption: caption, 
      boardId: boardId, 
    };

    const response = await axios.post(
      `${API_URL}/api/uploads/upload`, 
      payload, 
      {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`, 
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};