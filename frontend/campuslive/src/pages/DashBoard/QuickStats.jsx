import React from "react";
import { FaCode, FaLaptopCode, FaGithub, FaTrophy } from "react-icons/fa";

const QuickStats = ({ skills, projects, userProfile, leetCodeStats }) => {
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
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <FaGithub className="text-purple-500" size={20} />
          </div>
          <div className="text-2xl font-bold">
            {userProfile.githubProfile ? 1 : 0}
          </div>
          <div className="text-sm text-gray-400">GitHub</div>
        </div>

        {/* LeetCode Stats */}
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <FaTrophy className="text-yellow-500" size={20} />
          </div>
          <div className="text-2xl font-bold">
            {userProfile.leetCodeProfile ? leetCodeStats.solved : 0}
          </div>
          <div className="text-sm text-gray-400">LeetCode Problems</div>
        </div>


      </div>

      {/* Connect profiles prompt */}
      {(!userProfile.githubProfile ||
        !userProfile.linkedinProfile ||
        !userProfile.leetCodeProfile) && (
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
