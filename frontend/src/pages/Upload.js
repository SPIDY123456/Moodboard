import React,{useState} from 'react'

const Upload = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [boardId, setBoardId] = useState('');
  
    const handleUpload = async () => {
      
    };
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold">Upload Image</h2>
        <div className="mt-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Caption</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded"
            placeholder="Enter image caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Board ID</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded"
            placeholder="Enter board ID"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    );
  };
  
  export default Upload;