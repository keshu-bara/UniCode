import React from "react";
import { FaTrophy, FaCode, FaLaptopCode, FaUserAstronaut } from "react-icons/fa";

const LeetCodeStats = ({ leetCodeStats, userProfile, setIsEditingProfile }) => {
  // If this is being rendered as a tab, we'll show something even if there's no profile
  const hasLeetCodeProfile = userProfile?.leetCodeProfile && leetCodeStats;

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6">DSA Practice</h2>

      {/* Profile Connection Status */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
          <div className="mb-3 sm:mb-0">
            <h3 className="font-medium">LeetCode Profile</h3>
            <p className="text-sm text-gray-400 mt-1">
              {hasLeetCodeProfile
                ? "Track your DSA progress with your linked LeetCode account"
                : "Connect your LeetCode account to track your progress"}
            </p>
          </div>
          
          {hasLeetCodeProfile ? (
            <a
              href={userProfile.leetCodeProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded transition duration-300 text-sm font-medium flex items-center"
            >
              <FaTrophy className="mr-2" />
              View Profile
            </a>
          ) : (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-300 text-sm flex items-center"
            >
              <FaCode className="mr-2" />
              Connect LeetCode
            </button>
          )}
        </div>
      </div>

      {/* Stats Section - Only shown if profile is connected */}
      {hasLeetCodeProfile && (
        <div className="space-y-6">
          {/* User profile overview */}
          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center">
                <FaUserAstronaut className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-white">
                  {leetCodeStats.ranking ? `Rank #${leetCodeStats.ranking}` : "LeetCoder"}
                </h3>
                <p className="text-xs text-gray-400">
                  {leetCodeStats.acceptanceRate || 0}% acceptance rate
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {leetCodeStats.totalSolved || 0}
              </div>
              <p className="text-xs text-gray-400">problems solved</p>
            </div>
          </div>
          
          {/* Problem difficulty breakdown */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">Problem Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Easy Problems */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-green-900/30">
                <h4 className="text-sm font-medium text-green-400 mb-1">Easy</h4>
                <p className="text-xl font-bold text-white">
                  {leetCodeStats.easySolved || 0}
                  <span className="text-xs text-gray-400 ml-1">
                    / {leetCodeStats.totalEasy || 0}
                  </span>
                </p>
                <div className="mt-2 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
                    style={{
                      width: `${(leetCodeStats.easySolved / leetCodeStats.totalEasy) * 100 || 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium Problems */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-yellow-900/30">
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Medium</h4>
                <p className="text-xl font-bold text-white">
                  {leetCodeStats.mediumSolved || 0}
                  <span className="text-xs text-gray-400 ml-1">
                    / {leetCodeStats.totalMedium || 0}
                  </span>
                </p>
                <div className="mt-2 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-500 h-full"
                    style={{
                      width: `${(leetCodeStats.mediumSolved / leetCodeStats.totalMedium) * 100 || 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Hard Problems */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-red-900/30">
                <h4 className="text-sm font-medium text-red-400 mb-1">Hard</h4>
                <p className="text-xl font-bold text-white">
                  {leetCodeStats.hardSolved || 0}
                  <span className="text-xs text-gray-400 ml-1">
                    / {leetCodeStats.totalHard || 0}
                  </span>
                </p>
                <div className="mt-2 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${(leetCodeStats.hardSolved / leetCodeStats.totalHard) * 100 || 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Distribution progress bar */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-300">Difficulty Distribution</h3>
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
              <div className="flex h-full">
                {(() => {
                  // Extract values with fallbacks
                  const easySolved = parseInt(leetCodeStats.easySolved) || 0;
                  const mediumSolved = parseInt(leetCodeStats.mediumSolved) || 0;
                  const hardSolved = parseInt(leetCodeStats.hardSolved) || 0;

                  // Calculate total from our own values to ensure consistency
                  const localTotal = easySolved + mediumSolved + hardSolved;

                  // If no problems solved, show empty bar with equal placeholder segments
                  if (localTotal === 0) {
                    return (
                      <>
                        <div
                          className="bg-gray-600 h-full"
                          style={{ width: "33.3%" }}
                        ></div>
                        <div
                          className="bg-gray-600 h-full"
                          style={{ width: "33.3%" }}
                        ></div>
                        <div
                          className="bg-gray-600 h-full"
                          style={{ width: "33.4%" }}
                        ></div>
                      </>
                    );
                  }

                  // Calculate percentages based on our local total
                  const easyPercent = (easySolved / localTotal) * 100;
                  const mediumPercent = (mediumSolved / localTotal) * 100;
                  const hardPercent = (hardSolved / localTotal) * 100;

                  return (
                    <>
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${easyPercent}%` }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-full"
                        style={{ width: `${mediumPercent}%` }}
                      ></div>
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${hardPercent}%` }}
                      ></div>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-gray-400">Easy</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                <span className="text-gray-400">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                <span className="text-gray-400">Hard</span>
              </div>
            </div>
          </div>

          {/* Additional stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm text-gray-400 mb-1">Contribution Points</h4>
              <p className="text-xl font-bold text-white">{leetCodeStats.contributionPoints || 0}</p>
            </div>
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm text-gray-400 mb-1">Overall Progress</h4>
              <p className="text-xl font-bold text-white">
                {((leetCodeStats.totalSolved / leetCodeStats.totalQuestions) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// This is the mini-version component for the QuickStats section
export const LeetCodeStatsCompact = ({ leetCodeStats, userProfile }) => {
  // Don't render anything if no LeetCode profile or stats
  if (!userProfile?.leetCodeProfile || !leetCodeStats) {
    return null;
  }

  return (
    <div className="col-span-2 bg-gray-800/50 p-4 rounded-lg">
      <div className="flex items-center justify-center gap-2 mb-3">
        <FaTrophy className="text-yellow-500" size={16} />
        <h3 className="text-sm font-semibold text-center text-gray-300">
          LeetCode Progress
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Easy Problems */}
        <div className="bg-green-600/20 p-2 rounded text-center">
          <h4 className="text-xs font-medium text-green-400">Easy</h4>
          <p className="text-sm font-bold text-white">
            {leetCodeStats.easySolved || 0}/{leetCodeStats.totalEasy || 0}
          </p>
        </div>

        {/* Medium Problems */}
        <div className="bg-yellow-600/20 p-2 rounded text-center">
          <h4 className="text-xs font-medium text-yellow-400">Medium</h4>
          <p className="text-sm font-bold text-white">
            {leetCodeStats.mediumSolved || 0}/{leetCodeStats.totalMedium || 0}
          </p>
        </div>

        {/* Hard Problems */}
        <div className="bg-red-600/20 p-2 rounded text-center">
          <h4 className="text-xs font-medium text-red-400">Hard</h4>
          <p className="text-sm font-bold text-white">
            {leetCodeStats.hardSolved || 0}/{leetCodeStats.totalHard || 0}
          </p>
        </div>
      </div>

      {/* Simple progress bar */}
      <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className="flex h-full">
          {(() => {
            // Extract values with fallbacks
            const easySolved = parseInt(leetCodeStats.easySolved) || 0;
            const mediumSolved = parseInt(leetCodeStats.mediumSolved) || 0;
            const hardSolved = parseInt(leetCodeStats.hardSolved) || 0;

            // Calculate total from our own values to ensure consistency
            const localTotal = easySolved + mediumSolved + hardSolved;

            // If no problems solved, show empty bar with equal placeholder segments
            if (localTotal === 0) {
              return (
                <>
                  <div className="bg-gray-600 h-full" style={{ width: "33.3%" }}></div>
                  <div className="bg-gray-600 h-full" style={{ width: "33.3%" }}></div>
                  <div className="bg-gray-600 h-full" style={{ width: "33.4%" }}></div>
                </>
              );
            }

            // Calculate percentages based on our local total
            const easyPercent = (easySolved / localTotal) * 100;
            const mediumPercent = (mediumSolved / localTotal) * 100;
            const hardPercent = (hardSolved / localTotal) * 100;

            return (
              <>
                <div className="bg-green-500 h-full" style={{ width: `${easyPercent}%` }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: `${mediumPercent}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${hardPercent}%` }}></div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Link to LeetCode profile */}
      <div className="mt-3 text-center">
        <a
          href={userProfile.leetCodeProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition duration-300 inline-flex items-center"
        >
          <FaTrophy className="mr-1 text-yellow-500" size={12} />
          View Profile
        </a>
      </div>
    </div>
  );
};

export default LeetCodeStats;
