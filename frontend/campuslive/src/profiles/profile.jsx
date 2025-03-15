import React, { useState, useEffect } from "react";

export default function ProfileCard() {
  const initialProfiles = [
    {
      id: 1,
      name: "Nikhil Mishra",
      role: "Entrepreneur",
      skills: ["React", "Node.js", "MongoDB", "Attendly Developer"],
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
      skills: ["Java", "SQL", "System Design"],
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQE9594LLRCwsA/profile-displayphoto-shrink_800_800/B56ZRMAEwUHQAg-/0/1736441879369?e=1747267200&v=beta&t=qg56WdEAIfNlo5XhQegZhJ2WK5e6oA-Yq_QchlCc7PU",
    },
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://192.168.1.114:8000/api/home/profiles/");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProfiles(data);
        } else {
          setProfiles(initialProfiles);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setProfiles(initialProfiles); // Fallback to initial profiles in case of error
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profiles.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProfile((prevIndex) => (prevIndex + 1) % profiles.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [profiles]);

  return (
    <div
      className={`w-full bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out border border-gray-700  ${
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
            <p className="text-blue-400">{profiles[currentProfile].role}</p>
          </div>
        </div>

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

      <div className="px-6 py-4 border-t border-gray-700 bg-gray-800 flex justify-between items-center">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-all">
          Connect
        </button>
        <div className="flex space-x-2">
          {profiles.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentProfile === index
                  ? "bg-blue-500 scale-110"
                  : "bg-gray-600"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
