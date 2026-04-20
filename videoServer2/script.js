const videoCount = 6;
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

  const count = videoGallery.children.length || videoCount;
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const galleryWidth = videoGallery.clientWidth || window.innerWidth;
  const cellWidth = galleryWidth / columns;
  const cellHeight = Math.floor((cellWidth * 9) / 16);

  videoGallery.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  videoGallery.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}px)`;
}

async function fetchVideoList() {
  const response = await fetch('/videos');
  if (!response.ok) throw new Error('Failed to fetch video list');
  allVideos = await response.json();
}

function createVideoElement(videoSrc) {
  const container = document.createElement('div');
  container.className = 'video-container';

  const videoElement = document.createElement('video');
  videoElement.controls = true;
  videoElement.volume = 0;
  videoElement.src = `/videos/${videoSrc}`;
  videoElement.addEventListener('ended', () => {
    const newVideo = getRandomVideo();
    if (!newVideo) return;
    videoElement.src = `/videos/${newVideo}`;
    void videoElement.play();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.textContent = 'Next Video';
  nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newVideo = getRandomVideo();
    if (!newVideo) return;
    videoElement.src = `/videos/${newVideo}`;
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
