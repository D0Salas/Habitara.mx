/* ============================================================
   HABITARA — main.js
   ------------------------------------------------------------
   Funcionalidades:
   1. Nav — efecto de scroll (transparente → sólido)
   2. Menú móvil — abrir / cerrar
   3. Animaciones — fade-in al hacer scroll
   4. Formulario de contacto — envío con feedback visual
   ============================================================ */


/* ─── 1. NAV: EFECTO SCROLL ─────────────────────────────────
   Agrega la clase `.scrolled` al <nav> cuando el usuario
   baja más de 40px. El CSS de style.css se encarga del
   cambio visual (color de fondo, logo, links).
   ──────────────────────────────────────────────────────────── */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


/* ─── 2. MENÚ MÓVIL ─────────────────────────────────────────
   El botón hamburguesa abre el overlay `.mobile-menu`.
   La X y cualquier link dentro del menú lo cierran.
   ──────────────────────────────────────────────────────────── */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn   = document.getElementById('closeMenu');

// Abrir
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden'; // evita scroll de fondo
});

// Cerrar con la X
closeBtn.addEventListener('click', closeMobile);

// Cerrar al hacer clic en un link del menú
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobile);
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = ''; // restaura el scroll
}


/* ─── 3. ANIMACIONES: FADE-IN AL SCROLL ─────────────────────
   Usa IntersectionObserver para agregar la clase `.visible`
   a cualquier elemento con clase `.fade-in` cuando entra
   en el viewport. El CSS maneja la transición.

   Para animar un nuevo elemento, simplemente agrégale
   la clase `fade-in` en el HTML.
   ──────────────────────────────────────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // solo anima una vez
      }
    });
  },
  { threshold: 0.12 } // se activa cuando el 12% del elemento es visible
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* ─── 5. SLIDESHOW DE DESTINOS ───────────────────────────────
   Rota las imágenes de cada destino con fade.

   CONFIGURACIÓN:
   - INTERVAL_MS → duración de cada imagen en milisegundos
                   (6000 = 6 segundos)
   - Para agregar imágenes: añade un <div class="dest-slide">
     en el HTML con su background-image correspondiente.
   ──────────────────────────────────────────────────────────── */
const INTERVAL_MS = 6000; // ← cambia aquí la duración

function initSlideshow(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = container.querySelectorAll('.dest-slide');
  if (slides.length < 2) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, INTERVAL_MS);
}

// Inicializar slideshows — agrega más IDs si añades más destinos
initSlideshow('slideshow-tab');
initSlideshow('slideshow-qr');


/* ─── 4. FORMULARIO DE CONTACTO ─────────────────────────────
   Manejo básico del formulario con feedback visual.

   PARA CONECTAR UN BACKEND REAL:
   - Reemplaza el bloque dentro de handleSubmit con una
     llamada fetch() a tu endpoint o servicio (Formspree,
     EmailJS, tu propio servidor, etc.)
   - Ejemplo con Formspree:
       fetch('https://formspree.io/f/TU_ID', {
         method: 'POST',
         body: new FormData(e.target),
         headers: { Accept: 'application/json' }
       })

   ──────────────────────────────────────────────────────────── */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;

  // Estado de carga
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  /* ── REEMPLAZA ESTO con tu lógica real de envío ── */
  setTimeout(() => {

    // Estado de éxito
    btn.textContent = '¡Mensaje enviado!';

    // Restaurar después de 3 segundos
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      e.target.reset();
    }, 3000);

  }, 1200); // simula latencia de red
  /* ─────────────────────────────────────────────── */
}


/* ─── TABS ─────────────────────────────────────────────────── */
(function() {
  var btns   = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  if (!btns.length || !panels.length) return;

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.getAttribute('data-tab'));
      btns.forEach(function(b)   { b.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      panels[idx].classList.add('active');
      document.querySelector('.tabs-nav').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
