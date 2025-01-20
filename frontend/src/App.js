import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import './modal.css';

import Navbar from './components/Navbar';
import Modal from './components/Modal';
import BoardCard from './components/BoardCard';
import Login from './pages/Login';
import ImageDetail from './pages/ImageDetail';
import SearchPage from './pages/SearchPage';
import EditProfile from './pages/EditProfile';



const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/image/:imageId" element={<ImageDetail />} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="edit-profile" element={<EditProfile/>} />
          

        </Routes>
        {showModal && <Modal />}
      </div>
    </Router>
  );
};

export default App;
