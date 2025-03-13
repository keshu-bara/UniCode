import React from 'react'
import {useState ,useEffect} from 'react'

export default function Profile() {
   const [currentProfile, setCurrentProfile] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const profiles = [
    {
      id: 1,
      name: "Nikhil Mishra",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB"],
      avatar:
        "https://media.licdn.com/dms/image/v2/D4E03AQEL7SlP5BYjnA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732695047582?e=1747267200&v=beta&t=e7vJPbgx8RmRJUXxa9jS9h5U4AeWuyZtbtvfSDbNlrE",
    },
    {
      id: 2,
      name: "Dhruv Sharma",
      role: "Competitive Programmer",
      skills: ["C++", "Algorithms", "Data Structures"],
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQE5nN4tpn0mUA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724782288558?e=1747267200&v=beta&t=_DNGKRCziu3I8nKFc1U4kBAFmnBBA1TiJ6RudwHBuuQ",
    },
    {
      id: 3,
      name: "Bhommi Jain",
      role: "DSA Enthusiast",
      skills: ["Python", "Machine Learning", "System Design"],
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQE9594LLRCwsA/profile-displayphoto-shrink_800_800/B56ZRMAEwUHQAg-/0/1736441879369?e=1747267200&v=beta&t=qg56WdEAIfNlo5XhQegZhJ2WK5e6oA-Yq_QchlCc7PU",
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
    <div
              className={`w-full bg-gray-900/50 rounded-xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out border border-gray-700  ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="p-6 ">
                <div className="flex items-center mb-4 ">
                  <img
                    src={profiles[currentProfile].avatar}
                    alt={profiles[currentProfile].name}
                    className="w-16 h-16 rounded-full  border-blue-500"
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

              <div className="bg-gray-900/50 p-4 border-t border-gray-700">
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
  );
}
 