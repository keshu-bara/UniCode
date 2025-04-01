import React from "react";
import { 
  FaCode, 
  FaLaptopCode, 
  FaGithub, 
  FaTrophy, 
  FaTerminal, 
  FaCodeBranch 
} from "react-icons/fa";
import { GithubStatsCompact } from "./GithubStats";
// Import images from assets folder
import codechefLogo from "../../assets/images/codechef.png"; // Update this path to match your actual file
import codeforcesLogo from "../../assets/images/codeforces.png"; // Update this path to match your actual file

const QuickStats = ({ 
  skills, 
  projects, 
  userProfile, 
  leetCodeStats, 
  setActiveTab, 
  gitHubStats,
  codeChefStats = null,  // New prop for CodeChef stats
  codeForcesStats = null  // New prop for CodeForces stats
}) => {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
      <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Projects Stats */}
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <FaLaptopCode className="text-blue-500" size={20} />
          </div>
          <div className="text-2xl font-bold">{projects.length}</div>
          <div className="text-sm text-gray-400">Projects</div>
        </div>

        {/* Skills Stats */}
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <FaCode className="text-green-500" size={20} />
          </div>
          <div className="text-2xl font-bold">{skills.length}</div>
          <div className="text-sm text-gray-400">Skills</div>
        </div>
        
        {/* GitHub Stats */}
        <button
          onClick={() => setActiveTab("github")}
          className="w-full text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-lg"
        >
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-2">
              <FaGithub className="text-purple-500" size={20} />
            </div>
            <div className="text-2xl font-bold">
              {userProfile.githubProfile && gitHubStats ? gitHubStats.repos : 0}
            </div>
            <div className="text-sm text-gray-400">GitHub Repos</div>
          </div>
        </button>

        {/* LeetCode Stats */}
        <button
          onClick={() => setActiveTab("leetcode")}
          className="w-full text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-lg"
        >
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-2">
              <FaTrophy className="text-yellow-500" size={20} />
            </div>
            <div className="text-2xl font-bold">
              {userProfile.leetCodeProfile ? leetCodeStats.solved : 0}
            </div>
            <div className="text-sm text-gray-400">LeetCode Problems</div>
          </div>
        </button>

        {/* CodeChef Stats - Using image instead of icon */}
        <button
          onClick={() => setActiveTab("codechef")}
          className="w-full text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-lg"
        >
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-2">
              <img 
                src={codechefLogo} 
                alt="CodeChef Logo" 
                className="h-5 w-auto" 
              />
            </div>
            <div className="text-2xl font-bold">
              {userProfile.codeChefProfile && codeChefStats ? codeChefStats.rating : "--"}
            </div>
            <div className="text-sm text-gray-400">CodeChef Rating</div>
          </div>
        </button>

        {/* CodeForces Stats - Using image instead of icon */}
        <button
          onClick={() => setActiveTab("codeforces")}
          className="w-full text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-lg"
        >
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-2">
              <img 
                src={codeforcesLogo} 
                alt="CodeForces Logo" 
                className="h-5 w-auto" 
              />
            </div>
            <div className="text-2xl font-bold">
              {userProfile.codeForcesProfile && codeForcesStats ? codeForcesStats.rating : "--"}
            </div>
            <div className="text-sm text-gray-400">CodeForces Rating</div>
          </div>
        </button>

        {/* Compact stats sections can be uncommented when needed */}
        {/* {userProfile.githubProfile && gitHubStats && (
          <GithubStatsCompact
            gitHubStats={gitHubStats}
            userProfile={userProfile}
            setActiveTab={setActiveTab}
          />
        )} */}
      </div>

      {/* Connect profiles prompt */}
      {(!userProfile.githubProfile ||
        !userProfile.linkedinProfile ||
        !userProfile.leetCodeProfile ||
        !userProfile.codeChefProfile ||
        !userProfile.codeForcesProfile) && (
        <div className="mt-4 p-3 bg-blue-600/30 rounded-lg text-sm">
          <p>
            💡 Tip: Connect your developer profiles to showcase your skills!
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickStats;
