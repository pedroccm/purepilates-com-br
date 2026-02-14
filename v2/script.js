// ===== Header scroll effect =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');

function toggleMenu() {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  mobileOverlay.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) toggleMenu();
  });
});

// ===== Scroll animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ===== Video modal =====
const videoModal = document.getElementById('videoModal');
const videoThumb = document.querySelector('.app-video-thumb');
const videoClose = document.querySelector('.video-modal-close');

if (videoThumb) {
  videoThumb.addEventListener('click', () => {
    videoModal.classList.add('active');
    const iframe = videoModal.querySelector('iframe');
    iframe.src = 'https://www.youtube.com/embed/kM4KWfwIh-8?autoplay=1';
    document.body.style.overflow = 'hidden';
  });
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  const iframe = videoModal.querySelector('iframe');
  iframe.src = '';
  document.body.style.overflow = '';
}

if (videoClose) {
  videoClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Counter animation for stats =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.hero-stat-number');
      counters.forEach(counter => animateCounter(counter));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}
