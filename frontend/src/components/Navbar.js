import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../image/mb.jpeg";



const Navbar = () => {

  return (
    <nav className="bg-stone-900 p-4">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          < h1 className='font-serif text-2xl text-white ml-20 '><img className="absolute -mt-2 -ml-16" src = {Image} alt ="MoodBoard" width = "50" height="10"/>MoodBoard</h1>
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">HOME</Link>
          </li>
          <li>
            <Link to="/board" className="text-white hover:text-gray-400">BOARD</Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-400">LOGIN</Link>
          </li>
          <li>
            <Link to="/search" className="text-white hover:text-gray-400">SEARCH</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white  hover:text-gray-400">PROFILE</Link>
          </li>
          <li>
            <Link to="/upload" className="text-white  hover:text-gray-400">UPLOAD</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
