document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');

    /* 1. Intersection Observer for Scroll Animations */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    /* 2. Image Sliders Logic */
    const sliders = document.querySelectorAll('.project-slider');
    
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const images = slider.querySelectorAll('.image');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;

        // If there's only 1 image, hide the navigation arrows
        if (images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return; // Stop running slider logic for this card
        }

        const updateSlider = () => {
            // Moves the track left by 100% of the image width per index
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents clicking the arrow from triggering the lightbox
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });
    });

    /* 3. Lightbox Setup */
    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';

    const fullImg = document.createElement('img');
    fullImg.className = 'lightbox-image';

    backdrop.appendChild(fullImg);
    document.body.appendChild(backdrop);

    /* 4. Lightbox Click Logic */
    // Now attaches to ALL images inside the sliders
    const allProjectImages = document.querySelectorAll('.project-slider .image');
    
    allProjectImages.forEach(img => {
        img.addEventListener('click', () => {
            fullImg.src = img.src; 
            backdrop.classList.add('active');
            setTimeout(() => fullImg.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    /* 5. Close Lightbox Logic */
    const closeLightbox = () => {
        backdrop.classList.remove('active');
        fullImg.classList.remove('active');
        document.body.style.overflow = '';
    };

    backdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });
});