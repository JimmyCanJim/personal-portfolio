/* =========================================
   1. Skills Icons Carousel
========================================= */
const imgs = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Start in the middle automatically
let currentSkillIndex = Math.floor(imgs.length / 2);

function updateSkillsCarousel() {
  imgs.forEach((img, index) => {
    img.classList.remove('active');
    if (index === currentSkillIndex) {
      img.classList.add('active');
    }
  });
}

// Click logo directly
imgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentSkillIndex = index;
    updateSkillsCarousel();
  });
});

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentSkillIndex < imgs.length - 1) {
      currentSkillIndex++;
      updateSkillsCarousel();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentSkillIndex > 0) {
      currentSkillIndex--;
      updateSkillsCarousel();
    }
  });
}


/* =========================================
   2. Bio Image Slider (with Pop-up Captions)
========================================= */
const bioTrack = document.querySelector('.bio-track');
const bioSlides = document.querySelectorAll('.bio-slide'); 
const prevBioBtn = document.querySelector('.prev-bio');
const nextBioBtn = document.querySelector('.next-bio');
const bioMessageBox = document.getElementById('bio-message-box'); // Grabs the new box

let currentBioIndex = 0;

function updateBioSlider() {
  if (bioTrack) {
    // 1. Slide the images
    bioTrack.style.transform = `translateX(-${currentBioIndex * 100}%)`;
    
    // 2. Animate the message box
    if (bioMessageBox && bioSlides[currentBioIndex]) {
      // Find the hidden caption text for the current slide
      const captionText = bioSlides[currentBioIndex].querySelector('.bio-caption').textContent;
      
      // Remove the 'show' class to drop it down and fade it out
      bioMessageBox.classList.remove('show');
      
      // Wait 150 milliseconds, swap the text, and pop it back up!
      setTimeout(() => {
        bioMessageBox.textContent = captionText;
        bioMessageBox.classList.add('show');
      }, 150);
    }
  }
}

if (nextBioBtn) {
  nextBioBtn.addEventListener('click', () => {
    if (currentBioIndex < bioSlides.length - 1) {
      currentBioIndex++;
      updateBioSlider();
    }
  });
}

if (prevBioBtn) {
  prevBioBtn.addEventListener('click', () => {
    if (currentBioIndex > 0) {
      currentBioIndex--;
      updateBioSlider();
    }
  });
}


/* =========================================
   3. Initialize Both Carousels on Load
========================================= */
updateSkillsCarousel();
updateBioSlider();