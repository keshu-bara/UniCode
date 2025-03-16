import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    leetCodeProfile: "",
    githubProfile: "",
    linkedinProfile: "",
    profileImage: null,
    profileImageUrl: "",
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
  const API_BASE_URL = "http://192.168.1.114:8000/api";

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

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(
        "Fetching profile with token:",
        token?.substring(0, 15) + "..."
      );

      const response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile API response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Profile data received:", data);

        setUserProfile({
          fullName: data.full_name || "",
          email: data.email || "",
          bio: data.bio || "",
          leetCodeProfile: data.leetcode_profile || "",
          githubProfile: data.github_profile || "",
          linkedinProfile: data.linkedin_profile || "",
          profileImageUrl: data.profile_image_url || "",
          profileImage: null, // No file object initially
        });

        setSkills(data.skills || []);
        setProjects(data.projects || []);
      } else {
        console.log(
          "Profile not found or not accessible:",
          await response.text()
        );
        // Initialize with default empty values
        setUserProfile({
          fullName: localStorage.getItem("username") || "",
          email: "",
          bio: "",
          leetCodeProfile: "",
          githubProfile: "",
          linkedinProfile: "",
          profileImageUrl: "",
          profileImage: null,
        });
        setSkills([]);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserProfile((prev) => ({
        ...prev,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file), // Preview URL
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveStatus({ message: "Saving...", type: "info" });
      const token = localStorage.getItem("accessToken");

      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append("full_name", userProfile.fullName);
      formData.append("email", userProfile.email);
      formData.append("bio", userProfile.bio);
      formData.append("leetcode_profile", userProfile.leetCodeProfile);
      formData.append("github_profile", userProfile.githubProfile);
      formData.append("linkedin_profile", userProfile.linkedinProfile);

      // Add skills and projects as JSON strings
      formData.append("skills", JSON.stringify(skills));
      formData.append("projects", JSON.stringify(projects));

      // Add profile image if selected
      if (userProfile.profileImage) {
        formData.append("profile_image", userProfile.profileImage);
      }

      console.log("Sending profile data...");

      const response = await fetch(`${API_BASE_URL}/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData
        },
        body: formData,
      });

      console.log("Save response status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Save response:", responseData);

        setSaveStatus({
          message: "Profile saved successfully!",
          type: "success",
        });

        // Refresh profile data to ensure we display the latest
        fetchUserProfile();

        setIsEditingProfile(false);
        setTimeout(() => setSaveStatus({ message: "", type: "" }), 3000);
      } else {
        const errorData = await response.json();
        console.error("API error:", errorData);

        setSaveStatus({
          message: `Failed to save profile: ${
            errorData.message || errorData.error || "Unknown error"
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

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
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
    console.log("Removing project with ID:", projectId);
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
    <div className="min-h-screen bg-gray-900/50 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800/50 border-b border-gray-700 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center text-2xl font-bold">
              <span className="text-white">Uni</span>
              <span className="text-blue-500">Code</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                  {userProfile.profileImageUrl ? (
                    <img
                      src={userProfile.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    username.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="hidden sm:inline">{username}</span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
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
                      <label className="block text-gray-300 mb-1">Email</label>
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
                      <label className="block text-gray-300 mb-1">Bio</label>
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
                  <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                  
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
                        <span className="text-right">{userProfile.fullName}</span>
                      </div>
                    )}
                    {userProfile.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-right">{userProfile.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Member Since:</span>
                      <span className="text-right">{new Date().toLocaleDateString()}</span>
                    </div>
                    
                    {/* Social profiles */}
                    {userProfile.githubProfile && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">GitHub:</span>
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
                        <span className="text-gray-400">LinkedIn:</span>
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
                        <span className="text-gray-400">LeetCode:</span>
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
                        <span className="text-gray-400 block mb-1">Bio:</span>
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
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">{skills.length}</div>
                  <div className="text-sm text-gray-400">Skills</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {userProfile.githubProfile ? 1 : 0}
                  </div>
                  <div className="text-sm text-gray-400">GitHub</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {userProfile.leetCodeProfile ? 1 : 0}
                  </div>
                  <div className="text-sm text-gray-400">LeetCode</div>
                </div>
              </div>
              
              {/* Connect profiles prompt */}
              {(!userProfile.githubProfile || !userProfile.linkedinProfile || !userProfile.leetCodeProfile) && (
                <div className="mt-4 p-3 bg-blue-600/30 rounded-lg text-sm">
                  <p>
                    💡 Tip: Connect your developer profiles to showcase your skills!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
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

          {/* Projects Section */}
          <div className="mt-6 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
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

          {/* LeetCode Section */}
          <div className="mt-6 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4">DSA Practice</h2>
            {userProfile.leetCodeProfile ? (
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="font-medium">LeetCode Profile</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Track your DSA progress with your linked LeetCode account
                    </p>
                  </div>
                  <a
                    href={userProfile.leetCodeProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded transition duration-300 text-sm font-medium"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h3 className="font-medium mb-2">
                  Connect Your LeetCode Profile
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Showcase your problem-solving skills by linking your LeetCode
                  profile. Edit your profile to add your LeetCode URL.
                </p>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300 text-sm"
                >
                  Connect LeetCode
                </button>
              </div>
            )}
          </div>

          {/* Developer Community Section */}
          <div className="mt-6 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4">Developer Community</h2>
            <p className="text-gray-300 text-sm">
              Join our developer community to connect with other developers,
              share your projects, and get feedback.
            </p>
            <button
              onClick={() => navigate("/community")}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300 text-sm"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


