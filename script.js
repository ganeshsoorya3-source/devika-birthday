/**
 * Happy Birthday Devika - Interactive Script
 * Nostalgic scrapbook letter with audio controls, envelope opening, and confetti magic.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const btnOpenLetter = document.getElementById('btnOpenLetter');
  const envelopeElement = document.getElementById('envelopeElement');
  const openingScreen = document.getElementById('openingScreen');
  const letterScreen = document.getElementById('letterScreen');
  
  // Audio & Controller Elements
  const bgAudio = document.getElementById('bgAudio');
  const musicWidget = document.getElementById('musicWidget');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const iconPause = document.getElementById('iconPause');
  const iconPlay = document.getElementById('iconPlay');
  const btnMute = document.getElementById('btnMute');
  const iconVolHigh = document.getElementById('iconVolHigh');
  const iconMute = document.getElementById('iconMute');
  const btnReplay = document.getElementById('btnReplay');
  const musicVinyl = document.getElementById('musicVinyl');
  const musicStatusText = document.getElementById('musicStatusText');
  const audioNotice = document.getElementById('audioNotice');
  const localAudioPicker = document.getElementById('localAudioPicker');

  // Magic / Confetti Elements
  const btnMagic = document.getElementById('btnMagic');
  const magicMessage = document.getElementById('magicMessage');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const btnScrollTop = document.getElementById('btnScrollTop');
  const ambientStars = document.getElementById('ambientStars');

  // Set gentle initial audio volume
  if (bgAudio) {
    bgAudio.volume = 0.38;
  }

  /* -------------------------------------------------------------------------
     1. Ambient Twinkle Stars Generation
     ------------------------------------------------------------------------- */
  function createAmbientStars() {
    if (!ambientStars) return;
    const starCount = window.innerWidth < 600 ? 18 : 34;
    const starChars = ['✦', '⋆', '•', '✧'];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.className = 'star-point';
      star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${Math.random() * 10 + 9}px`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${Math.random() * 3 + 3}s`;
      ambientStars.appendChild(star);
    }
  }
  createAmbientStars();

  /* -------------------------------------------------------------------------
     2. Envelope Opening & Reveal Logic
     ------------------------------------------------------------------------- */
  let isOpened = false;

  function openLetter() {
    if (isOpened) return;
    isOpened = true;

    // Trigger visual envelope animation
    if (envelopeElement) {
      envelopeElement.classList.add('opening');
    }

    // Start audio playback
    startBackgroundMusic();

    // After flap flips and letter peeks, smoothly transition to full letter
    setTimeout(() => {
      openingScreen.style.opacity = '0';
      openingScreen.style.transform = 'scale(0.96) translateY(-10px)';

      setTimeout(() => {
        openingScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');

        // Reveal floating music controller
        musicWidget.classList.remove('hidden');

        // Force reflow for CSS transition
        void letterScreen.offsetWidth;
        letterScreen.classList.add('visible');

        // Scroll to top of letter page gently
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }, 700);
  }

  if (btnOpenLetter) {
    btnOpenLetter.addEventListener('click', openLetter);
  }

  // Also allow clicking directly on envelope
  if (envelopeElement) {
    envelopeElement.addEventListener('click', openLetter);
  }

  /* -------------------------------------------------------------------------
     3. Audio Playback Management
     ------------------------------------------------------------------------- */
  function startBackgroundMusic() {
    if (!bgAudio) return;

    bgAudio.play().then(() => {
      updatePlayPauseUI(true);
      musicStatusText.textContent = 'Playing softly...';
      if (audioNotice) audioNotice.classList.add('hidden');
    }).catch((err) => {
      console.warn('Autoplay or file load notice:', err.message);
      updatePlayPauseUI(false);
      musicStatusText.textContent = 'Tap to play music';
      // If audio file wasn't found at local path, show friendly local picker
      if (audioNotice) {
        audioNotice.classList.remove('hidden');
      }
    });
  }

  function updatePlayPauseUI(isPlaying) {
    if (isPlaying) {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
      musicVinyl.classList.add('spinning');
      musicStatusText.textContent = 'Playing softly...';
    } else {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
      musicVinyl.classList.remove('spinning');
      musicStatusText.textContent = 'Paused';
    }
  }

  // Play / Pause Toggle
  if (btnPlayPause && bgAudio) {
    btnPlayPause.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          updatePlayPauseUI(true);
        }).catch(() => {
          if (audioNotice) audioNotice.classList.remove('hidden');
        });
      } else {
        bgAudio.pause();
        updatePlayPauseUI(false);
      }
    });
  }

  // Mute / Unmute Toggle
  if (btnMute && bgAudio) {
    btnMute.addEventListener('click', (e) => {
      e.stopPropagation();
      bgAudio.muted = !bgAudio.muted;
      if (bgAudio.muted) {
        iconVolHigh.classList.add('hidden');
        iconMute.classList.remove('hidden');
        musicStatusText.textContent = 'Muted';
      } else {
        iconVolHigh.classList.remove('hidden');
        iconMute.classList.add('hidden');
        musicStatusText.textContent = bgAudio.paused ? 'Paused' : 'Playing softly...';
      }
    });
  }

  // Replay Button (resets to start without glitching)
  if (btnReplay && bgAudio) {
    btnReplay.addEventListener('click', (e) => {
      e.stopPropagation();
      bgAudio.currentTime = 0;
      bgAudio.play().then(() => {
        updatePlayPauseUI(true);
      }).catch(console.warn);
    });
  }

  // Local file picker fallback if user tests with local MP3 directly
  if (localAudioPicker && bgAudio) {
    localAudioPicker.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        bgAudio.src = fileURL;
        bgAudio.load();
        bgAudio.play().then(() => {
          updatePlayPauseUI(true);
          if (audioNotice) audioNotice.classList.add('hidden');
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
     4. Birthday Magic ✨ & Confetti Cannon
     ------------------------------------------------------------------------- */
  if (btnMagic) {
    btnMagic.addEventListener('click', () => {
      // Show celebration banner
      if (magicMessage) {
        magicMessage.classList.remove('hidden');
      }

      // Fire confetti burst
      launchTastefulConfetti();

      // Gentle button bounce
      btnMagic.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btnMagic.style.transform = '';
      }, 150);
    });
  }

  // Scroll back to top
  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------------------------
     5. Pure Canvas Confetti & Sparkles Engine (Zero external dependencies)
     ------------------------------------------------------------------------- */
  function launchTastefulConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    if (!ctx) return;

    let width = (confettiCanvas.width = window.innerWidth);
    let height = (confettiCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = confettiCanvas.width = window.innerWidth;
      height = confettiCanvas.height = window.innerHeight;
    }, { once: true });

    // Palette: soft rose, muted pink, burgundy, gold, peach, cream
    const colors = [
      '#d88a9a', '#944856', '#732838', '#cfa15d', 
      '#f8df95', '#c48b71', '#fceee9', '#e8a598'
    ];

    const particles = [];
    const particleCount = window.innerWidth < 600 ? 70 : 130;

    // Origin near magic button or center bottom
    const startX = width / 2;
    const startY = height * 0.72;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 1.8) * (Math.random() - 0.5) - Math.PI / 2;
      const speed = Math.random() * 11 + 6;
      
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.28,
        drag: 0.98,
        opacity: 1,
        shape: Math.random() > 0.35 ? 'rect' : 'circle'
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, width, height);

      let activeParticles = 0;

      for (let p of particles) {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < height + 50) {
          activeParticles++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      if (activeParticles > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

});
