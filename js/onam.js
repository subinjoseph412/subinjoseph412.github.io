// ============================================================
//  ONAM SEASONAL ANIMATION — Falling flower petals
//  TO REMOVE: delete the onam.css/onam.js reference lines from
//  all HTML files (see README.md), or delete these two files.
// ============================================================

(function () {

  const PETAL_COLORS = [
    '#a855f7', '#c084fc', '#7c3aed', // theme purples
    '#fbbf24', '#f59e0b',            // marigold/gold accents
    '#f472b6'                         // soft pink
  ];

  const PETAL_COUNT = 22;

  const container = document.createElement('div');
  container.id = 'onamPetals';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  const banner = document.createElement('div');
  banner.id = 'onamBanner';
  banner.innerHTML = `
    <span class="onam-banner-emoji">🌼</span>
    <span class="onam-banner-text">Happy Onam!</span>
    <button id="onamBannerClose" aria-label="Dismiss">✕</button>
  `;
  document.body.appendChild(banner);

  // Dismiss banner AND stop petals immediately
  document.getElementById('onamBannerClose').addEventListener('click', () => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-10px)';
    setTimeout(() => banner.remove(), 300);

    const petals = container.querySelectorAll('.onam-petal');
    petals.forEach(p => {
      p.style.transition = 'opacity 0.4s';
      p.style.opacity = '0';
    });
    setTimeout(() => container.remove(), 400);
  });

  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'onam-petal';

    const size = 8 + Math.random() * 10;
    const startX = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const delay = Math.random() * 5;
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const sway = (Math.random() - 0.5) * 80;

    petal.style.cssText = `
      left: ${startX}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --sway: ${sway}px;
    `;

    container.appendChild(petal);
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal();
  }

})();
