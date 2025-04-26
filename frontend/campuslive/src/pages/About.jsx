import React from 'react';
import { FaCode, FaUsers, FaLink, FaLaptopCode, FaRocket, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            About Unicode
          </h1>
          <p className="text-xl text-gray-400">Uniting Coders. Unifying Profiles.</p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Unicode was born from a simple observation: talented programmers often maintain multiple 
            profiles across different platforms to showcase various aspects of their coding journey. 
            We believe your programming story deserves to be told in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-all shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaLink className="text-blue-400 text-2xl mr-4" />
              <h3 className="text-xl font-bold">One Link. Many Skills.</h3>
            </div>
            <p className="text-gray-300">
              Share a single Unicode profile link in your resume or portfolio that elegantly showcases 
              your entire programming journey, from competitive coding achievements to open-source 
              contributions and real-world projects.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-all shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaUsers className="text-purple-400 text-2xl mr-4" />
              <h3 className="text-xl font-bold">Uniting Diverse Programmers</h3>
            </div>
            <p className="text-gray-300">
              Whether you're a DSA enthusiast, a data scientist, a web developer, or just beginning 
              your coding journey, Unicode brings together programmers from all backgrounds under 
              one unified platform.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-all shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaLaptopCode className="text-green-400 text-2xl mr-4" />
              <h3 className="text-xl font-bold">Multiple Platforms. One Profile.</h3>
            </div>
            <p className="text-gray-300">
              Connect your GitHub, LeetCode, CodeChef, CodeForces, LinkedIn and other accounts to 
              automatically sync and display your achievements, contributions, and progress in a 
              single, elegant dashboard.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-all shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaChartLine className="text-yellow-400 text-2xl mr-4" />
              <h3 className="text-xl font-bold">Track Your Growth</h3>
            </div>
            <p className="text-gray-300">
              Unicode doesn't just display your current skills and achievements — it helps you 
              visualize your progress over time, identify your strengths, and showcase your 
              continuous improvement.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">Why Unicode?</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            In a world where programming skills are increasingly diverse, we believe your online presence 
            should reflect the full breadth of your abilities. Unicode serves as the bridge that 
            connects all your coding identities into a cohesive story.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you're applying for jobs, networking with other developers, or simply tracking your own 
            progress, Unicode provides a comprehensive snapshot of your programming journey — all accessible 
            through a single, shareable link.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-800/50 mb-12">
          <div className="flex items-center mb-4">
            <FaRocket className="text-orange-400 text-2xl mr-4" />
            <h2 className="text-2xl font-bold">Under Active Development</h2>
          </div>
          <p className="text-gray-300">
            Unicode is constantly evolving. Our team is actively working on new features and integrations 
            to make your coding profile even more comprehensive and impressive. Stay tuned for exciting 
            updates including more platform integrations, enhanced analytics, and personalized recommendations 
            to help you grow as a developer.
          </p>
          <div className="mt-6 bg-gray-800/70 rounded-md p-4 border-l-4 border-blue-500">
            <p className="italic text-gray-400">
              "We're building Unicode to be the platform we wish we had when we were showcasing our own coding journeys."
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Unicode Community</h2>
          <p className="text-gray-300 mb-6">
            Start unifying your coding identity today and let the world see your complete programmer profile.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
            Create Your Unicode Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;