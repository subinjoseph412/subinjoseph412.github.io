// ============================================================
//  SHARED LAYOUT — injects nav + footer into every page
// ============================================================

(function () {
  // Detect root path prefix for GitHub Pages (subdir) vs local
  const path = window.location.pathname;
  const isRoot = path.endsWith('/') || path.endsWith('index.html') || path === '/';
  const prefix = ''; // adjust if deploying to a subdirectory

  // ── Navigation ───────────────────────────────────────────
  const navHTML = `
  <div class="glow-orb glow-orb-1"></div>
  <div class="glow-orb glow-orb-2"></div>

  <nav class="nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="Subin Joseph — Home">
        <img src="/assets/profile.jpg" alt="Subin Joseph" class="logo-mark" style="object-fit:cover;">
        <span class="logo-name">Subin Joseph</span>
      </a>

      <div class="nav-links" role="list">
        <a href="index.html"        class="nav-link" data-page="index.html"     role="listitem">Home</a>
        <a href="pages/portfolio.html" class="nav-link" data-page="portfolio.html" role="listitem">Portfolio</a>
        <a href="pages/photos.html"    class="nav-link" data-page="photos.html"    role="listitem">Photos</a>
        <a href="pages/services.html"  class="nav-link" data-page="services.html"  role="listitem">Services</a>
        <a href="pages/about.html"     class="nav-link" data-page="about.html"     role="listitem">About</a>
        <a href="https://instagram.com/bugwithabackpack" class="nav-social" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
        <a href="https://linkedin.com/in/subin-joseph-2b9b70258" class="nav-social" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://instagram.com/bugwithabackpack" class="nav-link" target="_blank" rel="noopener">Instagram</a>
    <a href="https://linkedin.com/in/subin-joseph-2b9b70258" class="nav-link" target="_blank" rel="noopener">LinkedIn</a>
    <a href="pages/contact.html"   class="nav-cta"  data-page="contact.html">Let's work together</a>
      </div>

      <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="nav-mobile" id="mobileMenu" role="dialog" aria-label="Mobile menu">
    <a href="index.html"           class="nav-link" data-page="index.html">Home</a>
    <a href="pages/portfolio.html" class="nav-link" data-page="portfolio.html">Portfolio</a>
    <a href="pages/photos.html"    class="nav-link" data-page="photos.html">Photos</a>
    <a href="pages/services.html"  class="nav-link" data-page="services.html">Services</a>
    <a href="pages/about.html"     class="nav-link" data-page="about.html">About</a>
    <a href="pages/contact.html"   class="nav-cta"  data-page="contact.html">Let's work together</a>
  </div>`;

  // ── Footer ───────────────────────────────────────────────
  const footerHTML = `
  <div class="divider"></div>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <p class="footer-copy">
          © ${new Date().getFullYear()} <span>Subin Joseph</span>. All rights reserved.
        </p>
        <div class="footer-links">
          <a href="https://instagram.com/bugwithabackpack" class="footer-link" target="_blank" rel="noopener">Instagram</a>
          <a href="https://linkedin.com/in/subin-joseph-2b9b70258" class="footer-link" target="_blank" rel="noopener">LinkedIn</a>
          <a href="pages/contact.html" class="footer-link">Contact</a>
        </div>
      </div>
    </div>
  </footer>`;

  // ── Inject before page content ───────────────────────────
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

})();
