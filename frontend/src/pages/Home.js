import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apikey = process.env.REACT_APP_PEXELS_API_KEY; 

const Home = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async (query = "pinterest aesthetic", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`,
        {
          headers: {
            Authorization: apikey, // Replace with your Pexels API key
          },
        }
      );

      setImages(response.data.photos);
      setTotalPages(Math.ceil(response.data.total_results / 10));
    } catch (error) {
      console.error('Error fetching images from Pexels:', error);
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(undefined, page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container mx-auto p-6">
      

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <Link to={`/image/${image.id}`}>
                <img
                  src={image.src.medium}
                  alt={image.photographer}
                  className="w-full h-[350px] object-cover rounded-lg transition-transform transform group-hover:scale-105 duration-300 ease-in-out mb-4 shadow-lg"
                />
              </Link>
              <p className="text-left font-semibold">{image.photographer}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home