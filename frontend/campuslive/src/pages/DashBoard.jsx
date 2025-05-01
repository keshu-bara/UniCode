import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaGithub, FaLinkedin, FaCode, FaLaptopCode, FaBriefcase, FaTrophy } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";
import QuickStats from "./DashBoard/QuickStats";
import LeetCodeStats from "./DashBoard/LeetCodeStats";
import GithubStats, { GithubStatsCompact } from "./DashBoard/GithubStats";

const Dashboard = () => {
  //leetcode solved problems stats
  const [leetCodeStats, setLeetCodeStats] = useState({ solved: 0 });
  //github stats
  const [gitHubStats, setGitHubStats] = useState(null);
  // Update the fetchLeetCodeStats function
  const fetchLeetCodeStats = async (leetCodeUrl) => {
    if (!leetCodeUrl) return;

    try {
      // Extract username from LeetCode URL
      const urlParts = leetCodeUrl.split("/");
      const leetCodeUsername =
        urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

      if (!leetCodeUsername) return;

      // console.log("Fetching LeetCode stats for:", leetCodeUsername);

      // Make the API call
      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`
      );

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("LeetCode API response:", data);

      if (data) {
        // Set all the stats we need for the detailed view
        setLeetCodeStats({
          solved: data.totalSolved || 0,
          totalSolved: data.totalSolved || 0,
          totalQuestions: data.totalQuestions || 0,
          easySolved: data.easySolved || 0,
          totalEasy: data.totalEasy || 0,
          mediumSolved: data.mediumSolved || 0,
          totalMedium: data.totalMedium || 0,
          hardSolved: data.hardSolved || 0,
          totalHard: data.totalHard || 0,
          acceptanceRate: data.acceptanceRate || 0,
          ranking: data.ranking || 0,
          contributionPoints: data.contributionPoints || 0,
          reputation: data.reputation || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
      // Set default values in case of error
      setLeetCodeStats({
        solved: 0,
        totalSolved: 0,
        totalQuestions: 0,
        easySolved: 0,
        totalEasy: 0,
        mediumSolved: 0,
        totalMedium: 0,
        hardSolved: 0,
        totalHard: 0,
        acceptanceRate: 0,
        ranking: 0,
        contributionPoints: 0,
        reputation: 0,
      });
    }
  };

  const API_KEY = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    leetCodeProfile: "",
    githubProfile: "",
    linkedinProfile: "",
    profileImage: null,
    profileImageUrl: "",
    is_public: true,
  });

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
  });
  const [saveStatus, setSaveStatus] = useState({ message: "", type: "" });
  

  // API base URL - keep this in one place for easy updates
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const API_BASE_URL = `${API_KEY}/api`;

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/auth");
      return;
    }

    setUsername(storedUsername || "User");

    // Fetch user profile data
    fetchUserProfile();

    setLoading(false);
  }, [navigate]);
  useEffect(() => {
    if (userProfile.leetCodeProfile) {
      fetchLeetCodeStats(userProfile.leetCodeProfile);
    }
  }, [userProfile.leetCodeProfile]);

  useEffect(() => {
    const fetchStats = async () => {
      if (userProfile.githubProfile) {
        const stats = await fetchGitHubStats(userProfile.githubProfile);
        setGitHubStats(stats);
      }
    };
    
    fetchStats();
  }, [userProfile.githubProfile]);

  // Add this function to fetch GitHub stats if a GitHub profile is provided
  const fetchGitHubStats = async (githubUrl) => {
    if (!githubUrl) return null;

    try {
      // Extract username from GitHub URL
      const urlParts = githubUrl.split("/");
      const githubUsername = 
        urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

      if (!githubUsername) return null;

      // console.log("Fetching GitHub stats for:", githubUsername);

      // Public GitHub API endpoint - no authentication required for basic public data
      const response = await fetch(`https://api.github.com/users/${githubUsername}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log("GitHub user data:", data);
      
      // Just extract the fields we need from the public API
      return {
        username: githubUsername,
        repos: data.public_repos || 0,
        followers: data.followers || 0,
        following: data.following || 0,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
        bio: data.bio,
        company: data.company,
        location: data.location,
        name: data.name,
        // These URLs can be used directly in <img> tags
        statsCardUrl: `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&count_private=true`,
        topLangsUrl: `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=dark&hide_border=true`,
        streakStatsUrl: `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true`
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return null;
    }
  };

  // Existing refreshAccessToken function remains the same
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.log("No refresh token available");
        return null;
      }

      // console.log("Attempting to refresh token...");

      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Token refreshed successfully");

        // Store the new access token
        localStorage.setItem("accessToken", data.access);
        return data.access;
      } else {
        // console.log("Failed to refresh token, status:", response.status);
        // If refresh token is invalid or expired, log the user out
        handleLogout();
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  // Modify fetchUserProfile to also get GitHub stats
  const fetchUserProfile = async () => {
    try {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        // console.log("No token found, redirecting to login");
        navigate("/auth");
        return;
      }

      // console.log(
      //   "Fetching profile with token:",
      //   token?.substring(0, 15) + "..."
      // );

      // First attempt with current token
      let response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log("Profile API response status:", response.status);

      // If unauthorized, try refreshing the token and retry
      if (response.status === 401) {
        // console.log("Token expired, attempting to refresh...");
        const newToken = await refreshAccessToken();

        if (!newToken) {
          // console.log("Could not refresh token, redirecting to login");
          navigate("/auth");
          return;
        }

        // console.log(
        //   "Retrying with new token:",
        //   newToken.substring(0, 15) + "..."
        // );

        // Retry with new token
        response = await fetch(`${API_BASE_URL}/profile/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newToken}`,
            "Content-Type": "application/json",
          },
        });

        // console.log("Retry profile API response status:", response.status);
      }

      if (response.ok) {
        const data = await response.json();
        // console.log("Profile data received:", data);

        // Parse skills properly to handle the array with bracket characters
        let parsedSkills = [];
        if (Array.isArray(data.skills)) {
          // Filter out bracket characters and empty strings
          parsedSkills = data.skills.filter(
            (skill) => skill !== "[" && skill !== "]" && skill.trim() !== ""
          );

          // If the skills array is empty or only contains brackets, check if it might be a string representation
          if (parsedSkills.length === 0) {
            try {
              const skillsStr = data.skills.join("");
              if (skillsStr && skillsStr !== "[]") {
                // Try to parse a JSON string if that's how it's stored
                parsedSkills = JSON.parse(skillsStr);
              }
            } catch (e) {
              console.log("Could not parse skills from joined string:", e);
            }
          }
        }

        const updatedProfile = {
          fullName: data.full_name || "",
          email: data.email || "",
          bio: data.bio || "",
          leetCodeProfile: data.leetcode_profile || data.leetCodeProfile || "",
          githubProfile: data.github_profile || data.githubProfile || "",
          linkedinProfile: data.linkedin_profile || data.linkedinProfile || "",
          profileImageUrl: data.profile_image_url || data.profileImageUrl || "",
          profileImage: null, // No file object initially
          is_public: data.is_public !== undefined ? data.is_public : true,
        };

        setUserProfile(updatedProfile);
        setSkills(parsedSkills);
        setProjects(data.projects || []);

        // Fetch GitHub stats if GitHub profile is provided
        if (updatedProfile.githubProfile) {
          const stats = await fetchGitHubStats(updatedProfile.githubProfile);
          setGitHubStats(stats);
        }
      } else {
        console.error("Profile API error:", response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error("Error details:", errorData);

        // Handle other error cases
        if (response.status === 403) {
          setSaveStatus({
            message: "You don't have permission to access this profile",
            type: "error",
          });
        } else {
          setSaveStatus({
            message: "Failed to load profile",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setSaveStatus({
        message: "Network error. Please try again.",
        type: "error",
      });
    }
  };

  // All other existing functions remain the same
  // handleLogout, handleProfileChange, handleImageChange, handleSaveProfile, etc.

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/auth");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update handleImageChange function
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // First update the image preview
        setUserProfile((prev) => ({
          ...prev,
          profileImage: file,
          profileImageUrl: URL.createObjectURL(file),
        }));

        // Then send the image to backend
        await handleProfileImageUpdate(file);
      } catch (error) {
        console.error("Error handling image change:", error);
        setSaveStatus({
          message: "Failed to update profile image. Please try again.",
          type: "error",
        });
      }
    }
  };

  // Update handleProfileImageUpdate function
  const handleProfileImageUpdate = async (imageFile) => {
    try {
      setSaveStatus({ message: "Uploading image...", type: "info" });
      const formData = new FormData();
      formData.append("profile_image", imageFile);

      let token = localStorage.getItem("accessToken");
      if (!token) {
        setSaveStatus({
          message: "Session expired. Please login again.",
          type: "error",
        });
        navigate("/auth");
        return;
      }

      // Changed the endpoint to /profile/ since that's the main endpoint
      let response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "PATCH", // Changed to PATCH for partial update
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      // Handle token refresh if needed
      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          setSaveStatus({
            message: "Session expired. Please login again.",
            type: "error",
          });
          return;
        }

        response = await fetch(`${API_BASE_URL}/profile/`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${newToken}`
          },
          body: formData
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Image upload response:", data);

        if (data.profile_image_url) {
          setUserProfile(prev => ({
            ...prev,
            profileImageUrl: data.profile_image_url
          }));

          setSaveStatus({
            message: "Profile image updated successfully!",
            type: "success",
          });
        } else {
          throw new Error("No image URL in response");
        }
        
        setTimeout(() => setSaveStatus({ message: "", type: "" }), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to update profile image:", errorData);
        setSaveStatus({
          message: errorData.message || "Failed to update profile image. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      setSaveStatus({
        message: "Network error. Please try again.",
        type: "error",
      });
    }
  };

  // Update handleSaveProfile to handle both profile data and image
  const handleSaveProfile = async () => {
    try {
      setSaveStatus({ message: "Saving profile...", type: "info" });
      let token = localStorage.getItem("accessToken");

      if (!token) {
        setSaveStatus({
          message: "Session expired. Please login again.",
          type: "error",
        });
        navigate("/auth");
        return;
      }

      // Create the profile data object
      const profileData = {
        full_name: userProfile.fullName,
        email: userProfile.email,
        bio: userProfile.bio,
        leetcode_profile: userProfile.leetCodeProfile,
        github_profile: userProfile.githubProfile,
        linkedin_profile: userProfile.linkedinProfile,
        is_public: userProfile.is_public ? "True" : "False",
        skills: skills,
        projects: projects
      };

      console.log("Sending profile update:", profileData);

      let response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      // Handle token refresh if needed
      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          setSaveStatus({
            message: "Session expired. Please login again.",
            type: "error",
          });
          return;
        }

        response = await fetch(`${API_BASE_URL}/profile/`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
        });
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Profile update response:", responseData);

        // If there's a new profile image, upload it
        if (userProfile.profileImage) {
          await handleProfileImageUpdate(userProfile.profileImage);
        }

        setSaveStatus({
          message: "Profile saved successfully!",
          type: "success",
        });

        setIsEditingProfile(false);
        setTimeout(() => setSaveStatus({ message: "", type: "" }), 3000);

        // Refresh profile data to ensure we display the latest
        await fetchUserProfile();
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        setSaveStatus({
          message: `Failed to save profile: ${
            errorData.message || errorData.error || JSON.stringify(errorData)
          }`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveStatus({
        message: "Network error. Please try again.",
        type: "error",
      });
    }
  };

  // Update the addSkill function
  const addSkill = async () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      try {
        // Create new array with unique skills
        const updatedSkills = Array.from(new Set([...skills, newSkill.trim()]));
        
        // First, get current token
        let token = localStorage.getItem("accessToken");
        if (!token) {
          setSaveStatus({
            message: "Session expired. Please login again.",
            type: "error",
          });
          navigate("/auth");
          return;
        }

        // Prepare the profile data
        const profileData = {
          full_name: userProfile.fullName,
          email: userProfile.email,
          bio: userProfile.bio,
          leetcode_profile: userProfile.leetCodeProfile,
          github_profile: userProfile.githubProfile,
          linkedin_profile: userProfile.linkedinProfile,
          is_public: userProfile.is_public ? "True" : "False",
          skills: updatedSkills, // Send as array directly
          projects: projects
        };

        console.log("Sending profile update with skills:", updatedSkills);

        // Make the API call
        let response = await fetch(`${API_BASE_URL}/profile/`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
        });

        // Handle token refresh if needed
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (!newToken) {
            setSaveStatus({
              message: "Session expired. Please login again.",
              type: "error",
            });
            return;
          }

          // Retry with new token
          response = await fetch(`${API_BASE_URL}/profile/`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
          });
        }

        if (response.ok) {
          const responseData = await response.json();
          console.log("Profile update response:", responseData);
          
          // Update local state only after successful API call
          setSkills(updatedSkills);
          setNewSkill("");
          
          setSaveStatus({
            message: "Skill added successfully!",
            type: "success",
          });
          setTimeout(() => setSaveStatus({ message: "", type: "" }), 3000);

          // Optionally refresh the entire profile
          await fetchUserProfile();
        } else {
          const errorData = await response.json();
          console.error("Failed to update profile:", errorData);
          setSaveStatus({
            message: "Failed to add skill. Please try again.",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setSaveStatus({
          message: "Network error. Please try again.",
          type: "error",
        });
      }
    }
  };

  // Update the removeSkill function
  const removeSkill = async (skillToRemove) => {
    try {
      // Create new array without the removed skill
      const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
      
      // Create formData with all profile info
      const formData = new FormData();
      formData.append("full_name", userProfile.fullName);
      formData.append("email", userProfile.email);
      formData.append("bio", userProfile.bio);
      formData.append("leetcode_profile", userProfile.leetCodeProfile);
      formData.append("github_profile", userProfile.githubProfile);
      formData.append("linkedin_profile", userProfile.linkedinProfile);
      formData.append("is_public", userProfile.is_public ? "True" : "False");
      
      // Convert skills array to proper JSON format
      const skillsData = JSON.stringify(updatedSkills);
      formData.append("skills", skillsData);

      // Add existing projects
      formData.append("projects", JSON.stringify(projects));

      // Add profile image if exists
      if (userProfile.profileImage) {
        formData.append("profile_image", userProfile.profileImage);
      }

      // Log the skills being sent
      console.log("Sending updated skills data:", skillsData);

      let token = localStorage.getItem("accessToken");
      if (!token) {
        setSaveStatus({
          message: "Session expired. Please login again.",
          type: "error",
        });
        navigate("/auth");
        return;
      }

      let response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Handle token refresh if needed
      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          setSaveStatus({
            message: "Session expired. Please login again.",
            type: "error",
          });
          return;
        }

        response = await fetch(`${API_BASE_URL}/profile/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
          body: formData,
        });
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Profile update response:", responseData);
        
        // Update local state only after successful API call
        setSkills(updatedSkills);
        
        setSaveStatus({
          message: "Skill removed successfully!",
          type: "success",
        });
        setTimeout(() => setSaveStatus({ message: "", type: "" }), 3000);
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        setSaveStatus({
          message: "Failed to remove skill. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus({
        message: "Network error. Please try again.",
        type: "error",
      });
    }
  };

  const handleAddProject = () => {
    if (newProject.title.trim() === "") return;

    setProjects([...projects, { ...newProject, id: Date.now().toString() }]);
    setNewProject({
      title: "",
      description: "",
      repoUrl: "",
      demoUrl: "",
    });
    setIsAddingProject(false);
  };

  const removeProject = (projectId) => {
    // console.log("Removing project with ID:", projectId);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Enter key press for skill input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addSkill();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900/50">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Top Navigation */}
      <nav className="bg-gray-800/70 border-b border-gray-700 px-4 py-3 sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center text-2xl font-bold">
              <span className="text-white">Uni</span>
              <span className="text-blue-500">Code</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center space-x-2 focus:outline-none">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center border-2 border-blue-400">
                  {userProfile.profileImageUrl ? (
                    <img
                      src={userProfile.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-medium">{username}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded transition duration-300 flex items-center"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="bg-gray-800/30 w-full md:w-64 lg:w-72 border-r border-gray-700 md:min-h-[calc(100vh-58px)] backdrop-blur-sm">
          <div className="p-4">
            <div className="flex flex-col items-center text-center mb-6 p-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 mb-3 border-2 border-blue-400 shadow-lg">
                {userProfile.profileImageUrl ? (
                  <img
                    src={userProfile.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-semibold">
                {userProfile.fullName || username}
              </h2>
              <div className="text-sm text-gray-400 mt-1 flex items-center">
                {userProfile.is_public ? (
                  <>
                    <RiLockUnlockLine className="mr-1" /> Public Profile
                  </>
                ) : (
                  <>
                    <RiLockLine className="mr-1" /> Private Profile
                  </>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 mt-3">
                {userProfile.githubProfile && (
                  <a
                    href={userProfile.githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {userProfile.linkedinProfile && (
                  <a
                    href={userProfile.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-1 mt-8">
              {/* Navigation Links */}
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === "profile"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                } flex items-center`}
              >
                <HiOutlineDocumentDuplicate className="mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === "skills"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                } flex items-center`}
              >
                <FaCode className="mr-2" />
                Skills
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === "projects"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                } flex items-center`}
              >
                <FaLaptopCode className="mr-2" />
                Projects
              </button>
              <button
                onClick={() => setActiveTab("github")}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === "github"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                } flex items-center`}
              >
                <FaGithub className="mr-2" />
                GitHub Stats
              </button>
              <button
                onClick={() => setActiveTab("leetcode")}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === "leetcode"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                } flex items-center`}
              >
                <FaTrophy className="mr-2" />
                DSA Practice
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          {saveStatus.message && (
            <div
              className={`mb-4 p-3 rounded ${
                saveStatus.type === "success"
                  ? "bg-green-600/50"
                  : saveStatus.type === "error"
                  ? "bg-red-600/50"
                  : "bg-blue-600/50"
              }`}
            >
              {saveStatus.message}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
              <h1 className="text-2xl font-bold mb-6">Welcome, {username}!</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Section */}
                <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                  {isEditingProfile ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        Edit Your Profile
                      </h2>
                      <div className="space-y-4">
                        {/* Profile image upload */}
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-2 bg-gray-700 flex items-center justify-center">
                            {userProfile.profileImageUrl ? (
                              <img
                                src={userProfile.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-4xl text-gray-400">
                                {username.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <label className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer text-sm">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                            Change Photo
                          </label>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={userProfile.fullName}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={userProfile.email}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          />
                        </div>

                        {/* Social profiles */}
                        <div>
                          <label className="block text-gray-300 mb-1">
                            <FaGithub className="inline mr-2" />
                            GitHub Profile URL
                          </label>
                          <input
                            type="url"
                            name="githubProfile"
                            value={userProfile.githubProfile}
                            onChange={handleProfileChange}
                            placeholder="https://github.com/username"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1">
                            <FaLinkedin className="inline mr-2" />
                            LinkedIn Profile URL
                          </label>
                          <input
                            type="url"
                            name="linkedinProfile"
                            value={userProfile.linkedinProfile}
                            onChange={handleProfileChange}
                            placeholder="https://www.linkedin.com/in/username"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1">
                            <FaTrophy className="inline mr-2" />
                            LeetCode Profile URL
                          </label>
                          <input
                            type="url"
                            name="leetCodeProfile"
                            value={userProfile.leetCodeProfile}
                            onChange={handleProfileChange}
                            placeholder="https://leetcode.com/username"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Profile Visibility
                          </label>
                          <select
                            name="is_public"
                            value={userProfile.is_public ? "True" : "False"}
                            onChange={(e) => {
                              setUserProfile((prev) => ({
                                ...prev,
                                is_public: e.target.value === "True",
                              }));
                            }}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          >
                            <option value="True">Public</option>
                            <option value="False">Private</option>
                          </select>
                          <p className="text-xs text-gray-400 mt-1">
                            {userProfile.is_public
                              ? "Your profile will be visible to other users"
                              : "Your profile will be private"}
                          </p>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={userProfile.bio}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            rows="4"
                          ></textarea>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={handleSaveProfile}
                            className="flex-grow px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
                          >
                            Save Profile
                          </button>
                          <button
                            onClick={() => setIsEditingProfile(false)}
                            className="flex-grow px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        Your Profile
                      </h2>

                      {/* Add profile image display */}
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                          {userProfile.profileImageUrl ? (
                            <img
                              src={userProfile.profileImageUrl}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-3xl text-gray-400">
                              {username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Username:</span>
                          <span className="text-right">{username}</span>
                        </div>
                        {userProfile.fullName && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Full Name:</span>
                            <span className="text-right">
                              {userProfile.fullName}
                            </span>
                          </div>
                        )}
                        {userProfile.email && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-right">
                              {userProfile.email}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-400">Member Since:</span>
                          <span className="text-right">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>

                        {/* Social profiles */}
                        {userProfile.githubProfile && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 flex items-center">
                              <FaGithub className="mr-2" /> GitHub:
                            </span>
                            <a
                              href={userProfile.githubProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              View Profile
                            </a>
                          </div>
                        )}

                        {userProfile.linkedinProfile && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 flex items-center">
                              <FaLinkedin className="mr-2" /> LinkedIn:
                            </span>
                            <a
                              href={userProfile.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              View Profile
                            </a>
                          </div>
                        )}

                        {userProfile.leetCodeProfile && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 flex items-center">
                              <FaTrophy className="mr-2" /> LeetCode:
                            </span>
                            <a
                              href={userProfile.leetCodeProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              View Profile
                            </a>
                          </div>
                        )}

                        {userProfile.bio && (
                          <div>
                            <span className="text-gray-400 block mb-1">
                              Bio:
                            </span>
                            <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded">
                              {userProfile.bio}
                            </p>
                          </div>
                        )}
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Stats Section */}
                <QuickStats
                  skills={skills}
                  projects={projects}
                  userProfile={userProfile}
                  leetCodeStats={leetCodeStats}
                  setActiveTab={setActiveTab}
                  gitHubStats={gitHubStats}  // Also make sure to pass this prop
                ></QuickStats>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-600/40 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-gray-300 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-gray-400 text-sm italic">
                    No skills added yet. Add your first skill below!
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., JavaScript, React, Python)"
                  className="flex-grow px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition duration-300 whitespace-nowrap"
                >
                  Add Skill
                </button>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition duration-300 text-sm"
                >
                  {isAddingProject ? "Cancel" : "Add Project"}
                </button>
              </div>

              {isAddingProject && (
                <div className="bg-gray-800/70 p-4 rounded-lg mb-6 border border-gray-600">
                  <h3 className="font-medium mb-3">Add New Project</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Project Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleProjectChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleProjectChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        rows="2"
                        placeholder="Brief description of your project"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Repository URL
                        </label>
                        <input
                          type="url"
                          name="repoUrl"
                          value={newProject.repoUrl}
                          onChange={handleProjectChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Demo URL
                        </label>
                        <input
                          type="url"
                          name="demoUrl"
                          value={newProject.demoUrl}
                          onChange={handleProjectChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          placeholder="https://myproject.com"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleAddProject}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition duration-300"
                      >
                        Add Project
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-600"
                    >
                      <div className="flex flex-wrap justify-between items-start">
                        <h3 className="font-medium mb-1">{project.title}</h3>
                        <button
                          onClick={() => removeProject(project.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      {project.description && (
                        <p className="text-sm text-gray-300 mt-1 mb-3">
                          {project.description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-3">
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition duration-300"
                          >
                            Repository
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded-full transition duration-300"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No projects added yet. Click "Add Project" to showcase your
                  work!
                </p>
              )}
            </div>
          )}

          {activeTab === "github" && (
            <GithubStats
              gitHubStats={gitHubStats}
              userProfile={userProfile}
              setIsEditingProfile={setIsEditingProfile}
            />
          )}

          {activeTab === "leetcode" && (
            <LeetCodeStats
              leetCodeStats={leetCodeStats}
              userProfile={userProfile}
              setIsEditingProfile={setIsEditingProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
};

  

export default Dashboard;


