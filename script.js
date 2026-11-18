document.querySelectorAll('.collage img').forEach(img => {
  const setRatio = () => img.style.setProperty('--r', img.naturalWidth / img.naturalHeight);
  if (img.complete) setRatio();
  else img.addEventListener('load', setRatio);
});
const images = Array.from(document.querySelectorAll('.gallery img, .photo-gallery img, .collage img'));
const box = document.getElementById('lightbox');
const bigImg = box.querySelector('.lb-img');
let current = 0;

function show(i) {
  current = (i + images.length) % images.length;
  bigImg.src = images[current].src;
  bigImg.alt = images[current].alt;
  box.classList.add('open');
}

function closeBox() {
  box.classList.remove('open');
}

images.forEach((img, i) => img.addEventListener('click', () => show(i)));

box.querySelector('.lb-close').addEventListener('click', closeBox);
box.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
box.querySelector('.lb-next').addEventListener('click', () => show(current + 1));

box.addEventListener('click', (e) => {
  if (e.target === box) closeBox();
});

document.addEventListener('keydown', (e) => {
  if (!box.classList.contains('open')) return;
  if (e.key === 'Escape') closeBox();
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft') show(current - 1);
});
