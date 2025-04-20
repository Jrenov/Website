// Initialisation des carrousels
function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(carousel => {
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    let currentIndex = 0;
    
    function getSlideWidth() {
      return slides[0].getBoundingClientRect().width;
    }

    function updateCarousel() {
      const slideWidth = getSlideWidth();
      const offset = -currentIndex * slideWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
  });
}

// Gestion du bouton de contact flottant
function initFloatingButton() {
  const floatingBtn = document.querySelector('.floating-contact-btn');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    floatingBtn.classList.toggle('visible', currentScrollY > 200);
  });
}

// Gestion de la lightbox
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentCarousel = null;
  let currentIndex = 0;

  function updateLightbox() {
    const images = currentCarousel.querySelectorAll('img');
    lightboxImg.src = images[currentIndex].src;
    lightboxCaption.textContent = images[currentIndex].alt;
  }

  function toggleLightbox(show) {
    lightbox.classList.toggle('active', show);
    document.body.style.overflow = show ? 'hidden' : '';
  }

  // Initialisation des événements de clic sur les images
  document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentCarousel = carousel;
        currentIndex = index;
        updateLightbox();
        toggleLightbox(true);
      });
    });
  });

  // Navigation dans la lightbox
  function navigate(direction) {
    const images = currentCarousel.querySelectorAll('img');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateLightbox();
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
  });

  // Gestion des événements de fermeture
  function closeLightbox() {
    toggleLightbox(false);
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
    }
  });
}

// Initialisation de toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initFloatingButton();
  initLightbox();
});
