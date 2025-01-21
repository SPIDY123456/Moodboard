import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { logoutUser } from '../services/api';
import BoardSuggestions from './BoardSuggestions';
import UnorganizedIdeas from './UnorganizedIdeas';

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [userData, setUserData] = useState({
    profilePicture: '',
    name: '',
    email: '',
    followersCount: 0,
    followingCount: 0,
    boards: [],
    boardSuggestions: [],
    unorganizedIdeas: [],
    pins: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boardSuggestions, setBoardSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data);
        setUserData({
          profilePicture: response.data.profilePicture,
          name: response.data.name,
          email: response.data.email,
          followersCount: response.data.followersCount || 0,
          followingCount: response.data.followingCount || 0,
          boards: response.data.boards || [],
          boardSuggestions: response.data.boardSuggestions || [],
          unorganizedIdeas: response.data.unorganizedIdeas || [],
          pins: response.data.pins || [],
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/board-suggestions`);
        console.log(response.data)
        setBoardSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching board suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

   const handleLogout = () => {
      logoutUser();
      navigate('/login');
    };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
     
      <div className="text-center">
        <img
          src={userData.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
        <h3 className="text-xl font-semibold mt-4">{userData.name}</h3>
        <h3 className="text-md text-gray-400 font-semibold">{userData.email}</h3>
      </div>

 
      <div className="mt-6 flex justify-center space-x-6">
        <div>
          <h4 className="font-semibold">Followers</h4>
          <p className='flex justify-center'>{userData.followersCount }</p>
        </div>
        <div>
          <h4 className="font-semibold">Following</h4>
          <p className='flex justify-center'>{userData.followingCount}</p>
        </div>
      </div>


      <div className="mt-6">
        <h4 className="font-semibold mb-2 ml-1">Pins</h4>
        <div className="grid grid-cols-3 gap-4">
          {userData.pins && userData.pins.length > 0 ? (
            userData.pins.map((pin) => (
              <div key={pin._id} className="relative">
           
                <img
                  src={pin.imageUrl}
                  alt={pin.altText || 'Pinned image'}
                  className="object-cover w-full h-96 rounded-lg"
                />
            
               
                <p className="mt-2 text-center text-sm">{pin.photographer}</p>
              </div>
            ))
          ) : (
            <p>No pins available</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-4 ml-2">Boards</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.boards && userData.boards.length > 0 ? (
            userData.boards.map((board) => (
              <div key={board._id} className="border rounded-lg shadow-lg p-4">
                <h5 className="text-lg font-bold">{board.name}</h5>
                <div className="mt-2">
                  {board.images && board.images.length > 0 ? (
                    board.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Board Image"
                        className="w-full h-80 object-cover rounded-lg mt-2"
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                  {board.caption && (
                  <p className="mt-2 text-center text-sm text-gray-600">{board.caption}</p>
                )}

                  
                </div>
              </div>
            ))
          ) : (
            <p>No boards available</p>
          )}
        </div>
      </div>
     

      <div className="mt-6">
        <h4 className="font-semibold">Board Suggestions</h4>
      
        <BoardSuggestions />
      </div>
      <div className="mt-6">
        <h4 className="font-semibold">Unorganized Ideas</h4>
  
        <UnorganizedIdeas />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded-full mb-12"
        >
          Edit Profile
        </button>
      </div>
      <div className = "flex justify-center">
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Profile;
