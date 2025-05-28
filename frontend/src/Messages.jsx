import React, { useState, useEffect } from 'react';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    fetch('http://localhost:5000/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Please stand by as we load this page!</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Messages from the World:</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="p-3 bg-blue-50 border border-blue-200 rounded shadow-sm"
          >
            <p>{msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;