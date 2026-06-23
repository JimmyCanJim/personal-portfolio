// 1. Simplified Vite JSON import (No 'assert' needed)
import projects from '../data/projects.json';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('projects-container');

  try {
    // Map through the data and generate HTML
    const projectsHTML = projects.map(project => `
      <div class="project-card">
        <h2>${project.title}</h2>
        <h3>Description</h3>
        <p>${project.description}</p>
        
        <div class="project-slider">
          <button class="slider-btn prev">❮</button>
          <div class="slider-track">
            ${project.images.map(img => `<img src="${img}" alt="${project.title}" class="image">`).join('')}
          </div>
          <button class="slider-btn next">❯</button>
        </div>

        <div class="project-progress">
          <span class="progress-label">Completeness</span>
          <div class="progress-bar-wrapper">
            <div class="progress-bar-fill" data-percentage="${project.completeness}%"></div>
          </div>
          <span class="progress-value">${project.completeness}%</span>
        </div>

        <a href="${project.githubLink}" target="_blank" class="icon">
          <img src="assets/icons/github.png" alt="GitHub Icon" class="icon-image">
        </a>
      </div>
    `).join('');

    // Inject into the DOM
    container.innerHTML = projectsHTML;

    // IMPORTANT: Initialize all interactive features NOW that the cards exist
    initializeScrollObserver();
    initializeSliders();
    initializeLightbox();
    animateProgressBars();

  } catch (error) {
    console.error("Error loading projects:", error);
    container.innerHTML = "<p>Failed to load projects. Please try again later.</p>";
  }
});

// --- HELPER FUNCTIONS ---

// 1. Animates cards sliding into view as you scroll down
const initializeScrollObserver = () => {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
};

// 2. Handles the left/right arrows on the images
const initializeSliders = () => {
    const sliders = document.querySelectorAll('.project-slider');
    
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const images = slider.querySelectorAll('.image');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;

        if (images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return; 
        }

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });
    });
};

// 3. Handles clicking an image to view it fullscreen
const initializeLightbox = () => {
    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';
    const fullImg = document.createElement('img');
    fullImg.className = 'lightbox-image';
    
    backdrop.appendChild(fullImg);
    document.body.appendChild(backdrop);

    const allProjectImages = document.querySelectorAll('.project-slider .image');
    
    allProjectImages.forEach(img => {
        img.addEventListener('click', () => {
            fullImg.src = img.src; 
            backdrop.classList.add('active');
            setTimeout(() => fullImg.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        backdrop.classList.remove('active');
        fullImg.classList.remove('active');
        document.body.style.overflow = '';
    };

    backdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });
};

// 4. Animates the width of the progress bars
const animateProgressBars = () => {
    const observerOptions = {
      root: null, 
      threshold: 0.2 
    };
  
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBarFill = entry.target.querySelector('.progress-bar-fill');
          if (progressBarFill) {
            const targetPercentage = progressBarFill.getAttribute('data-percentage');
            setTimeout(() => {
              progressBarFill.style.width = targetPercentage;
            }, 500); 
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.project-card').forEach(card => {
      progressObserver.observe(card);
    });
};