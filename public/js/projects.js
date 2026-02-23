document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects');

  // 1. Create the overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // 2. The Scroll Observer
  const observerOptions = {
      threshold: 0.15, // Triggers when 15% is visible
      rootMargin: "0px 0px -50px 0px" 
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));

  // 3. Click-to-Zoom Logic
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.icon')) return;

      if (!card.classList.contains('active')) {
        projectsGrid.classList.add('dimmed');
        document.body.classList.add('card-open');
        overlay.classList.add('active');
        card.classList.add('active');
        document.body.style.overflow = 'hidden'; 
      }
    });
  });

  // 4. Close Logic
  overlay.addEventListener('click', () => {
    projectsGrid.classList.remove('dimmed');
    document.body.classList.remove('card-open');
    overlay.classList.remove('active');
    cards.forEach(c => c.classList.remove('active'));
    document.body.style.overflow = 'auto';
  });
});