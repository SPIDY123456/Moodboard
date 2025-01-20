import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link for routing

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Prevent searching if the input is empty

    setLoading(true);

    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
        headers: {
          Authorization: 'AFU73SVVeA8dCwJutH1bBNbL43G0UiQEoGFZwo44UfPnQyOzBoMXqALb',
        },
      });
      setImages(response.data.photos);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images, movies, footballers..."
            className="w-full p-4 text-lg border rounded-l-lg border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.length === 0 ? (
            <div className="col-span-full text-center text-lg font-semibold text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            images.map((image) => (
              <div key={image.id} className="border rounded-lg shadow-md overflow-hidden">
                <img
                  src={image.src.medium}
                  alt={image.photographer}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{image.photographer}</h3>
                  <p className="text-gray-600">Likes: {image.likes}</p>
                  <div className="mt-4">
                    {/* Updated link to include image ID */}
                    <Link
                      to={`/image/${image.id}`}  // Link to image detail page
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Image
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
