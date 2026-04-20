const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5100;

// const videoDir = "/mnt/e/phoenixFiles/45645645456";
// const videoDir = "/mnt/i/a";
// const videoDir = "/mnt/e/phoenixFiles/sorted";
// const videoDir = "/mnt/j/phoenixFiles/x/5454564";
// const videoDir = "/mnt/i/New folder";
// const videoDir = "/mnt/j/phoenixFiles/X/AA";
// const videoDir = "/mnt/j/phoenixFiles/X/X";
// const videoDir = "/mnt/j/phoenixFiles/x/f";
// const videoDir = "/mnt/j/phoenixFiles/x/aa";
// const videoDir = "/mnt/j/phoenixFiles/x/e";
const videoDir = "/mnt/j/phoenixFiles/x/f";


// const videoDir = "/mnt/c/Users/kjwagner613/Downloads";

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
