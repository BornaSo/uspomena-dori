// script.js — čita podatke iz config.js (objekt MEMORIAL) i puni stranicu.
// Ništa ovdje ne treba mijenjati — sve postavke su u config.js

document.addEventListener('DOMContentLoaded', () => {
  const data = window.MEMORIAL || {};

  // --- Osnovni podaci ---
  document.title = data.name ? `U spomen — ${data.name}` : 'Spomen stranica';
  document.getElementById('nameEl').textContent = data.name || '';
  document.getElementById('bornEl').textContent = data.born || '';
  document.getElementById('diedEl').textContent = data.died || '';

  if (data.quote) {
    document.getElementById('coverQuote').textContent = data.quote;
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

  // --- Fotografije (slider) ---
  const photoSlider = document.getElementById('photoSlider');
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const photos = data.photos || [];

  if (photos.length === 0) {
    document.getElementById('photosEmpty').hidden = false;
    photoSlider.style.display = 'none';
    sliderDots.style.display = 'none';
  } else {
    photos.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide';

      const img = document.createElement('img');
      img.src = src;
      img.alt = data.name || 'Fotografija';
      img.loading = 'lazy';
      img.addEventListener('click', () => openLightbox(i));
      slide.appendChild(img);
      sliderTrack.appendChild(slide);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Fotografija ${i + 1}`);
      dot.addEventListener('click', () => scrollToSlide(i));
      sliderDots.appendChild(dot);
    });

    const dots = sliderDots.querySelectorAll('.slider-dot');

    function currentIndex(){
      return Math.round(sliderTrack.scrollLeft / sliderTrack.clientWidth);
    }

    function scrollToSlide(i){
      const clamped = Math.max(0, Math.min(photos.length - 1, i));
      sliderTrack.scrollTo({ left: clamped * sliderTrack.clientWidth, behavior: 'smooth' });
    }

    function updateActiveDot(){
      const i = currentIndex();
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    let scrollTimeout;
    sliderTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 80);
    });

    prevBtn.addEventListener('click', () => scrollToSlide(currentIndex() - 1));
    nextBtn.addEventListener('click', () => scrollToSlide(currentIndex() + 1));

    // ako promjena veličine ekrana pomakne poziciju, poravnaj na najbliži slide
    window.addEventListener('resize', () => scrollToSlide(currentIndex()));

    if (photos.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      sliderDots.style.display = 'none';
    }
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

  // --- Lightbox za fotografije (s navigacijom) ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxClose = document.getElementById('lightboxClose');
  let lightboxIndex = 0;

  function updateLightboxNav(){
    const multiple = photos.length > 1;
    lightboxPrev.style.display = multiple ? '' : 'none';
    lightboxNext.style.display = multiple ? '' : 'none';
  }

  function showLightboxPhoto(i){
    lightboxIndex = (i + photos.length) % photos.length;
    lightboxImg.src = photos[lightboxIndex];
  }

  function openLightbox(i) {
    if (!photos.length) return;
    showLightboxPhoto(i);
    updateLightboxNav();
    lightbox.classList.add('open');
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
  }

  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightboxPhoto(lightboxIndex - 1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showLightboxPhoto(lightboxIndex + 1); });
  lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });

  // klik na pozadinu zatvara, klik na sliku/strelice ne zatvara
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxPhoto(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxPhoto(lightboxIndex + 1);
  });

  // prevlačenje prstom (swipe) unutar uvećanog prikaza
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx > 0 ? showLightboxPhoto(lightboxIndex - 1) : showLightboxPhoto(lightboxIndex + 1);
    }
    touchStartX = null;
  });
});
