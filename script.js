  const toggle = document.getElementById('gridToggle');
  const overlay = document.getElementById('gridOverlay');
  let on = false;
  toggle.addEventListener('click', () => {
    on = !on;
    overlay.classList.toggle('on', on);
    toggle.classList.toggle('active', on);
    toggle.setAttribute('aria-pressed', on);
  });
 
  // Theme toggle — defaults to system preference, switchable in-session
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = prefersDark;
 
  function applyTheme(){
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.classList.toggle('active', isDark);
    themeToggle.setAttribute('aria-pressed', isDark);
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeLabel.textContent = isDark ? 'LIGHT' : 'DARK';
  }
  applyTheme();
 
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme();
  });
 
  // Contact form — submits to Web3Forms via fetch so the page doesn't reload
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
 
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending…';
    formNote.classList.remove('success', 'error');
    formNote.textContent = '';
 
    try {
      const formData = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      const result = await res.json();
 
      if (result.success) {
        formNote.textContent = 'Thanks — your message has been sent.';
        formNote.classList.add('success');
        contactForm.reset();
      } else {
        formNote.textContent = 'Something went wrong. Please try again or email directly.';
        formNote.classList.add('error');
      }
    } catch (err) {
      formNote.textContent = 'Something went wrong. Please try again or email directly.';
      formNote.classList.add('error');
    } finally {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Send message →';
    }
  });

