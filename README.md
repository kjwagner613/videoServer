# Video Server

A simple Node.js/Express video gallery server that serves `.mp4` files from a local directory and displays them in a responsive grid layout in the browser.

## Projects

- **videoServer1** — Serves 4 videos on port `5000` from `/mnt/share/newvids`
- **videoServer2** — Serves 6 videos on port `5200` from `/mnt/share/altnvr`

## Features

- Responsive grid layout that auto-sizes based on the number of videos
- Videos play muted by default
- Each video auto-plays the next random video when it ends
- "Next Video" button to manually skip to a random video
- Videos are randomly selected, avoiding repeats when possible

## Setup

```bash
npm install
node server.js
```

Then open your browser to `http://localhost:<PORT>`.

## Requirements

- Node.js
- The video directory must exist and contain `.mp4` files
