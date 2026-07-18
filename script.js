// script.js — čita podatke iz config.js (objekt MEMORIAL) i puni stranicu.
// Ništa ovdje ne treba mijenjati — sve postavke su u config.js

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MEMORIAL || {};

  // --- Osnovni podaci ---
  document.title = data.name ? `U spomen — ${data.name}` : 'Spomen stranica';
  document.getElementById('nameEl').textContent = data.name || '';
  document.getElementById('bornEl').textContent = data.born || '';
  document.getElementById('diedEl').textContent = data.died || '';

  if (data.coverPhoto) {
    document.getElementById('coverImg').src = data.coverPhoto;
  }
  if (data.portrait) {
    document.getElementById('portraitImg').src = data.portrait;
  }

  // --- Glazba ---
  const audio = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  const musicLabel = document.getElementById('musicLabel');

  if (data.music) {
    audio.src = data.music;
  } else {
    musicBtn.style.display = 'none';
  }

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      musicBtn.classList.add('playing');
      musicLabel.textContent = 'Glazba svira';
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicLabel.textContent = 'Zapali svijeću za glazbu';
    }
  });

  // --- Tabovi ---
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // --- Fotografije ---
  const gallery = document.getElementById('gallery');
  const photos = data.photos || [];
  if (photos.length === 0) {
    document.getElementById('photosEmpty').hidden = false;
  } else {
    photos.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.name || 'Fotografija';
      img.loading = 'lazy';
      img.addEventListener('click', () => openLightbox(src));
      gallery.appendChild(img);
    });
  }

  // --- Videozapisi ---
  const videoList = document.getElementById('videoList');
  const videos = data.videos || [];
  if (videos.length === 0) {
    document.getElementById('videosEmpty').hidden = false;
  } else {
    videos.forEach(v => {
      const wrap = document.createElement('div');
      wrap.className = 'video-item';

      if (v.type === 'youtube') {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${v.id}`;
        iframe.title = v.caption || 'Video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        wrap.appendChild(iframe);
      } else if (v.type === 'file') {
        const video = document.createElement('video');
        video.src = v.src;
        video.controls = true;
        wrap.appendChild(video);
      }

      if (v.caption) {
        const cap = document.createElement('p');
        cap.className = 'video-caption';
        cap.textContent = v.caption;
        wrap.appendChild(cap);
      }
      videoList.appendChild(wrap);
    });
  }

  // --- Lightbox za fotografije ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
  }
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
});
