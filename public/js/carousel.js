const imgs = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Start in the middle automatically
let currentIndex = Math.floor(imgs.length / 2);

function updateCarousel() {
  imgs.forEach((img, index) => {
    img.classList.remove('active');

    if (index === currentIndex) {
      img.classList.add('active');
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

document.addEventListener("DOMContentLoaded", () => {
    const bioTrack = document.querySelector('.bio-track');
    const bioImages = document.querySelectorAll('.bio-img');
    const prevBioBtn = document.querySelector('.prev-bio');
    const nextBioBtn = document.querySelector('.next-bio');

    // Only run if the elements actually exist on the page
    if (bioTrack && bioImages.length > 0) {
        let currentBioIndex = 0;

        const updateBioSlider = () => {
            // Slide by 100% of the viewport width
            bioTrack.style.transform = `translateX(-${currentBioIndex * 100}%)`;
        };

        nextBioBtn.addEventListener('click', () => {
            currentBioIndex = (currentBioIndex + 1) % bioImages.length;
            updateBioSlider();
        });

        prevBioBtn.addEventListener('click', () => {
            currentBioIndex = (currentBioIndex - 1 + bioImages.length) % bioImages.length;
            updateBioSlider();
        });
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