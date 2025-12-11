const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Path to your video directory on Z:
// const videoDir = 'Y:\\xxx\\BrandNew\\';
const videoDir = 'C:\\Users\\kevin\\Downloads\\movs';

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the /videos endpoint to return the list of video filenames
app.get('/videos', (req, res) => {
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            console.error('Error reading video directory:', err);
            res.status(500).send('Error reading video directory');
            return;
        }
        // Filter only .mp4 files
        const mp4Files = files.filter(file => file.endsWith('.mp4'));
        res.json(mp4Files);
    });
});

// Serve video files statically
app.use('/videos', express.static(videoDir));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
