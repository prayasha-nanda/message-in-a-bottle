import React, { useState, useEffect } from 'react';

function Messages() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTagFilter, setSelectedTagFilter] = useState('all');

  const fetchRandomMessage = (tagToFetch = selectedTagFilter) => {
    setLoading(true);
    setError(null);

    let url = 'http://localhost:5000/messages';
    if (tagToFetch && tagToFetch !== 'all') {
      url += `?tag=${tagToFetch}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success === false) {
          setMessage(data.content);
        } else {
          setMessage(data.content);
        }
        setLoading(false); // Fetching complete!
      })
      .catch((err) => {
        console.error('Error fetching random message:', err);
        setError("The seas seem to be empty right now! Failed to fetch message. Please check again later.");
        setLoading(false); // Fetching complete even if error
      });
  };

  useEffect(() => {
    fetchRandomMessage();
  }, [selectedTagFilter]);

  const handleTagFilterClick = (tag) => {
    setSelectedTagFilter(tag);
  };

  if (loading) {
    return <p className="text-center py-4 text-blue-600">Searching the oceans for a bottle...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Your Message From a Bottle:</h2>
      <div className="p-5 bg-blue-50 border border-blue-200 rounded shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <p className="text-lg italic font-medium break-words">"{message || "No messages found floating in any of the seven seas! How about you start the legacy?"}"</p>
      </div>

      <button
        onClick={() => fetchRandomMessage()}
        className="mt-6 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Open Another Bottle
      </button>
      
      <div className="flex flex-col items-center mt-4 space-y-2">
        <label className="text-gray-700 font-medium">Filter by Category:</label>
        <div className="flex flex-wrap justify-center gap-2">
          
          {['all', 'rambling', 'quote', 'song'].map((tagOption) => (
            <button
              key={tagOption}
              type="button"
              onClick={() => handleTagFilterClick(tagOption)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 ease-in-out
                ${selectedTagFilter === tagOption
                  ? 'bg-blue-600 text-white shadow-md' // Style for selected tag
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Style for unselected tag
                }`}
            >
              {tagOption.charAt(0).toUpperCase() + tagOption.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;