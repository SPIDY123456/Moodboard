import React from 'react';
const ImageCard = ({ image, caption }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src={image.url} alt={caption} />
        <div className="p-4">
          <p className="text-lg font-semibold">{caption}</p>
          <div className="flex justify-between items-center mt-4">
            <button className="text-blue-500">Like</button>
            <button className="text-green-500">Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ImageCard;