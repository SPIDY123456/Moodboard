
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BoardSuggestions = () => {
  const [boardSuggestions, setBoardSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/auth/board-suggestions`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
            });
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {boardSuggestions.map(suggestion => (
          <div key={suggestion.id} className="p-4 border rounded-lg shadow-md">
            <img src={suggestion.image} alt={suggestion.title} className="rounded-lg" />
            <h3 className="mt-2 font-bold">{suggestion.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSuggestions;
