// ============================================================
//  SUBIN JOSEPH PORTFOLIO — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Set active nav link ──────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  // ── Mobile hamburger ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Fade-in on scroll ────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // Immediately reveal above-fold elements
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  // ── Portfolio video click-to-play (works on touch + desktop) ──
  document.querySelectorAll('.portfolio-thumb').forEach(thumb => {
    const video = thumb.querySelector('video');
    if (!video) return;
    thumb.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        thumb.classList.add('playing');
      } else {
        video.pause();
        thumb.classList.remove('playing');
      }
    });
    video.addEventListener('ended', () => thumb.classList.remove('playing'));
  });

  // ── Nav scroll style ─────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.background = 'rgba(9,8,15,0.92)';
      } else {
        nav.style.background = 'rgba(9,8,15,0.6)';
      }
    }, { passive: true });
  }

});
