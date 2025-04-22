// Configuration globale des images
const imageConfig = {
  "plomberie": {
    "images": [
      {
        "filename": "salle-de-bain1.jpg",
        "caption": "Installation complète d'une salle de bain moderne"
      },
      {
        "filename": "avant1.jpg",
        "caption": "Salle de bain avant travaux"
      },
      {
        "filename": "apres1.jpg",
        "caption": "Salle de bain après travaux"
      }
    ]
  },
  "renovation": {
    "images": [
      {
        "filename": "cuisine1.jpg",
        "caption": "Cuisine avec pose de verrière"
      },
      {
        "filename": "interieur1.jpg",
        "caption": "Création de cloisons et pose de sol"
      },
      {
        "filename": "placo1.jpg",
        "caption": "Pose de placo"
      }
    ]
  },
  "exterieur": {
    "images": [
      {
        "filename": "terrasse-bois1.jpg",
        "caption": "Terrasse en bois sur mesure"
      },
      {
        "filename": "ravalement1.jpg",
        "caption": "Ravalement de façade"
      },
      {
        "filename": "ravalement2.jpg",
        "caption": "Ravalement de façade"
      }
    ]
  }
};

// Fonction pour charger les images d'un carrousel
function loadCarouselImages(carouselId) {
  if (!imageConfig[carouselId]) {
    console.error(`Configuration non trouvée pour le carrousel ${carouselId}`);
    return;
  }

  const carousel = document.querySelector(`#${carouselId} .carousel`);
  const track = carousel.querySelector('.carousel-track');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-content');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');

  // Vider le track
  track.innerHTML = '';

  // Ajouter les images
  imageConfig[carouselId].images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = `images/${carouselId}/${image.filename}`;
    img.alt = image.caption;
    img.dataset.caption = image.caption;
    img.classList.add('w-full', 'flex-shrink-0', 'object-cover');
    img.style.aspectRatio = '16/9';
    img.onclick = () => {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = image.caption;
      lightbox.classList.add('active');
    };
    track.appendChild(img);
  });

  // Initialiser le carrousel
  initCarousel(carousel);
}

// Fonction d'initialisation du carrousel
function initCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-nav.prev');
  const nextBtn = carousel.querySelector('.carousel-nav.next');
  const images = track.querySelectorAll('img');
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  // Initialiser la position
  updateCarousel();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // Charger les carrousels
  loadCarouselImages('plomberie');
  loadCarouselImages('renovation');
  loadCarouselImages('exterieur');

  let currentCarousel = null;
  let currentIndex = 0;

  // Mise à jour de l'événement onclick des images
  document.querySelectorAll('.carousel img').forEach((img) => {
    img.onclick = () => {
      const carouselElement = img.closest('.carousel');
      const carouselId = carouselElement.closest('[id]').id;
      currentCarousel = carouselId;
      currentIndex = Array.from(carouselElement.querySelectorAll('img')).indexOf(img);
      updateLightboxImage();
      lightbox.classList.add('active');
    };
  });

  // Initialisation des fonctionnalités
  initFloatingButton();
  initLightbox();
});

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
