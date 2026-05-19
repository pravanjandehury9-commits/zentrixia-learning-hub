// =============================================
// Zentrixia Learning Hub — main.js
// =============================================

// init AOS (scroll animations)
AOS.init({
  once: true,
  offset: 80,
  duration: 700,
  easing: 'ease-out-quart'
});


// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// --- Mobile hamburger menu ---
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// --- Dark / Light mode toggle ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const htmlEl      = document.documentElement;

// load saved preference
const savedTheme = localStorage.getItem('zentrixia-theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('zentrixia-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-moon';
  } else {
    themeIcon.className = 'fa-solid fa-sun';
  }
}


// --- Course filter ---
const filterBtns  = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    courseCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// --- Join form submit ---
const joinForm    = document.getElementById('joinForm');
const formSuccess = document.getElementById('formSuccess');

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // simple validation check
  const name   = document.getElementById('name').value.trim();
  const email  = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value;

  if (!name || !email || !course) {
    alert('Please fill in all required fields.');
    return;
  }

  // pretend it was submitted
  joinForm.style.display    = 'none';
  formSuccess.style.display = 'block';
});


// --- Scroll to top button ---
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- Active nav link on scroll ---
// highlights the nav link for whichever section is in view
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text)';
    }
  });
});