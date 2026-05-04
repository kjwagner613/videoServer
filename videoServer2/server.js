const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5200;


// const videoDir = "/mnt/c/tools/videos";
const videoDir = "/mnt/share/altnvr";
const videoCount = 6; // Number of videos
let allVideos = []; // List of video filenames



app.use(express.static(__dirname));


// list videos
app.get(['/videos', '/videos/'], (req, res) => {
  if (!fs.existsSync(videoDir)) {
    return res.status(500).send(`Video directory not found: ${videoDir}`);
  }
  fs.readdir(videoDir, (err, files) => {
    if (err) return res.status(500).send('Error reading video directory');
    res.json(files.filter(f => f.toLowerCase().endsWith('.mp4')));
  });
});

// serve actual files at /videos/<filename>
app.use('/videos', express.static(videoDir));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving videos from: ${videoDir}`);
});
