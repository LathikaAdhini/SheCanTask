// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initRevealAnimation();
  initMouseGlow();
  initParallax();
});

// ==========================================
// Set Current Year in Footer
// ==========================================

function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()} She Can Foundation — A registered nonprofit`;
  }
}

// ==========================================
// Reveal Animation on Scroll
// ==========================================

function initRevealAnimation() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optionally stop observing after reveal
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

// ==========================================
// Mouse Glow Effect
// ==========================================

function initMouseGlow() {
  const heroGlow = document.getElementById('heroGlow');
  
  if (!heroGlow) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    heroGlow.style.background = `radial-gradient(700px circle at ${x}% ${y}%, oklch(0.85 0.13 55 / 0.35), transparent 65%)`;
  });
}

// ==========================================
// Parallax Scrolling
// ==========================================

function initParallax() {
  let scrollY = 0;
  
  const updateParallax = () => {
    scrollY = window.scrollY;
    
    // Hero parallax
    const heroBg = document.querySelector('.hero-bg');
    const heroNumeral = document.querySelector('.hero-numeral');
    
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
    
    if (heroNumeral) {
      heroNumeral.style.transform = `translateY(${scrollY * -0.15}px)`;
    }
    
    // Transformation parallax
    const transformBgLeft = document.querySelector('.transform-bg-left');
    const transformBgRight = document.querySelector('.transform-bg-right');
    
    if (transformBgLeft) {
      transformBgLeft.style.transform = `translateY(${scrollY * -0.08}px)`;
    }
    
    if (transformBgRight) {
      transformBgRight.style.transform = `translateY(${scrollY * -0.12}px)`;
    }
    
    // Donate section parallax
    const donateBg = document.querySelector('.donate-bg');
    if (donateBg) {
      const offsetScroll = Math.max(0, scrollY - 4000);
      donateBg.style.transform = `translateY(${offsetScroll * 0.08}px)`;
    }
  };
  
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', updateParallax, { passive: true });
  
  // Initial call
  updateParallax();
}

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for empty hashes or special cases
    if (href === '#' || href === '#top') {
      if (href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
      }
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==========================================
// Donate Button Interactions
// ==========================================

const donateButtons = document.querySelectorAll('.donate-btn');

donateButtons.forEach((button) => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    donateButtons.forEach(btn => btn.classList.remove('donate-btn-active'));
    
    // Add active class to clicked button
    this.classList.add('donate-btn-active');
  });
});

// Set default active button
if (donateButtons.length > 2) {
  donateButtons[2].classList.add('donate-btn-active');
}

// ==========================================
// Story Card Animation on Hover
// ==========================================

document.querySelectorAll('.story-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.12}s`;
});

document.querySelectorAll('.program-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.impact-item').forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`;
});

// ==========================================
// Navigation Active State (Optional Enhancement)
// ==========================================

function updateNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Optional: Uncomment to enable active nav state
// window.addEventListener('scroll', updateNavActiveState, { passive: true });

// ==========================================
// Lazy Loading Images (Optional)
// ==========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==========================================
// Window Resize Handler
// ==========================================

let resizeTimer;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  
  resizeTimer = setTimeout(() => {
    // Recalculate parallax on resize
    initParallax();
  }, 250);
});

// ==========================================
// Performance Optimization: RequestAnimationFrame
// ==========================================

// For smoother animations on scroll
let lastScrollPos = 0;

window.addEventListener('scroll', () => {
  lastScrollPos = window.scrollY;
}, { passive: true });

// Optional: Use RAF for ultra-smooth parallax (uncomment to enable)
/*
function animationLoop() {
  updateParallaxSmooth(lastScrollPos);
  requestAnimationFrame(animationLoop);
}

animationLoop();
*/

// ==========================================
// Contact/Donate Button Handling
// ==========================================

const donateLink = document.querySelector('.btn-donate');
if (donateLink) {
  donateLink.addEventListener('click', (e) => {
    // You can replace this with actual payment gateway integration
    console.log('Donate button clicked');
    // e.preventDefault(); // Uncomment to prevent navigation
    // alert('Thank you for your interest in supporting She Can Foundation!');
  });
}

// ==========================================
// Mobile Menu Toggle (Optional)
// ==========================================

function setupMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navCta = document.querySelector('.nav-cta');
  
  // Add mobile menu toggle functionality here if needed
}

setupMobileMenu();

// ==========================================
// Analytics/Tracking (Optional)
// ==========================================

// Example: Track when user scrolls to impact section
const impactSection = document.getElementById('impact');
if (impactSection) {
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Send analytics event
        console.log('Impact section viewed');
        impactObserver.unobserve(entry.target);
      }
    });
  });
  
  impactObserver.observe(impactSection);
}

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any modals or dropdowns if implemented
  }
});

// ==========================================
// Utility Functions
// ==========================================

// Utility: Throttle function for performance
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}

// Utility: Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ==========================================
// Accessibility Enhancements
// ==========================================

// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('click', () => {
  document.body.classList.remove('keyboard-nav');
});

console.log('She Can Foundation website initialized!');
