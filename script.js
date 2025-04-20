// Sélectionner tous les carrousels
const carousels = document.querySelectorAll('[data-carousel]');

carousels.forEach(carousel => {
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);

  let currentIndex = 0;
  
  // Fonction pour calculer la largeur des diapositives
  function getSlideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  // Fonction pour déplacer le carrousel
  function updateCarousel() {
    const slideWidth = getSlideWidth();
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  // Gérer le clic sur le bouton précédent
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateCarousel();
  });

  // Gérer le clic sur le bouton suivant
  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });

  // S'assurer que le carrousel est bien initialisé au bon endroit
  updateCarousel();

  // Réajuster la largeur des diapositives lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    updateCarousel();
  });
});

// Gestion du bouton de contact flottant
const floatingBtn = document.querySelector('.floating-contact-btn');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Afficher le bouton si on est à plus de 200px du haut
  if (currentScrollY > 200) {
    floatingBtn.classList.add('visible');
  } else {
    floatingBtn.classList.remove('visible');
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentCarousel = null;
let currentIndex = 0;

// Ajouter un gestionnaire de clic à toutes les images des carrousels
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentCarousel = carousel;
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
});

function updateLightbox() {
  const images = currentCarousel.querySelectorAll('img');
  lightboxImg.src = images[currentIndex].src;
  lightboxCaption.textContent = images[currentIndex].alt;
}

// Navigation
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const images = currentCarousel.querySelectorAll('img');
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const images = currentCarousel.querySelectorAll('img');
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  } else if (e.key === 'ArrowLeft') {
    const images = currentCarousel.querySelectorAll('img');
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  } else if (e.key === 'ArrowRight') {
    const images = currentCarousel.querySelectorAll('img');
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

// Fermer la lightbox en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});
