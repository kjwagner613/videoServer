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

### Serve files from any directory

Change into the directory you want to expose, then run:

```bash
npx http-server . -a 127.0.0.1 -p 8080
```

Open `http://127.0.0.1:8080/` in your browser. The `.` means the current
directory, so the same command works from any directory. No `server.js` file is
needed for this static-file mode.

For the 2x2 wall, serve the `videoServer1` directory and make the videos
available in a `videoServer1/videos` directory. On Ubuntu/WSL, create a symbolic
link to your existing Windows video directory:

```bash
cd videoServer1
ln -s /mnt/c/Users/kevin/videos videos
npx http-server . -a 127.0.0.1 -p 8080
```

On Windows PowerShell, use a junction instead:

```powershell
New-Item -ItemType Junction -Path videos -Target C:\Users\kevin\videos
npx http-server . -a 127.0.0.1 -p 8080
```

### Run a video gallery

```bash
npm install
node server.js
```

Then open your browser to `http://localhost:<PORT>`.

## Requirements

- Node.js
- npm/npx
- The video directory must exist and contain `.mp4` files
