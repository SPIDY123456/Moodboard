import React from 'react';

const Modal = ({ onClose, onUpload, image, onFileChange, caption, onCaptionChange }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Upload Image</h2>
        <input type="file" onChange={onFileChange} />
        <input
          type="text"
          value={caption}
          onChange={onCaptionChange}
          placeholder="Enter caption"
        />
        <button onClick={onUpload} disabled={!image}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Modal;
