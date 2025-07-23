const carousel = document.getElementById("carousel");
const audio = document.getElementById("radio");
const playBtn = document.getElementById("playAudio");

fetch('media.json')
  .then(res => res.json())
  .then(mediaList => {
    mediaList.forEach(file => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");

      if (file.endsWith('.mp4')) {
        const video = document.createElement("video");
        video.src = `img/${file}`;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        item.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = `img/${file}`;
        item.appendChild(img);
      }

      carousel.appendChild(item);
    });

    let index = 0;
    setInterval(() => {
      index = (index + 1) % mediaList.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
  });

// Activar audio si no inicia automáticamente
playBtn.addEventListener("click", () => {
  audio.muted = false;
  audio.play().catch(err => {
    alert("Tu navegador bloqueó la reproducción automática.");
  });
});