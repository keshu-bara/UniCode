import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold italic mb-4">Welcome to Campuslive</h1>
                <p className="mb-8">Get the live updates about your campus</p>
            </div>
            <div className = "flex items-center justify-center">
                <Link to = 'login/'><button className="px-4 py-2 bg-white text-black rounded-md mr-4 hover:bg-blue-300">Login</button></Link>
                <Link to = 'register/'><button className="px-4 py-2 bg-white text-black rounded-md hover:bg-blue-300" >Register</button></Link>
            </div>
        </div>
    );
}
