import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const UnorganizedIdeas = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchIdeas = async () => {
        try {
            const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/api/auth/unorganized-ideas`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          setIdeas(response.data);
        } catch (error) {
          console.error('Error fetching unorganized ideas:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchIdeas();
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
  
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {ideas.map(idea => (
              <div key={idea.id} className="p-4 border rounded-lg shadow-md">
                <img src= {idea.imageUrl} alt={idea.idea} className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      );
    };
  
  export default UnorganizedIdeas;
  