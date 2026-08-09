# Subin Joseph — Portfolio Website

Freelance video editing portfolio. Dark theme, purple accents, hosted free on GitHub Pages.

**Live site:** https://subinjoseph412.github.io
**GitHub repo:** https://github.com/subinjoseph412/subinjoseph412.github.io
**Local folder (Mac):** `~/Downloads/subin-portfolio`
**GitHub username:** subinjoseph412
**Contact email shown on site:** subinjoseph412@gmail.com

---

## 🚀 How to push a change (every time)

```bash
cd ~/Downloads/subin-portfolio
git add .
git commit -m "describe your change here"
git push
```

**⚠️ CRITICAL — wait 2–3 minutes between pushes.** GitHub Pages cancels a deployment if a newer one comes in before it finishes. Rapid pushes = nothing ever goes live. Push once, wait, THEN check the site with a hard refresh (`⌘⇧R` on Mac).

If a change isn't showing after waiting:
1. Check https://github.com/subinjoseph412/subinjoseph412.github.io/actions — look for a green checkmark on the latest run
2. If it says "Cancelled," push an empty commit to retrigger: `git commit --allow-empty -m "rebuild" && git push`, then wait again
3. Try a **fresh incognito window** before assuming the code is wrong — regular browser cache can hide a real, already-live change

---

## 📁 File Structure (verified accurate as of Aug 2026)
**Path rule:** files in `pages/` need `../` prefixes for css/js/assets (e.g. `../css/style.css`). Root-level `index.html` does not.

**⚠️ There was previously a stray, unlinked duplicate `portfolio.html` sitting at the repo ROOT** (not in `pages/`), with completely different (older/template) content than the real `pages/portfolio.html`. It caused a lot of confusion before being found and deleted. If a chat ever seems to be reading different portfolio.html content than expected, check `find ~/Downloads/subin-portfolio -iname "portfolio.html"` for duplicates first — don't assume the file you're looking at is the live one.

---

## ✅ What's built so far

- 7-page site: Home, Portfolio, Photos, Services, About, Contact, Brief (project brief form)
- Dark theme + purple accents, Apple liquid glass effect on cards
- Plus Jakarta Sans (headings) + Inter (body) fonts
- SJ monogram logo + profile photo (nav, About page, chatbot avatar)
- Animated DaVinci-Resolve-style editor graphic in the homepage hero
- Email reveal button (Gmail icon, click to show email, tap to copy)
- FAQ chatbot (bottom-right bubble) — answers services/pricing/location questions from a keyword list in `js/chatbot.js`
- "Did You Know?" facts/myths carousel about video editing (scrollable cards on homepage)
- Onam banner ("Happy Onam!", dismissible) — falling-petals animation is disabled (loop commented out in `js/onam.js`), banner text still shows
- Instagram + LinkedIn icon links in the nav bar (desktop and mobile hamburger menu), no text, small gap between them
- Project brief generator (`pages/brief.html`) — 5-step guided form ending in a copyable summary + "Open in email" mailto button
- **Portfolio page**: grid of video cards (currently 4: Smartwatch UI Concept, Netflix Ad, color1, color2), no titles/tags/descriptions on any card, click-to-play (click thumbnail toggles play/pause), fullscreen button appears on hover — uses `video.requestFullscreen()` with a `webkitEnterFullscreen()` fallback for iOS Safari, which doesn't support the standard API on `<video>` elements
- **Photos page**: grid of 9 personal photos, same card styling as portfolio but static images, no overlay controls
- `overscroll-behavior-y: none` set on `html` in `style.css` — this stops the trackpad "rubber-band" bounce-back that used to briefly reveal the footer then snap it away, which looked like a flickering bug but was actually native macOS/Chrome overscroll momentum on a short page
- No pricing page (intentional — quotes given per project)
- No MacBook/DaVinci-version mentions anywhere (removed on request)

---

## ➕ Adding a new portfolio video (current real markup — no title/tag/desc)

1. Compress video under 100MB in DaVinci Resolve (MP4, H.265, restrict to ~8,000 kbps)
2. Copy it into `assets/`: `cp ~/path/to/video.mp4 ~/Downloads/subin-portfolio/assets/`
3. Add a card inside `<div class="portfolio-grid">` in `pages/portfolio.html`:

```html
<div class="portfolio-card glass fade-in" data-category="motion">
  <div class="portfolio-thumb">
    <video src="../assets/your-video.mp4" muted loop preload="metadata" playsinline></video>
    <div class="portfolio-overlay">
      <div class="play-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <div class="fullscreen-btn" onclick="event.stopPropagation(); const v = this.closest('.portfolio-thumb').querySelector('video'); if (v.requestFullscreen) { v.requestFullscreen(); } else if (v.webkitEnterFullscreen) { v.webkitEnterFullscreen(); }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"/></svg>
      </div>
    </div>
  </div>
</div>
```

**`data-category` options:** `youtube` | `shortform` | `corporate` | `documentary` | `music` | `podcast` | `motion` (note: filter tabs to actually use these categories aren't currently on the live page — the category attribute is just there if filter UI gets added back later)

If you want a title/description back on a card, add this block right after `</div>` that closes `.portfolio-thumb`, before the final `</div>` that closes `.portfolio-card`:
```html
<div class="portfolio-info">
  <div class="portfolio-tag">YouTube</div>
  <h3 class="portfolio-title">Project Title Here</h3>
  <p class="portfolio-desc">Short description of the project.</p>
</div>
```
(The CSS for `.portfolio-info`/`.portfolio-tag`/`.portfolio-title`/`.portfolio-desc` is still in `pages.css`, just unused right now.)

---

## ➕ Adding a new photo

1. Copy the photo into `assets/`, named with the next sequential number (e.g. `11.webp`)
2. Add a card inside `<div class="portfolio-grid" id="photosGrid">` in `pages/photos.html`:

```html
<div class="portfolio-card glass fade-in">
  <div class="portfolio-thumb">
    <img src="../assets/11.webp" alt="Photo" style="width:100%; height:100%; object-fit:cover;">
  </div>
</div>
```

Current photo order on the page (Aug 2026): 7, 2, 3, 4, 8, 6, 9, 10, 1 — `5.webp` was removed from the page.

---

## 🌼 Onam — current state

Falling petals are OFF (the `for` loop calling `createPetal()` in `js/onam.js` is commented out), but the "Happy Onam!" banner still shows and is dismissible. `js/onam.js` and `css/onam.css` are still linked on all pages.

To re-enable petals next Onam season, uncomment the loop in `js/onam.js`. To remove the whole thing (banner included):
```bash
cd ~/Downloads/subin-portfolio
for f in index.html pages/*.html; do
  sed -i '' '/onam\.css\|onam\.js/d' "$f"
done
git add . && git commit -m "Remove Onam banner and script" && git push
```

---

## 🤖 Chatbot — editing answers

Open `js/chatbot.js`, find the `FAQS` array near the top. Each entry has `keywords` (what triggers it) and `answer` (HTML allowed). Add/edit entries there, then push as usual.

---

## 🎨 Customisation quick-reference

- **Colors:** CSS variables at the top of `css/style.css` (`--purple`, `--bg`, etc.)
- **Fonts:** `@import` line at the top of `css/style.css`
- **LinkedIn/Instagram URLs:** in `js/layout.js` — appear in FOUR places: desktop nav (`.nav-social`, inside `.nav-links`), mobile nav (`.nav-mobile-social`, inside `#mobileMenu`), and the footer (`.footer-link`, inside `footerHTML`)
- **Footer text:** in `js/layout.js`

---

## 🐛 Known quirks / lessons learned

- **Deployment queue:** rapid pushes cancel each other — always wait 2-3 min between pushes (see top of this file)
- **Relative paths:** always double-check `../` prefixes when editing files inside `pages/`
- **Duplicate script tags:** if a feature stops working after edits, check for accidentally duplicated `<script>`/`<link>` tags in the HTML (run `grep -c "somefile.js" index.html pages/*.html` — should always show `1`)
- **Browser cache:** always hard refresh (`⌘⇧R`) after confirming a deploy succeeded; when in doubt, check in a fresh incognito window — several "bugs" this session turned out to be pure caching
- **Don't assume file content matches this README** — verify with `cat`/`grep`/`sed -n` before editing. This session found: a completely missing `css/pages.css` despite being linked, a stray duplicate `portfolio.html` at repo root with different content, and portfolio cards with unbalanced `<div>` nesting from earlier automated edits. Always view the actual current file before writing a `python3`/`sed` edit against it.
- **iOS Safari fullscreen:** `Element.requestFullscreen()` doesn't work on `<video>` in iOS Safari — needs `video.webkitEnterFullscreen()` as a fallback (already implemented on the portfolio fullscreen buttons)
- **This chat's working files reset between sessions** — if a change was described but never confirmed pushed via `git log`, treat it as NOT done. Always verify with `git log --oneline` and `git show --stat HEAD` before assuming something is live.

---

## 💬 Starting a new Claude chat about this project

Paste this whole README as your first message, plus: *"Here's my portfolio project — help me with [whatever you need]."* That's enough context for a fresh conversation to pick up where this one left off. Given how much drifted from the previous README this session, it's worth asking the new chat to `cat`/`grep` any file it's about to edit rather than trusting this doc blindly for exact line numbers or content — this doc is accurate as of Aug 2026 but the file will keep changing.

---

## 📬 Contact
subinjoseph412@gmail.com
