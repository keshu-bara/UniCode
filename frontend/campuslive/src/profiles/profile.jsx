import React, { useState, useEffect } from "react";

export default function ProfileCard() {

  const API_KEY = import.meta.env.VITE_API_URL;
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

  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_KEY}/api/home/profiles/`);
        const data = await response.json();
        
        // Check if data is an array (multiple profiles) or a single profile object
        if (Array.isArray(data)) {
          // Transform each profile in the array
          const transformedProfiles = data.map((profile, index) => transformProfileData(profile, index));
          setProfiles(transformedProfiles.length > 0 ? transformedProfiles : initialProfiles);
        } else if (data && typeof data === 'object') {
          // Transform single profile and create an array with it
          const transformedProfile = transformProfileData(data, 1);
          setProfiles([transformedProfile]);
        } else {
          setProfiles(initialProfiles);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setProfiles(initialProfiles); // Fallback to initial profiles in case of error
      }
    };
    
    // Helper function to transform profile data
    const transformProfileData = (profileData, index) => {
      // Parse skills if they are stored as a string
      let parsedSkills = [];
      
      // Handle different formats of skills data
      if (Array.isArray(profileData.skills)) {
        // Remove any JSON artifacts like "[" or "]" that might be in the array
        parsedSkills = profileData.skills
          .filter(skill => skill !== "[" && skill !== "]" && skill.trim() !== "")
          .slice(0, 4); // Limit to 4 skills
        
        // If skills are still empty but we have the string representation
        if (parsedSkills.length === 0) {
          try {
            // Try to parse the skills from a JSON string if available
            const skillsStr = profileData.skills.join('');
            if (skillsStr && skillsStr !== '[]') {
              parsedSkills = JSON.parse(skillsStr);
            }
          } catch (e) {
            console.log("Could not parse skills", e);
          }
        }
      }
      
      // If we still have no skills, provide some defaults based on other profile info
      if (parsedSkills.length === 0) {
        if (profileData.leetcode_profile) parsedSkills.push("DSA");
        if (profileData.github_profile) parsedSkills.push("GitHub");
        parsedSkills.push("Coding");
        parsedSkills.push("Development");
      }
      
      // Determine a role based on profile info
      let role = "Developer";
      if (profileData.leetcode_profile && !profileData.github_profile) {
        role = "DSA Enthusiast";
      } else if (profileData.github_profile && !profileData.leetcode_profile) {
        role = "Open Source Contributor";
      } else if (profileData.github_profile && profileData.leetcode_profile) {
        role = "Full Stack Developer";
      }
      
      // Use username if full_name is not available
      const name = profileData.full_name || profileData.username || `Developer ${index}`;
      
      // Use profile image if available, otherwise default avatar
      const avatar = profileData.profile_image_url || profileData.profileImageUrl || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
      
      return {
        id: profileData.id || index + 1,
        name: name,
        role: role,
        skills: parsedSkills,
        avatar: avatar,
      };
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
