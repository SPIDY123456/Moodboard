import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          <p className='-ml-20 '>Moodboard</p>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
