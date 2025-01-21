import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Board = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };


  return (
    <div className="board-container container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user ? user.name : 'Loading...'}
      </h1>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user &&
          user.boards &&
          user.boards.map((board) => (
            <div
              key={board._id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold">{board.name}</h2>

               
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {board.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden">
                      <img
                        src={image}
                        alt="Board Image"
                        className="w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                      />
                       {board.caption && (
                  <p className="mt-2 text-center text-sm text-gray-600">{board.caption}</p>
                )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
