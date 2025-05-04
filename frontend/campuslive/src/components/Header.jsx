import React, { useState } from "react";
import { Link } from "react-router"; // Corrected import

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const tags = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "design", name: "Design" },
  ];

  return (
    <header className="bg-gray-900/50 m-4 rounded-lg shadow-lg border border-gray-700">
      <div className="container mx-auto p-4">
        {/* Top Section: Logo and Navigation */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo */}
          <div className="UniCoders flex items-center relative">
            <h1 className="text-2xl md:text-4xl font-bold text-white">Uni</h1>
            <div className="flex flex-col relative">
              <h1 className="text-2xl md:text-4xl font-bold text-sky-500">
                Code
              </h1>
              <span className="absolute -right-8 -top-3 text-base bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-sm font-mono transform -rotate-12 tracking-tighter">
                βv1.0
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-sky-500 focus:outline-none p-2 rounded-md border border-gray-700"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } md:block w-full md:w-auto mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6">
              <li className="py-2 md:py-0">
                <Link
                  to="/"
                  className="text-white hover:text-sky-500 font-medium transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/about"
                  className="text-white hover:text-sky-500 font-medium transition duration-300"
                >
                  About
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/Ai"
                  className="text-white hover:text-sky-500 font-medium transition duration-300"
                >
                  AI
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/Dashboard"
                  className="text-white hover:text-sky-500 font-medium transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/contact"
                  className="text-white hover:text-sky-500 font-medium transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Section: Tags */}
        {/* <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 whitespace-nowrap ${
                    activeTag === tag.id
                      ? "bg-sky-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
}
