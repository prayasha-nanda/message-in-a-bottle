const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const messages = [
  { id: 1, content: 'Hello from backend!' },
  { id: 2, content: 'This is your message in a bottle.' },
  { id: 3, content: "I'd rather lie than lose you." }
];


app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const newMessage = {
    id: messages.length + 1,
    content,
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);

  res.status(201).json(newMessage);
});
