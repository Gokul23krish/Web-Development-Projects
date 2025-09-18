// Basic interactivity: nav toggle, smooth scrolling, reveal on scroll,
// filtering projects, contact form mock validation and status.

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav if open
          if (document.querySelector('.nav.open')) document.querySelector('.nav').classList.remove('open');
        }
      }
    });
  });

  // reveal on scroll (intersection observer)
  const revealEls = document.querySelectorAll('.section, .hero-card, .project-card, .about-card');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));

  // Project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
          // re-trigger reveal if not visible yet
          setTimeout(() => card.classList.add('visible'), 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact form (mock submit)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // simple validation
    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      return;
    }

    // simulate sending (client-side only)
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent! I will reply to your email soon. (This is a demo — wire a real backend or use Formspree/Netlify Forms.)';
      form.reset();
    }, 900);
  });

  // reduce motion: optional small parallax on hero image if not reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroCard = document.querySelector('.hero-card img');
    if (heroCard) {
      window.addEventListener('mousemove', (e) => {
        const midX = window.innerWidth / 2;
        const midY = window.innerHeight / 2;
        const dx = (e.clientX - midX) / midX;
        const dy = (e.clientY - midY) / midY;
        heroCard.style.transform = `translate(${dx * 6}px, ${dy * -6}px)`;
      });
      window.addEventListener('mouseout', () => heroCard.style.transform = 'translate(0,0)');
    }
  }
});
