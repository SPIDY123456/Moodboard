import React from 'react';

const BoardCard = ({ image }) => {
  return (
    <div className="board-card">
      <img src={image.url} alt="Uploaded" />
      <p>{image.caption}</p>
    </div>
  );
};

export default BoardCard;
