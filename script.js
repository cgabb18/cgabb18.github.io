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
 
  // Contact form — currently a placeholder. To actually receive messages,
  // wire the form action to a service like Formspree, Getform, or Netlify Forms.
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Thanks — this form isn\'t connected to anything yet, but your message would go here.';
    formNote.classList.add('success');
    contactForm.reset();
  });
