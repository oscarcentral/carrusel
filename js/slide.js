const slides = [
  { type: 'image', src: 'img/1.png' },
  { type: 'image', src: 'img/2.png' },
  { type: 'image', src: 'img/3.png' }
];

let current = 0;
const carousel = document.getElementById('carousel');

function showSlide(index) {
  carousel.innerHTML = ''; // Limpia el contenedor

  const slide = slides[index];
  let element;

  if (slide.type === 'image') {
    element = document.createElement('img');
    element.src = slide.src;
    element.className = 'slide';
    carousel.appendChild(element);

    setTimeout(nextSlide, 5000); // Imagen: 5 seg
  } else if (slide.type === 'video') {
    element = document.createElement('video');
    element.src = slide.src;
    element.className = 'slide';
    element.autoplay = true;
    element.muted = true;
    element.onended = nextSlide;
    carousel.appendChild(element);
  }
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function habilitarAudio() {
  const audio = document.getElementById('bg-audio');
  audio.muted = false;
  audio.play();
  document.getElementById('audio-control').style.display = 'none';
}

// Iniciar carrusel
window.addEventListener('DOMContentLoaded', () => {
  showSlide(current);
});
