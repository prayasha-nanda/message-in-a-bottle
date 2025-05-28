import { useState } from 'react';

function MessageForm() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setStatus('Message cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setStatus('Thank you for your words, the world needs them! <3');
        setContent('');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <textarea
        maxLength={140}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here!"
        className="w-full h-32 p-2 border rounded resize-none"
      />
      <p className="text-sm text-gray-500 text-right">{content.length} / 140</p>
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
}

export default MessageForm;