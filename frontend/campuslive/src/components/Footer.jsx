import React from 'react'
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-900 flex items-center h-10 text-amber-50 justify-between">
      <div className="copyright flex text-sm">
        <h1>&copy; Uni</h1>
        <h1 className="text-blue-400">Code</h1>
        <h1 className="font-light">&nbsp;| All right Reserverd 2025</h1>
      </div>
      <div>
        <Link to='contactdev/'>
          <h1>Contact Developer</h1>
        </Link>
      </div>
    </footer>
  );
}
