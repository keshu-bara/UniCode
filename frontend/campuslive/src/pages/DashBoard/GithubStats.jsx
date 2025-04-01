import React from "react";
import {
  FaGithub,
  FaCodeBranch,
  FaStar,
  FaCode,
  FaUsers,
  FaGitAlt,
  FaFire,
  FaCalendarAlt,
  FaTerminal
} from "react-icons/fa";
import { GoRepo, GoGitPullRequest, GoGitCommit } from "react-icons/go";

const GithubStats = ({ gitHubStats, userProfile, setIsEditingProfile }) => {
  const hasGithubProfile = userProfile?.githubProfile && gitHubStats;

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FaGithub className="mr-2 text-gray-400" />
        GitHub Stats
      </h2>

      {hasGithubProfile ? (
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <img
              src={gitHubStats.avatarUrl}
              alt={`${gitHubStats.username}'s avatar`}
              className="w-24 h-24 rounded-full ring-2 ring-blue-500/50"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold">{gitHubStats.name || gitHubStats.username}</h3>
              {gitHubStats.bio && (
                <p className="text-gray-300 mt-1 text-sm">{gitHubStats.bio}</p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                {gitHubStats.location && (
                  <div className="text-xs text-gray-400 flex items-center">
                    <span className="mr-1">📍</span> {gitHubStats.location}
                  </div>
                )}
                {gitHubStats.company && (
                  <div className="text-xs text-gray-400 flex items-center">
                    <span className="mr-1">🏢</span> {gitHubStats.company}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid - Terminal Style */}
          <div className="bg-gray-900/80 p-4 rounded-lg border border-gray-700 font-mono">
            <div className="flex items-center mb-2 text-green-500 text-sm">
              <FaTerminal className="mr-2" />
              <span className="text-gray-400 mr-1">$</span> git stats --user {gitHubStats.username}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Repositories</span>
                  <GoRepo className="text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{gitHubStats.repos || 0}</div>
              </div>
              
              <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Stars</span>
                  <FaStar className="text-yellow-400" />
                </div>
                <div className="text-xl font-bold text-white">{gitHubStats.stars || 0}</div>
              </div>
              
              <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Followers</span>
                  <FaUsers className="text-purple-400" />
                </div>
                <div className="text-xl font-bold text-white">{gitHubStats.followers || 0}</div>
              </div>
              
              <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Following</span>
                  <FaUsers className="text-green-400" />
                </div>
                <div className="text-xl font-bold text-white">{gitHubStats.following || 0}</div>
              </div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <GoGitCommit className="mr-2 text-green-500" />
              Contribution Activity
            </h3>
            
            <img 
              src={gitHubStats.statsCardUrl} 
              alt="GitHub Stats" 
              className="w-full rounded-lg"
            />
          </div>
          
          {/* GitHub Top Languages & Streak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <FaCode className="mr-2 text-blue-500" />
                Top Languages
              </h3>
              <img 
                src={gitHubStats.topLangsUrl} 
                alt="Top Languages" 
                className="w-full rounded-lg"
              />
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <FaFire className="mr-2 text-orange-500" />
                Contribution Streak
              </h3>
              <img 
                src={gitHubStats.streakStatsUrl} 
                alt="GitHub Streak" 
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Git command-like section */}
          <div className="font-mono bg-gray-900/80 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2 text-green-500 text-sm">
              <FaTerminal className="mr-2" />
              <span className="text-gray-400 mr-1">$</span> git profile --open
            </div>
            <div className="mt-3 bg-gray-800/90 p-3 rounded-lg border border-green-700/30">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">➜</span> Opening GitHub profile for user: <span className="text-blue-400">{gitHubStats.username}</span>
              </div>
              <div className="mt-3 text-center">
                <a
                  href={userProfile.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-700/80 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded transition-all duration-300 text-sm group"
                >
                  <FaGithub className="mr-2 group-hover:scale-110 transition-transform" /> 
                  View Complete Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-800/30 rounded-lg border border-dashed border-gray-700">
          <div className="bg-gray-900/80 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4 ring-2 ring-gray-700">
            <FaGithub size={48} className="text-gray-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Connect Your GitHub Profile</h3>
          <div className="max-w-md mx-auto">
            <p className="text-gray-400 text-sm mb-6">
              <span className="block text-green-500 font-mono mb-1">&gt; git config --global user.profile</span>
              Showcase your coding projects, contributions and open-source work by connecting your GitHub profile.
            </p>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 text-sm font-medium flex items-center mx-auto"
            >
              <FaGithub className="mr-2" />
              Connect GitHub Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Compact version for the QuickStats section
export const GithubStatsCompact = ({
  gitHubStats,
  userProfile,
  setActiveTab,
}) => {
  if (!userProfile?.githubProfile || !gitHubStats) {
    return null;
  }

  return (
    <div className="col-span-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
      <div className="flex items-center justify-center gap-2 mb-3">
        <FaGithub className="text-gray-400" size={16} />
        <h3 className="text-sm font-semibold text-center text-gray-300">
          GitHub Activity
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="bg-gray-800/90 p-2 rounded text-center hover:bg-gray-700/70 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <GoRepo className="text-blue-400" size={14} />
          </div>
          <p className="text-sm font-bold text-white">
            {gitHubStats.repos || 0}
          </p>
          <h4 className="text-xs font-medium text-gray-400">Repos</h4>
        </div>

        <div className="bg-gray-800/90 p-2 rounded text-center hover:bg-gray-700/70 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <FaStar className="text-yellow-400" size={14} />
          </div>
          <p className="text-sm font-bold text-white">
            {gitHubStats.stars || 0}
          </p>
          <h4 className="text-xs font-medium text-gray-400">Stars</h4>
        </div>

        <div className="bg-gray-800/90 p-2 rounded text-center hover:bg-gray-700/70 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <GoGitPullRequest className="text-purple-400" size={14} />
          </div>
          <p className="text-sm font-bold text-white">
            {gitHubStats.pullRequests || 0}
          </p>
          <h4 className="text-xs font-medium text-gray-400">PRs</h4>
        </div>

        <div className="bg-gray-800/90 p-2 rounded text-center hover:bg-gray-700/70 transition-colors">
          <div className="flex items-center justify-center mb-1">
            <FaUsers className="text-green-400" size={14} />
          </div>
          <p className="text-sm font-bold text-white">
            {gitHubStats.followers || 0}
          </p>
          <h4 className="text-xs font-medium text-gray-400">Followers</h4>
        </div>
      </div>

      {/* Animated activity chart */}
      <div className="mt-3 w-full h-10 bg-gray-900/70 rounded-md overflow-hidden border border-gray-800/50 relative">
        <div className="absolute inset-0 opacity-30 flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-mono">git commit frequency</span>
        </div>
        <div className="flex items-end justify-between h-full px-1 pt-3">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-green-500/70 hover:bg-green-400 transition-all duration-300"
                style={{
                  height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                  opacity: 0.3 + Math.random() * 0.7,
                  animation: `pulse ${1 + Math.random() * 2}s infinite alternate`,
                }}
              ></div>
            ))}
        </div>
      </div>

      {/* Link to GitHub profile */}
      <div className="mt-3 text-center">
        <button
          onClick={() => setActiveTab("github")}
          className="text-xs bg-gray-800/90 hover:bg-gray-700 px-3 py-1.5 rounded-full transition duration-300 inline-flex items-center border border-gray-700 hover:border-gray-600 group"
        >
          <FaGithub className="mr-1.5 group-hover:rotate-12 transition-transform" size={12} />
          View Details
        </button>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scaleY(0.98); }
          100% { transform: scaleY(1.02); }
        }
      `}</style>
    </div>
  );
};

export default GithubStats;
