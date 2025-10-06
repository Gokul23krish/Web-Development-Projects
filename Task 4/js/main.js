// Cascade Blog - Main JS
// Features: search filter by title, mobile nav toggle, simple contact form handling

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primaryNav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      nav.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'A') {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Search filter by title (works on index.html and blog.html)
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    if (searchInput) {
      const cards = Array.from(document.querySelectorAll('.post-card'));
      const items = cards.map((card) => ({
        card,
        title: (card.querySelector('.post-title')?.textContent || '').toLowerCase(),
      }));

      const filter = () => {
        const q = searchInput.value.trim().toLowerCase();
        let visible = 0;
        items.forEach(({ card, title }) => {
          const show = !q || title.includes(q);
          card.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        if (noResults) {
          noResults.style.display = visible === 0 ? 'block' : 'none';
        }
      };

      searchInput.addEventListener('input', filter);
    }

    // Contact form (demo handler)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const status = document.getElementById('formStatus');
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        let error = '';
        if (!name || !email || !message) {
          error = 'Please fill in all fields.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          error = 'Please enter a valid email address.';
        }

        if (error) {
          if (status) {
            status.style.display = 'inline';
            status.style.color = '#f87171'; // red-400
            status.textContent = error;
          }
          return;
        }

        // Demo success state (no backend)
        if (status) {
          status.style.display = 'inline';
          status.style.color = '#9ca3af'; // gray-400
          status.textContent = 'Thanks! Your message has been sent (demo).';
        }
        contactForm.reset();
      });
    }
  });
})();
