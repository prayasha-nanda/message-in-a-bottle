import React from 'react';

function Landing({ setAppMode }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80 text-center space-y-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome to Message in a Bottle
      </h2>
      <p className="text-lg text-gray-700">
        Hope you find treasures in the sunken ships!
      </p>

      <button
        onClick={() => setAppMode('send')}
        className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-xl"
      >
        Let The Ocean Wash My Words Away
      </button>

      <button
        onClick={() => setAppMode('receive')}
        className="w-full px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out text-xl"
      >
        Catch A Soul From The Currents
      </button>
    </div>
  );
}

export default Landing;