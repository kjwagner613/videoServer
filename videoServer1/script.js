const videoCount = 4;
let allVideos = [];

function getRandomVideo(usedVideos = []) {
  if (!allVideos.length) return null;

  const available = allVideos.filter((video) => !usedVideos.includes(video));
  const pool = available.length ? available : allVideos;
  return pool[Math.floor(Math.random() * pool.length)];
}

function resizeVideos() {
  const videoGallery = document.getElementById('videoGallery');
  if (!videoGallery) return;

  videoGallery.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
  videoGallery.style.gridTemplateRows = 'repeat(2, minmax(0, 1fr))';
}

async function fetchVideoList() {
  const response = await fetch('/videos/');
  if (!response.ok) throw new Error('Failed to fetch video list');

  const contentType = response.headers.get('content-type') || '';

  // Express returns JSON; http-server returns an HTML directory listing.
  if (contentType.includes('application/json')) {
    const filenames = await response.json();
    allVideos = filenames.map(
      (filename) => `/videos/${encodeURIComponent(filename)}`,
    );
    return;
  }

  const directoryPage = await response.text();
  const document = new DOMParser().parseFromString(directoryPage, 'text/html');
  allVideos = [...document.querySelectorAll('a[href]')]
    .map((link) => new URL(link.getAttribute('href'), response.url))
    .filter((url) => url.pathname.toLowerCase().endsWith('.mp4'))
    .map((url) => url.pathname);

  if (!allVideos.length) {
    throw new Error('No MP4 files found in /videos/');
  }
}

function createVideoElement(videoSrc) {
  const container = document.createElement('div');
  container.className = 'video-container';

  const videoElement = document.createElement('video');
  videoElement.controls = true;
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.src = videoSrc;
  videoElement.addEventListener('ended', () => {
    const newVideo = getRandomVideo();
    if (!newVideo) return;
    videoElement.src = newVideo;
    void videoElement.play();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.textContent = 'Next Video';
  nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newVideo = getRandomVideo();
    if (!newVideo) return;
    videoElement.src = newVideo;
    void videoElement.play();
  });

  container.appendChild(videoElement);
  container.appendChild(nextButton);
  return container;
}

async function loadVideoGallery() {
  const videoGallery = document.getElementById('videoGallery');
  if (!videoGallery) return;

  await fetchVideoList();

  const usedVideos = [];
  videoGallery.innerHTML = '';

  for (let i = 0; i < videoCount; i += 1) {
    const randomVideo = getRandomVideo(usedVideos);
    if (!randomVideo) break;

    usedVideos.push(randomVideo);
    videoGallery.appendChild(createVideoElement(randomVideo));
  }

  resizeVideos();
}

loadVideoGallery().catch((error) => {
  console.error('Failed to load video gallery:', error);
});

window.addEventListener('resize', resizeVideos);
