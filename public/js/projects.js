document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');

    const observerOptions = {
        threshold: 0.4,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
});
