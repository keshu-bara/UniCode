import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Profile from "../profiles/Profile";

export default function Hero() {
      const [displayText, setDisplayText] = useState("");
      const [currentIndex, setCurrentIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
      const [loopNum, setLoopNum] = useState(0);

      const roles = ["Developer", "DSA Enthusiast", "Competitive Programmer"];
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



  const [currentProfile, setCurrentProfile] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const profiles = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB"],
      avatar: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Competitive Programmer",
      skills: ["C++", "Algorithms", "Data Structures"],
      avatar: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      role: "DSA Enthusiast",
      skills: ["Python", "Machine Learning", "System Design"],
      avatar: "/api/placeholder/80/80",
    },
  ];

  // Auto rotate profiles with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProfile((prev) => (prev + 1) % profiles.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col md:flex-row py-0.5 min-h-screen w-full items-center bg-gray-900 text-gray-100">
      {/* Left Section - Value Proposition */}
      <div className="main_center_box h-full flex flex-wrap justify-center items-center w-full md:w-1/2 px-6 py-12">
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
                  Are you a {" "}
                  <span className="text-blue-400 ml-2 min-w-20 inline-block">
                    {displayText} ?
                    <span className="animate-pulse">|</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="Auth_button w-full flex h-[15%] justify-start px-0.5 mb-8">
            <button className="bg-green-600 rounded-md text-white ml-2 w-auto px-6 py-2 hover:bg-green-500 transition-colors font-medium">
              Join
            </button>
            <button className="bg-gray-700 border border-gray-600 rounded-md text-white ml-4 w-auto px-6 py-2 hover:bg-gray-600 transition-colors font-medium">
              Login
            </button>
          </div>

          <div className="value-props text-gray-300 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
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
              <p>Ask someone with the same vibe for a date</p>
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
      <div className="md:h-full md:w-1/2 md:flex md:flex-wrap md:justify-center md:items-center">
        {/* Right Section - Profile Showcase */}

        <div className="profilsec h-full w-full md:w-1/2 flex items-center justify-center flex-wrap p-6">
          <div className="w-full md:max-w-lg flex flex-col items-center justify-center relative">
            {/* Main profile card */}
            <div
              className={`w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out border border-gray-700 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={profiles[currentProfile].avatar}
                    alt={profiles[currentProfile].name}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">
                      {profiles[currentProfile].name}
                    </h3>
                    <p className="text-blue-400">
                      {profiles[currentProfile].role}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profiles[currentProfile].skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-xs px-2 py-1 rounded-full text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    Connect
                  </button>
                  <div className="flex space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentProfile === 1 ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    ></span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentProfile === 2 ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    ></span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 border-t border-gray-700">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-xs text-gray-400">128 views</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-xs text-gray-400">24 likes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller profile cards */}
            {/* <div className="w-full flex justify-between mt-6">
            <div className="w-1/3 bg-gray-800/50 rounded-lg p-3 transform -rotate-6 border border-gray-700">
              <div className="flex items-center">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <h4 className="text-sm font-medium text-white">David Kim</h4>
                  <p className="text-xs text-gray-400">Game Developer</p>
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-gray-800/50 rounded-lg p-3 transform rotate-6 border border-gray-700">
              <div className="flex items-center">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <h4 className="text-sm font-medium text-white">Lisa Wong</h4>
                  <p className="text-xs text-gray-400">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>

        {/* GitHub-inspired Stats Section */}
        {/* <div className="w-full bg-gray-800 py-8 px-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Join the UniCode Community
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
              <span className="text-4xl font-bold text-blue-400 mb-2">
                1,250+
              </span>
              <p className="text-gray-300 text-center">
                Active developers ready to collaborate
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
              <span className="text-4xl font-bold text-green-400 mb-2">72</span>
              <p className="text-gray-300 text-center">
                Successful hackathon teams formed
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-400 mb-2">
                215
              </span>
              <p className="text-gray-300 text-center">
                Dating connections made
              </p>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </main>
  );
}
