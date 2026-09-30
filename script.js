/**
 * PORTAFOLIO PERSONAL - DASSIA
 * Estudiante de Desarrollo de Software
 * Script de interactividad, animaciones de scroll y accesibilidad
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initScrollReveal();
  initBackToTop();
  initDynamicYear();
});

/* ==========================================================================
   1. NAVBAR & MENÚ MÓVIL ACCESIBLE
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cambio de estilo al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Chequeo inicial

  // Apertura y cierre del menú móvil
  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : navMenu.classList.toggle('open');
      if (open !== undefined) {
        if (open) navMenu.classList.add('open');
        else navMenu.classList.remove('open');
      }
      navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      
      // Bloquear scroll de fondo en móvil mientras el menú está abierto
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    navToggle.addEventListener('click', () => {
      const willOpen = !navMenu.classList.contains('open');
      toggleMenu(willOpen);
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Cerrar menú al presionar tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Cerrar si se redimensiona a pantalla de escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }
}

/* ==========================================================================
   2. SCROLL SPY (Indicador de sección activa)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPosition = window.pageYOffset + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   3. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  // Si el usuario prefiere movimiento reducido, mostrar todo inmediatamente
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Dejar de observar una vez revelado
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. BOTÓN "VOLVER ARRIBA"
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. AÑO DINÁMICO
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.textContent = year >= 2026 ? year : 2026;
  }
}
