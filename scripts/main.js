// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-toggle i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.mobile-menu-btn i');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
  document.body.classList.toggle('nav-open', navLinks.classList.contains('active'));
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.replace('fa-xmark', 'fa-bars');
    document.body.classList.remove('nav-open');
  });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll progress bar update
const progressBar = document.querySelector('.scroll-progress');
const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = width + '%';
};
window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);

// Scroll Animation
const animatedElements = document.querySelectorAll('.animated');

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
  );
};

const handleScrollAnimation = () => {
  animatedElements.forEach(element => {
    if (isInViewport(element) && !element.classList.contains('fadeInUp')) {
      element.classList.add('fadeInUp');
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Active nav link on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
const setActiveNav = () => {
  const scrollPos = window.scrollY + 90; // header offset
  let currentId = sections[0]?.id;
  for (const sec of sections) {
    if (scrollPos >= sec.offsetTop) currentId = sec.id;
  }
  navAnchors.forEach(a => {
    const isActive = a.getAttribute('href') === `#${currentId}`;
    a.classList.toggle('active', isActive);
  });
};
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '15px';
  cursor.style.height = '15px';
  cursor.style.borderColor = 'var(--primary-color)';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.borderColor = 'var(--primary-color)';
});

document.querySelectorAll('a, button').forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderColor = 'var(--accent-color)';
  });

  item.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderColor = 'var(--primary-color)';
  });
});

// Remove cursor on mobile devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
}

// Page Loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});

// Typewriter effect for subtitle
const typeTarget = document.querySelector('.hero-subtitle.typewriter');
if (typeTarget) {
  const phrases = [
    'Software Engineering & IoT',
    'Cybersecurity Research',
    'Machine Learning',
    'Anomaly Detection'
  ];
  let pi = 0, ci = 0, deleting = false;
  const type = () => {
    const full = phrases[pi];
    ci += deleting ? -1 : 1;
    typeTarget.textContent = full.slice(0, ci);
    if (!deleting && ci === full.length) {
      setTimeout(() => deleting = true, 1000);
    } else if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
    const delay = deleting ? 50 : 90;
    setTimeout(type, delay);
  };
  setTimeout(type, 600);
}

// Contact Form Submission with Popup Message
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Show popup message
  alert('Thank you for your message! I will get back to you soon.');

  // Submit the form to FormSubmit
  this.submit();

  // Optional: Reset the form
  this.reset();
});
