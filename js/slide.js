const slideshow = document.getElementById("slideshow");
const defaultDuration = 10000; // 10 segundos para imágenes
let current = 0;
let slides = [];

fetch("slides.json")
  .then(response => response.json())
  .then(files => {
    files.forEach((file, i) => {
      const ext = file.split('.').pop().toLowerCase();
      let element;

      if (ext === "mp4") {
        element = document.createElement("video");
        element.src = file;
        element.autoplay = true;
        element.muted = true;
        element.loop = false; // desactivamos loop
      } else {
        element = document.createElement("img");
        element.src = file;
      }

      element.classList.add("slide");
      if (i === 0) element.classList.add("active");
      slideshow.appendChild(element);
    });

    slides = document.querySelectorAll(".slide");
    startSlideshow();
  })
  .catch(err => {
    console.error("Error cargando slides.json", err);
    slideshow.innerHTML = "<p style='color:white'>Error cargando presentación.</p>";
  });

function startSlideshow() {
  if (slides.length === 0) return;

  const currentSlide = slides[current];
  currentSlide.classList.add("active");

  if (currentSlide.tagName === "VIDEO") {
    currentSlide.currentTime = 0;
    currentSlide.play();

    currentSlide.onended = () => {
      nextSlide();
    };
  } else {
    setTimeout(() => {
      nextSlide();
    }, defaultDuration);
  }
}

function nextSlide() {
  const currentSlide = slides[current];
  currentSlide.classList.remove("active");

  if (currentSlide.tagName === "VIDEO") {
    currentSlide.pause();
    currentSlide.onended = null;
  }

  current = (current + 1) % slides.length;
  startSlideshow();
}
