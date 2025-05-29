import { useState } from 'react';

function MessageForm() {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('rambling');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setStatus('Message cannot be empty. The paper has no content!');
      return;
    }
    if (content.length > 140) {
      setStatus('Message exceeds 140 characters. The paper is not long enough!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, tag }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setStatus('Thank you for your words, the world needs them! <3');
        setContent('');
        setTag('rambling');
      } else {
        setStatus(responseData.error || 'Your message got lost due to thunderstorms! Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error connecting to the server. Please check if the backend is running.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 4000);
    }
  };

  const handleTagButtonClick = (selectedTag) => {
    setTag(selectedTag);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-lg shadow-md">
      <textarea
        maxLength={140}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here!"
        className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      />
      <p className="text-sm text-gray-500 text-right">{content.length} / 140</p>

      <div className="flex items-center space-x-2">
        <label className="text-gray-700 font-medium">Category:</label>
        <div className="flex space-x-2">
          {['rambling', 'quote', 'song'].map((currentTag) => (
            <button
              key={currentTag}
              type="button" // Type="button" to prevent form submission
              onClick={() => handleTagButtonClick(currentTag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out
                ${tag === currentTag
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {currentTag.charAt(0).toUpperCase() + currentTag.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end"> {/* Added this div for alignment */}
                <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-200 ease-in-out ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status && (
        <p className={`text-sm ${status.includes('Error') || status.includes('failed') ? 'text-red-600' : 'text-green-700'}`}>
          {status}
        </p>
      )}
    </form>
  );
}

export default MessageForm;