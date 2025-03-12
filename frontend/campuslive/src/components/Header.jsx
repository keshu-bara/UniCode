import React from 'react';
import { Link } from 'react-router'; // Make sure to use 'react-router-dom' for Link

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <h1 className="text-4xl italic text-pink-600">CampusLive</h1>
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-800 hover:text-pink-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-pink-600">
            About
          </Link>
          <Link to="/live" className="text-gray-800 hover:text-pink-600">
            Live
          </Link>
          <Link to="/Test" className="text-gray-800 hover:text-pink-600">
            Test
          </Link>
        </nav>
      </div>
    </header>
  );
}
