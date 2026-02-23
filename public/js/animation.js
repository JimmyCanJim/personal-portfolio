const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('touchstart', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener('touchend', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 0.7 + 0.8; 
    this.vx = (Math.random() - 0.5) * 0.5; 
    this.vy = (Math.random() - 0.5) * 0.5;
    this.density = (Math.random() * 20) + 1;
  }

  draw() {
    ctx.save();
    ctx.shadowBlur = 0; 
    ctx.fillStyle = 'rgba(255, 176, 165, 0.8)';
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if (mouse.x !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        
        this.x -= directionX;
        this.y -= directionY;
      }
    }
  }
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  init(); 
}

function init() {
  const logicalWidth = canvas.width / (window.devicePixelRatio || 1);
  const logicalHeight = canvas.height / (window.devicePixelRatio || 1);
  
  ctx.clearRect(0, 0, logicalWidth, logicalHeight);
  particles = [];
  
  const area = logicalWidth * logicalHeight;
  const numberOfParticles = Math.floor(area / 10000); 

  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(logicalWidth, logicalHeight));
  }
}

function animate() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over';

  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
resizeCanvas();
animate();