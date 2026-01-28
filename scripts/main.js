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
    'Full-Stack Developer'
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

// GitHub Projects (Public Only)
const projectsSection = document.querySelector('#projects');
const projectsContainer = document.querySelector('#projects-list');
const projectsStatus = document.querySelector('[data-projects-status]');

const setProjectsStatus = (message, show = true) => {
  if (!projectsStatus) return;
  projectsStatus.textContent = message;
  projectsStatus.classList.toggle('hidden', !show);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const createProjectCard = (repo) => {
  const card = document.createElement('div');
  card.className = 'project-card';

  const imageLink = document.createElement('a');
  imageLink.href = repo.html_url;
  imageLink.target = '_blank';
  imageLink.rel = 'noopener';

  const image = document.createElement('img');
  image.src = `https://opengraph.githubassets.com/1/${repo.full_name}`;
  image.alt = `${repo.name} preview`;
  image.loading = 'lazy';
  imageLink.appendChild(image);

  const content = document.createElement('div');
  content.className = 'project-content';

  const title = document.createElement('h3');
  title.className = 'project-title';
  const titleLink = document.createElement('a');
  titleLink.href = repo.html_url;
  titleLink.target = '_blank';
  titleLink.rel = 'noopener';
  titleLink.textContent = repo.name.replace(/-/g, ' ');
  title.appendChild(titleLink);

  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = repo.description || 'No description provided yet.';

  const meta = document.createElement('div');
  meta.className = 'project-meta';
  meta.innerHTML = `
    <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
    <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
    <span><i class="fa-regular fa-clock"></i> ${formatDate(repo.updated_at)}</span>
  `;

  const techStack = document.createElement('div');
  techStack.className = 'tech-stack';
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const stackItems = topics.length ? topics.slice(0, 4) : (repo.language ? [repo.language] : ['GitHub']);
  stackItems.forEach(item => {
    const tech = document.createElement('span');
    tech.className = 'tech-item';
    tech.textContent = item;
    techStack.appendChild(tech);
  });

  const links = document.createElement('div');
  links.className = 'project-links';
  links.innerHTML = `
    <a href="${repo.html_url}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>
  `;

  if (repo.homepage) {
    const liveLink = document.createElement('a');
    liveLink.href = repo.homepage;
    liveLink.target = '_blank';
    liveLink.rel = 'noopener';
    liveLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Live';
    links.appendChild(liveLink);
  }

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(meta);
  content.appendChild(techStack);
  content.appendChild(links);

  card.appendChild(imageLink);
  card.appendChild(content);

  return card;
};

const loadGitHubProjects = async () => {
  if (!projectsSection || !projectsContainer) return;
  const githubUser = projectsSection.dataset.githubUser;
  const limit = parseInt(projectsSection.dataset.projectLimit || '6', 10);
  const includeList = (projectsSection.dataset.projectInclude || '')
    .split(',')
    .map(item => item.trim().toLowerCase())
    .filter(Boolean);
  const excludeList = (projectsSection.dataset.projectExclude || '')
    .split(',')
    .map(item => item.trim().toLowerCase())
    .filter(Boolean);

  if (!githubUser) {
    setProjectsStatus('GitHub username not set.', true);
    return;
  }

  try {
    setProjectsStatus('Loading public GitHub projects...', true);
    const cacheKey = `github_repos_${githubUser}`;
    const cacheTimeKey = `${cacheKey}_time`;
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = parseInt(localStorage.getItem(cacheTimeKey) || '0', 10);
    const cacheAgeMs = Date.now() - cachedTime;
    const cacheFresh = cached && cacheAgeMs < 1000 * 60 * 60 * 6;

    let repos = [];
    if (cacheFresh) {
      repos = JSON.parse(cached);
    } else {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`, {
        headers: {
          Accept: 'application/vnd.github+json'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GitHub API request failed (${response.status})`);
      }

      repos = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(repos));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    }
    const publicRepos = repos
      .filter(repo => !repo.private && !repo.fork)
      .filter(repo => {
        const name = repo.name.toLowerCase();
        if (includeList.length && !includeList.includes(name)) return false;
        if (excludeList.length && excludeList.includes(name)) return false;
        return true;
      })
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    const selected = publicRepos.slice(0, limit);
    projectsContainer.innerHTML = '';

    if (!selected.length) {
      setProjectsStatus('No public GitHub projects found.', true);
      return;
    }

    setProjectsStatus('', false);
    selected.forEach(repo => projectsContainer.appendChild(createProjectCard(repo)));
  } catch (error) {
    const cacheKey = `github_repos_${githubUser}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const repos = JSON.parse(cached);
      projectsContainer.innerHTML = '';
      setProjectsStatus('', false);
      repos
        .filter(repo => !repo.private && !repo.fork)
        .filter(repo => {
          const name = repo.name.toLowerCase();
          if (includeList.length && !includeList.includes(name)) return false;
          if (excludeList.length && excludeList.includes(name)) return false;
          return true;
        })
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, limit)
        .forEach(repo => projectsContainer.appendChild(createProjectCard(repo)));
      return;
    }
    setProjectsStatus('Unable to load GitHub projects right now.', true);
  }
};

loadGitHubProjects();

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
