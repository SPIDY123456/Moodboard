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
    localStorage.removeItem('token');  // Removes the token from localStorage
  };


  
export const uploadImage = async (imageUrl, caption, token, boardId) => {
  try {
    const payload = {
      url: imageUrl,    // image URL from the client
      caption: caption, // optional caption for the image
      boardId: boardId, // the board ID to associate with
    };

    const response = await axios.post(
      `${API_URL}/api/uploads/upload`, 
      payload, 
      {
        headers: {
          'Content-Type': 'application/json', // sending JSON data
          'Authorization': `Bearer ${token}`, // authentication token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};