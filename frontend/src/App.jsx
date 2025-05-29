import React, { useState } from 'react';
import MessageForm from './MessageForm';
import Messages from './Messages';
import Landing from './Landing';

function App() {
  const [appMode, setAppMode] = useState('landing');

  return (
    <div className="min-h-screen bg-repeat-x bg-bottom
                    bg-[url('/Mobile-bg.png')] sm:bg-[url('/Desktop-bg.png')]
                    animate-move-bg
                    flex flex-col items-center justify-center p-4">

      {appMode === 'landing' && (
        <Landing setAppMode={setAppMode} />
      )}

      {appMode === 'send' && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Your words could impact someone's life or be lost in the ocean forever
          </h1>
          <h2 className="text-xl font-bold text-center text-blue-500 mb-6">Speak with care</h2>
          <MessageForm />
          <button
            onClick={() => setAppMode('landing')}
            className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
      )}

      {appMode === 'receive' && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Is it a Siren speaking or a Mermaid?</h1>
          <h2 className="text-xl font-bold text-center text-blue-500 mb-6">Could be a human too!</h2>
          <Messages />
          <button
            onClick={() => setAppMode('landing')}
            className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;