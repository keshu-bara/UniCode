import React, { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router";
import Profile from "../profiles/profile";

export default function Hero() {
      const navigate = useNavigate();
      const [displayText, setDisplayText] = useState("");
      const [currentIndex, setCurrentIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
      const [loopNum, setLoopNum] = useState(0);
      const [showBetaModal, setShowBetaModal] = useState(false);

      useEffect(() => {
        const hasSeenBeta = localStorage.getItem('hasSeenBetaMessage');
        if (!hasSeenBeta) {
          setShowBetaModal(true);
          localStorage.setItem('hasSeenBetaMessage', 'true');
        }
      }, []);

      const closeBetaModal = () => {
        setShowBetaModal(false);
      };

      const roles = ["Developer", "DSA Enthusiast", "Competative Programmer","Data Scientist"];
      const typingSpeed = 150; // Speed in milliseconds
      const deleteSpeed = 100; // Speed of deletion in milliseconds
      const delayBetweenWords = 1000; // Time to pause at complete word

      useEffect(() => {
        const handleTyping = () => {
          const currentRole = roles[loopNum % roles.length];
          const shouldDelete = isDeleting;

          if (!shouldDelete && displayText.length < currentRole.length) {
            // Still typing
            setDisplayText(currentRole.substring(0, displayText.length + 1));
          } else if (shouldDelete && displayText.length > 0) {
            // Deleting
            setDisplayText(currentRole.substring(0, displayText.length - 1));
          } else if (shouldDelete && displayText.length === 0) {
            // Finished deleting
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
          } else {
            // Completed typing current word
            setIsDeleting(true);
            setTimeout(() => {}, delayBetweenWords);
          }
        };

        const timer = setTimeout(
          handleTyping,
          isDeleting ? deleteSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
      }, [displayText, isDeleting, loopNum]);


  return (
    <main className=" flex flex-col md:flex-row min-h-[80vh] h-full w-full items-stretch  text-gray-100">
      {/* Left Section - Value Proposition */}
      <div className=" main_center_box h-full flex flex-wrap justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="mainmoto w-full">
          <div className="message flex py-0.5 items-start flex-col justify-center mb-8">
            <div className="UniCoders flex justify-center m-0 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">Uni</h1>
              <h1 className="text-4xl md:text-6xl font-bold text-blue-500">
                Code
              </h1>
            </div>
            <div>
              <div className="tagelines text-gray-300 m-0 text-lg md:text-xl">
                <h2 className="mb-2 flex items-center">
                  Are you a{" "}
                  <span className="text-blue-400 ml-2 min-w-20 inline-block">
                    {displayText} ?<span className="animate-pulse"></span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="Auth_button w-full flex h-[15%] justify-start px-0.5 mb-8">
            <button
              onClick={() => navigate("/auth?button=join")}
              className="bg-green-600 rounded-md text-white ml-2 w-auto px-6 py-2 hover:bg-green-500 transition-colors font-medium"
            >
              Join
            </button>
            <button
              onClick={() => navigate("/auth?button=login")}
               className="bg-gray-700 border border-gray-600 rounded-md text-white ml-4 w-auto px-6 py-2 hover:bg-gray-600 transition-colors font-medium"
            >
              Login
            </button>
          </div>

          <div className="value-props text-gray-300 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Why UniCode?
            </h3>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p>Find your developer vibe</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p>Ask someone with the same vibe</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-green-900/40 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p>Find teammates for hackathons and projects</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-900/40 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p>Mix Code + Entrepreneurial skills</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Profile */}
      <div className="md:h-full w-full md:w-1/2  flex">
        <div className=" main_center_box md:h-full flex flex-col w-full px-6">
          {/* Search Section */}
          <div className="py-4 border-b mb-20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search profiles..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col ">
            {/* Profile Section - Taking full height with additional top margin */}
            <div className="profilsec flex-1 w-full flex items-center justify-center mt-4">
              {/* Main profile card */}
              <div className="w-auto h-full mb-10">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beta Modal */}
      {showBetaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeBetaModal}></div>
          <div className="relative bg-gray-900 p-6 rounded-lg shadow-xl border border-sky-500/20 max-w-md w-full">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="text-sky-500 mr-2">β</span>
                Beta Version Notice
              </h2>
              <span className="ml-2 px-2 py-1 text-xs bg-sky-500/20 text-sky-400 rounded-full">
                v0.1
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Welcome to UniCode! 🚀 We're currently in beta, which means:
            </p>
            <ul className="text-gray-400 mb-6 space-y-2">
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                You might encounter some bugs or incomplete features
              </li>
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                We're actively developing and improving the platform
              </li>
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                Your feedback is valuable to us!
              </li>
            </ul>
            <button
              onClick={closeBetaModal}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Got it! Let's explore
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
