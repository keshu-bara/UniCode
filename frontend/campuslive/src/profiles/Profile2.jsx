import { useState, useEffect } from "react";

const ProfileSlider = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/home/profiles/"
        ); // Replace with your API URL
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProfiles(data);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  // Auto rotate profiles with animation
  useEffect(() => {
    if (profiles.length === 0) return; // Only start rotation if profiles are available

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProfileIndex(
          (prevIndex) => (prevIndex + 1) % profiles.length
        );
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [profiles]);

  if (profiles.length === 0) {
    return <p>Loading profiles...</p>;
  }

  return (
<div
      className={`relative w-80 mx-auto p-4 border rounded-lg shadow-md bg-gray-900/90 $ {
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {profiles.length > 0 && (
        <div className="p-6">
          <img
            src={profiles[currentProfileIndex].avatar}
            alt={profiles[currentProfileIndex].name}
            className="w-16 h-16 rounded-full border-blue-500 mx-auto"
          />
          <h3 className="text-xl text-center text-white mt-2">
            {profiles[currentProfileIndex].name}
          </h3>
          <p className="text-blue-400 text-center">
            {profiles[currentProfileIndex].role}
          </p>
          <div className="mt-4">
            <h4 className="text-blue-300 text-sm text-center mb-2">Skills</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {profiles[currentProfileIndex].skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-200 p-1 m-1 rounded text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
              Connect
            </button>
            <div className="flex space-x-2">
              <span className="w-4 h-4 rounded-full bg-blue-500"></span>
              <span
                className={`w-4 h-4 rounded-full ${
                  currentProfileIndex === 1 ? "bg-blue-500" : "bg-gray-600"
                }`}
              ></span>
              <span
                className="w-4 h-4 rounded-full bg-gray-600"
              ></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSlider;
