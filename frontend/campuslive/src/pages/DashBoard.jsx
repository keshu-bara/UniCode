import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/auth");
      return;
    }

    setUsername(storedUsername || "User");
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/auth");
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
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span>{username}</span>
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
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
          <h1 className="text-2xl font-bold mb-6">Welcome, {username}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Username:</span>
                  <span>{username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-gray-400">Connections</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-gray-400">Messages</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-gray-400">Notifications</div>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Community Section */}
          <div className="mt-6 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4">Developer Community</h2>
            <p className="text-gray-300 mb-4">
              Welcome to UniCode, where developers connect, collaborate, and
              grow together. Start by completing your profile and exploring the
              community.
            </p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300">
                Join Community
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition duration-300">
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
