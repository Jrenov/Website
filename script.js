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

// Ajouter un gestionnaire de clic à toutes les images des carrousels
document.querySelectorAll('.carousel img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
  });
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Réactiver le scroll
});

// Fermer la lightbox en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Fermer la lightbox avec la touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});
