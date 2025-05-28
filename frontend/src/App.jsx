import React from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🌊 Message in a Bottle 🌊</h1>
        <MessageForm />
        <hr className="my-6 border-blue-300" />
        <Messages />
      </div>
    </div>
  );
}

export default App;