import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Hero() {
    return (
      <main className="border-2 flex py-0.5 h-full w-full items-center">
        <div className="message border-2 flex py-0.5 items-center w-1/2 h-full flex-wrap">
          <div className="UniCoders flex justify-center ml-3">
            <h1 className="text-5xl text-white">Uni</h1>
            <h1 className="text-5xl text-sky-500">Code</h1>
          </div>
          <div>Are you a Dev</div>
        </div>
        <div className="profilsec border-2 h-full w-1/2 flex items-center">
        <div className="h-1/8 w-1/2 border-2 right-0">Profile card</div></div>
      </main>
    );
}
