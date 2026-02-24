const imgs = document.querySelectorAll('.carousel-img');
const msgBox = document.getElementById('skill-message');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Start in the middle automatically
let currentIndex = Math.floor(imgs.length / 2);

function updateCarousel() {
  imgs.forEach((img, index) => {
    img.classList.remove('active');

    if (index === currentIndex) {
      img.classList.add('active');

      const message = img.getAttribute('data-message');
      if (message) {
        msgBox.innerText = message;
        msgBox.style.opacity = "1";
      }
    }
  });
}

// Click logo directly
imgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < imgs.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// 🔥 Initialize on page load
updateCarousel();