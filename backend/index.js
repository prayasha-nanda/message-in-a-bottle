const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.post('/messages', (req, res) => {
    const { content, tag } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({ success: false, error: 'Content is required, your paper should not be empty.' });
    }
    if (content.length > 140) {
        return res.status(400).json({ success: false, error: 'Content exceeds character limit! The paper is not long enough!' });
    }

    const allowedTags = ['quote', 'song', 'rambling'];
    const finalTag = tag && allowedTags.includes(tag) ? tag : 'rambling';

    const pythonScriptPath = path.join(__dirname, 'database', 'db_insert.py');
    const pythonProcess = spawn('python', [pythonScriptPath]);

    let scriptOutput = '';
    let scriptError = '';

    pythonProcess.stdout.on('data', (chunk) => {
        scriptOutput += chunk.toString();
    });

    pythonProcess.stderr.on('data', (chunk) => {
        scriptError += chunk.toString();
        console.error(`Python script (db_insert.py) stderr: ${chunk.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) { // Python script executed successfully
            try {
                const result = JSON.parse(scriptOutput);
                if (result.success) {
                    res.status(201).json(result); // 201 Created for successful POST
                } else {
                    // Python script reported an internal error
                    res.status(500).json(result);
                }
            } catch (err) {
                // Failed to parse JSON from Python script
                console.error('Failed to parse Python script output (db_insert.py):', scriptOutput, err);
                res.status(500).json({ success: false, error: 'Internal server error: Invalid Python script response.' });
            }
        } else { // Python script exited with a non-zero error code
            console.error(`Python script (db_insert.py) exited with code ${code}. Error: ${scriptError}`);
            res.status(500).json({ success: false, error: `Python script error: ${scriptError || 'Unknown error.'}` });
        }
    });

    pythonProcess.stdin.write(JSON.stringify({ content, tag: finalTag }));
    pythonProcess.stdin.end();
});

app.get('/messages', (req, res) => {
    const { tag } = req.query;

    const pythonScriptPath = path.join(__dirname, 'database', 'db_select_random.py');
    const pythonProcess = spawn('python', [pythonScriptPath]);

    let scriptOutput = '';
    let scriptError = '';

    pythonProcess.stdout.on('data', (chunk) => {
        scriptOutput += chunk.toString();
    });

    pythonProcess.stderr.on('data', (chunk) => {
        scriptError += chunk.toString();
        console.error(`Python script (db_select_random.py) stderr: ${chunk.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const result = JSON.parse(scriptOutput);
                if (result.error) {
                    res.status(500).json(result);
                } else {
                    res.json(result); // If it returned a success/message object (success:true/false and content)
                }
            } catch (err) {
                console.error('Failed to parse Python script output (db_select_random.py):', scriptOutput, err);
                res.status(500).json({ success: false, error: 'Internal server error: Invalid Python script response.' });
            }
        } else {
            console.error(`Python script (db_select_random.py) exited with code ${code}. Error: ${scriptError}`);
            res.status(500).json({ success: false, error: `Python script error: ${scriptError || 'Unknown error.'}` });
        }
    });

    pythonProcess.stdin.write(JSON.stringify({ tag }));
    pythonProcess.stdin.end();
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});