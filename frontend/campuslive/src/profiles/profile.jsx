import React from 'react'

export default function Profile() {
  return (
    <div className="profile_card h-full w-full ">
        <div className="profile_pts flex items-center justify-between mr-0.5 ml-0.5"><div className="h-10 w-10 mr-0.5 ml-0.5  rounded-full bg-amber-300">
        <img alt="" scr="/image.png"></img>
      </div>
      <div>
        pts:5
      </div>

        </div>
      <div>
        <p>Nikhil Mishra</p>
        <p>Full stack developer</p>
      </div>
      <div className="meet_button text-sm">
        <button class="bg-pink-500 rounded text-white py-1 h-auto w-auto">Meet Me!</button>
      </div>
    </div>
  );
}
