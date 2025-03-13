import React from 'react';
import { Link } from 'react-router'; // Make sure to use 'react-router-dom' for Link

export default function Header() {
  return (
    <header className="bg-gray-800/50 m-4 rounded-lg flex justify-evenly items-center">
      <div className="container mx-auto flex w-full py-2 px-4 justify-center">
        <div className="UniCoders flex justify-center ">
          <h1 className="text-4xl text-white">Uni</h1>
          <h1 className="text-4xl text-sky-500">Code</h1>
        </div>
      </div>
      <div className=" w-15 flex justify-items-center items-center ">
        <div className="icon w-full h-full flex justify-center items-center">
          <i class="fas fa-ellipsis-h "></i>
        </div>
      </div>
    </header>
  );
}
