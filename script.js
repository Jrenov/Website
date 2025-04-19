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
