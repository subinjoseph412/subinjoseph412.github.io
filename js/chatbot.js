// ============================================================
//  SUBIN JOSEPH PORTFOLIO — Simple FAQ Chatbot
// ============================================================

(function () {

  // ── FAQ Database ─────────────────────────────────────────
  const FAQS = [
    {
      keywords: ['service', 'services', 'offer', 'do you edit', 'what do you do'],
      answer: "I offer video editing, color grading, sound design, motion graphics, subtitles/captions, and thumbnail design. Check the <a href='pages/services.html'>Services page</a> for details!"
    },
    {
      keywords: ['price', 'pricing', 'cost', 'rate', 'charge', 'how much'],
      answer: "Pricing depends on your project's length and complexity — I don't use a fixed rate card. <a href='pages/contact.html'>Get in touch</a> and I'll give you a fair, transparent quote."
    },
    {
      keywords: ['contact', 'email', 'reach', 'get in touch', 'hire'],
      answer: "You can reach me via email on the <a href='pages/contact.html'>Contact page</a> — I usually reply within 24 hours."
    },
    {
      keywords: ['portfolio', 'work', 'examples', 'sample', 'showreel'],
      answer: "Check out my <a href='pages/portfolio.html'>Portfolio page</a> to see recent work, including my Smartwatch UI Concept piece."
    },
    {
      keywords: ['tool', 'software', 'editing', 'davinci', 'resolve', 'premiere'],
      answer: "I edit using DaVinci Resolve — great for both editing and professional color grading."
    },
    {
      keywords: ['turnaround', 'time', 'long', 'deadline', 'how fast', 'delivery'],
      answer: "Turnaround depends on the project — short-form content can be done in 1-2 days, longer videos take more time. Let's discuss your timeline on the <a href='pages/contact.html'>Contact page</a>."
    },
    {
      keywords: ['worldwide', 'location', 'where', 'based', 'kerala', 'india', 'remote'],
      answer: "I'm based in Trivandrum, Kerala, India — but I work with clients worldwide, fully remote."
    },
    {
      keywords: ['revision', 'changes', 'edit again'],
      answer: "I'm happy to make revisions to get your video just right. Feel free to discuss specifics when we talk about your project."
    },
    {
      keywords: ['hello', 'hi', 'hey', 'sup'],
      answer: "Hey there! 👋 I'm Subin's assistant. Ask me about services, pricing, turnaround time, or how to get in touch!"
    },
    {
      keywords: ['thank', 'thanks', 'thank you'],
      answer: "You're welcome! Feel free to ask anything else, or head to the <a href='pages/contact.html'>Contact page</a> to start a project. 🎬"
    }
  ];

  const DEFAULT_ANSWER = "I'm a simple FAQ bot, so I might not have that answer! Try asking about services, pricing, turnaround time, or how to get in touch — or just email Subin directly on the <a href='pages/contact.html'>Contact page</a>.";

  const SUGGESTED_QUESTIONS = [
    "What services do you offer?",
    "How much does it cost?",
    "How can I contact you?",
    "Where are you based?"
  ];

  function findAnswer(query) {
    const lower = query.toLowerCase();
    for (const faq of FAQS) {
      if (faq.keywords.some(kw => lower.includes(kw))) {
        return faq.answer;
      }
    }
    return DEFAULT_ANSWER;
  }

  // ── Build chatbot HTML ───────────────────────────────────
  const chatbotHTML = `
    <div id="chatbotBubble" class="chatbot-bubble" aria-label="Open chat">
      <svg class="chatbot-icon-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="chatbot-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display:none;">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </div>

    <div id="chatbotWindow" class="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-header-avatar"><img src="${window.location.pathname.includes('/pages/') ? '../' : ''}assets/profile.jpg" alt="Subin Joseph" style="width:100%;height:100%;object-fit:cover;border-radius:10px;"></div>
        <button id="chatbotClose" class="chatbot-close-btn" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div>
          <div class="chatbot-header-title">Subin's Assistant</div>
          <div class="chatbot-header-sub">
            <span class="chatbot-status-dot"></span> Usually replies instantly
          </div>
        </div>
      </div>

      <div class="chatbot-messages" id="chatbotMessages">
        <div class="chatbot-msg chatbot-msg-bot">
          Hi! 👋 I'm a quick FAQ assistant. Ask me about services, pricing, or how to reach Subin!
        </div>
        <div class="chatbot-suggestions" id="chatbotSuggestions"></div>
      </div>

      <div class="chatbot-input-row">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Type a question..." autocomplete="off">
        <button id="chatbotSend" class="chatbot-send" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // ── Elements ──────────────────────────────────────────────
  const bubble = document.getElementById('chatbotBubble');
  const win = document.getElementById('chatbotWindow');
  const messages = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const suggestionsEl = document.getElementById('chatbotSuggestions');
  const iconOpen = bubble.querySelector('.chatbot-icon-open');
  const iconClose = bubble.querySelector('.chatbot-icon-close');

  // Populate suggestions
  SUGGESTED_QUESTIONS.forEach(q => {
    const chip = document.createElement('button');
    chip.className = 'chatbot-suggestion-chip';
    chip.textContent = q;
    chip.addEventListener('click', () => {
      sendMessage(q);
    });
    suggestionsEl.appendChild(chip);
  });

  // ── Toggle open/close ─────────────────────────────────────
  let isOpen = false;
  document.getElementById('chatbotClose').addEventListener('click', () => {
    isOpen = false;
    win.classList.remove('open');
    iconOpen.style.display = 'block';
    iconClose.style.display = 'none';
  });

  bubble.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    iconOpen.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
    if (isOpen) input.focus();
  });

  // ── Send message logic ────────────────────────────────────
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg chatbot-msg-${sender}`;
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chatbot-msg chatbot-msg-bot chatbot-typing';
    typing.id = 'chatbotTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('chatbotTyping');
    if (typing) typing.remove();
  }

  function sendMessage(text) {
    const query = (text || input.value).trim();
    if (!query) return;

    addMessage(query, 'user');
    input.value = '';

    // Hide suggestions after first message
    if (suggestionsEl) suggestionsEl.style.display = 'none';

    showTyping();
    setTimeout(() => {
      removeTyping();
      const answer = findAnswer(query);
      addMessage(answer, 'bot');
    }, 600 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

})();
