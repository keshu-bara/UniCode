import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full py-3 px-6 border-t border-gray-800 mt-auto">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="copyright flex items-center mb-2 sm:mb-0">
          <h1 className="text-white font-semibold">Uni</h1>
          <h1 className="text-blue-500 font-semibold">Code</h1>
          <span className="text-xs sm:text-sm font-light ml-2 opacity-80">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/about"
            className="text-sm hover:text-blue-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="text-sm hover:text-blue-400 transition-colors duration-300"
          >
            Privacy
          </Link>
          <a href="https://www.linkedin.com/in/keshav-kumar-49b171294/"
            target="_blank"
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors duration-300"
          >
            
              Contact Developer
  
          </a>
        </div>
      </div>
    </footer>
  );
}
