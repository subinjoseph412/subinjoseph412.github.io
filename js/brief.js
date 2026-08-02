// ============================================================
//  PROJECT BRIEF GENERATOR
// ============================================================

(function () {
  const TOTAL_STEPS = 6; // 5 question steps + 1 summary
  let currentStep = 0;

  const answers = {
    type: '',
    footage: '',
    deadline: '',
    deadline_note: '',
    references: '',
    delivery: '',
    contact_name: '',
    contact_email: ''
  };

  const steps = document.querySelectorAll('.brief-step');
  const progressWrap = document.getElementById('briefProgress');
  const backBtn = document.getElementById('briefBackBtn');
  const nextBtn = document.getElementById('briefNextBtn');
  const navRow = document.getElementById('briefNav');

  // Build progress dots
  for (let i = 0; i < TOTAL_STEPS - 1; i++) {
    const dot = document.createElement('div');
    dot.className = 'brief-progress-dot';
    progressWrap.appendChild(dot);
  }
  const dots = progressWrap.querySelectorAll('.brief-progress-dot');

  function updateProgress() {
    dots.forEach((d, i) => d.classList.toggle('done', i < currentStep || currentStep === TOTAL_STEPS - 1));
  }

  // Single-select option buttons
  document.querySelectorAll('.brief-options').forEach(group => {
    const field = group.dataset.field;
    group.querySelectorAll('.brief-option').forEach(opt => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.brief-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        answers[field] = opt.textContent;
      });
    });
  });

  // Text inputs / textareas
  document.querySelectorAll('.brief-textarea, .brief-text-input').forEach(el => {
    el.addEventListener('input', () => {
      answers[el.dataset.field] = el.value;
    });
  });

  function showStep(index) {
    steps.forEach(s => s.classList.remove('active'));
    steps[index].classList.add('active');
    backBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

    if (index === TOTAL_STEPS - 1) {
      navRow.style.display = 'none';
      buildSummary();
    } else {
      navRow.style.display = 'flex';
      nextBtn.textContent = index === TOTAL_STEPS - 2 ? 'See my brief →' : 'Next →';
    }
    updateProgress();
  }

  nextBtn.addEventListener('click', () => {
    if (currentStep < TOTAL_STEPS - 1) {
      currentStep++;
      showStep(currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  backBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  function buildSummary() {
    const card = document.getElementById('briefSummaryCard');
    const copyBox = document.getElementById('briefCopyText');
    const mailtoBtn = document.getElementById('briefMailtoBtn');

    const rows = [
      ['Video type', answers.type || '—'],
      ['Footage', answers.footage || '—'],
      ['Timeline', [answers.deadline, answers.deadline_note].filter(Boolean).join(' — ') || '—'],
      ['References', answers.references || '—'],
      ['Delivery method', answers.delivery || '—'],
      ['From', [answers.contact_name, answers.contact_email].filter(Boolean).join(' · ') || '—']
    ];

    card.innerHTML = rows.map(([label, value]) => `
      <div class="brief-summary-row">
        <div class="brief-summary-label">${label}</div>
        <div class="brief-summary-value">${escapeHtml(value)}</div>
      </div>
    `).join('');

    const plainText =
`Project Brief

Video type: ${answers.type || '-'}
Footage: ${answers.footage || '-'}
Timeline: ${[answers.deadline, answers.deadline_note].filter(Boolean).join(' - ') || '-'}
References: ${answers.references || '-'}
Delivery method: ${answers.delivery || '-'}
From: ${[answers.contact_name, answers.contact_email].filter(Boolean).join(' - ') || '-'}`;

    copyBox.textContent = plainText;

    const subject = encodeURIComponent(`Project Brief — ${answers.type || 'New Project'}`);
    const body = encodeURIComponent(plainText);
    mailtoBtn.href = `mailto:subinjoseph412@gmail.com?subject=${subject}&body=${body}`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  document.getElementById('briefCopyBtn').addEventListener('click', () => {
    const text = document.getElementById('briefCopyText').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('briefCopyBtn');
      const original = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    });
  });

  showStep(0);
})();
