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

---

## 📁 File Structure

```
├── index.html              ← Homepage (hero, services preview, brief CTA, portfolio preview, CTA)
├── css/
│   ├── style.css           ← All core styles
│   └── onam.css            ← Onam seasonal animation (toggleable, see below)
├── js/
│   ├── layout.js           ← Shared nav + footer (injected into every page)
│   ├── main.js              ← Fade-ins, email reveal, facts carousel logic
│   ├── chatbot.js           ← FAQ chatbot widget (bottom-right bubble)
│   ├── brief.js              ← Project brief generator logic
│   └── onam.js              ← Onam petals animation (toggleable, see below)
├── pages/
│   ├── portfolio.html      ← Full portfolio grid + showreel section
│   ├── services.html       ← Services page
│   ├── about.html          ← About page
│   ├── contact.html        ← Contact page (email reveal button)
│   └── brief.html            ← 5-step guided project brief form
└── assets/
    ├── profile.jpg          ← Profile photo (nav, About page, chatbot avatar)
    └── Watch.mp4             ← "Smartwatch UI Concept" — first portfolio video, in showreel
```

**Path rule:** files in `pages/` need `../` prefixes for css/js/assets (e.g. `../css/style.css`). Root-level `index.html` does not.

---

## ✅ What's built so far

- 6-page site: Home, Portfolio, Services, About, Contact, Brief (project brief form)
- Dark theme + purple accents, Apple liquid glass effect on cards
- Plus Jakarta Sans (headings) + Inter (body) fonts
- SJ monogram logo + profile photo (nav, About page, chatbot avatar)
- Animated DaVinci-Resolve-style editor graphic in the hero
- Email reveal button (Gmail icon, click to show email, tap to copy)
- FAQ chatbot (bottom-right bubble) — answers services/pricing/location questions from a keyword list in `js/chatbot.js`. Has a typing-indicator delay before the first greeting, avatar photo in header, close (✕) button.
- "Did You Know?" facts/myths carousel about video editing (scrollable cards on homepage)
- Onam seasonal animation (falling petals + dismissible banner that also stops the petals when closed) — see toggle instructions below
- Project brief generator (`pages/brief.html`) — 5-step guided form (video type, footage, timeline, references, delivery/contact) ending in a copyable summary + "Open in email" mailto button. Linked from a homepage CTA card titled "Let's Talk Project Details."
- One portfolio piece live: "Smartwatch UI Concept" (Watch.mp4), shown in the Portfolio page showreel slot
- No pricing page (intentional — quotes given per project)
- No MacBook/DaVinci-version mentions anywhere (removed on request)

---

## ➕ Adding a new portfolio video

1. Compress video under 100MB in DaVinci Resolve (MP4, H.265, restrict to ~8,000 kbps)
2. Copy it into `assets/`: `cp ~/path/to/video.mp4 ~/Downloads/subin-portfolio/assets/`
3. Add a card to `pages/portfolio.html` inside `<div class="portfolio-grid">`:

```html
<div class="portfolio-card glass fade-in" data-category="youtube">
  <div class="portfolio-thumb">
    <video src="../assets/your-video.mp4" muted loop preload="metadata" playsinline></video>
    <div class="portfolio-overlay">
      <div class="play-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
    </div>
  </div>
  <div class="portfolio-info">
    <div class="portfolio-tag">YouTube</div>
    <h3 class="portfolio-title">Project Title</h3>
    <p class="portfolio-desc">Brief description.</p>
  </div>
</div>
```

**`data-category` options:** `youtube` | `shortform` | `corporate` | `documentary` | `music` | `podcast` | `motion`

---

## 🌼 Onam animation — how to remove after the season

Fully separate files (`js/onam.js`, `css/onam.css`), loaded via `<link>`/`<script>` tags on all 5 original HTML pages.

**To remove:**
```bash
cd ~/Downloads/subin-portfolio
for f in index.html pages/*.html; do
  sed -i '' '/onam\.css\|onam\.js/d' "$f"
done
git add . && git commit -m "Remove Onam animation" && git push
```
(Deletes the reference lines only — safe to keep `onam.js`/`onam.css` around for next year.)

---

## 🤖 Chatbot — editing answers

Open `js/chatbot.js`, find the `FAQS` array near the top. Each entry has `keywords` (what triggers it) and `answer` (HTML allowed). Add/edit entries there, then push as usual.

---

## 🎨 Customisation quick-reference

- **Colors:** CSS variables at the top of `css/style.css` (`--purple`, `--bg`, etc.)
- **Fonts:** `@import` line at the top of `css/style.css`
- **LinkedIn/Instagram URLs:** in `js/layout.js` (footer + nav) and `pages/about.html`
- **Footer text:** in `js/layout.js`

---

## 🐛 Known quirks / lessons learned

- **Deployment queue:** rapid pushes cancel each other — always wait 2-3 min between pushes (see top of this file)
- **Relative paths:** always double-check `../` prefixes when editing files inside `pages/`
- **Duplicate script tags:** if a feature stops working after edits, check for accidentally duplicated `<script>`/`<link>` tags in the HTML (run `grep -c "somefile.js" index.html pages/*.html` — should always show `1`)
- **Browser cache:** always hard refresh (`⌘⇧R`) after confirming a deploy succeeded
- **This chat's working files reset between sessions** — if a change was described but never confirmed pushed via `git log`, treat it as NOT done. Always verify with `git log --oneline` and `git show --stat HEAD` before assuming something is live.

---

## 💬 Starting a new Claude chat about this project

Paste this whole README as your first message, plus: *"Here's my portfolio project — help me with [whatever you need]."* That's enough context for a fresh conversation to pick up where this one left off.

---

## 📬 Contact
subinjoseph412@gmail.com
