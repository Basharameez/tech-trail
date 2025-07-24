// Main JavaScript file for JS Basics in My Style

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDarkMode();
  initAnimations();
  initMCQs();
  initCodeBlocks();
});

// Initialize mobile navigation
function initNavigation() {
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }
  
  // Set active nav link
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
}

// Initialize dark mode
function initDarkMode() {
  // Check for user preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkMode');
  
  // Set initial state based on preference or stored value
  if (storedDarkMode === 'true' || (storedDarkMode === null && prefersDarkMode)) {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
  
  // Toggle dark mode on button click
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      updateDarkModeIcon(isDarkMode);
    });
  }
}

// Update dark mode icon
function updateDarkModeIcon(isDarkMode) {
  if (darkModeToggle) {
    darkModeToggle.innerHTML = isDarkMode 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
}

// Initialize animations
function initAnimations() {
  // Add fade-in class to elements
  const fadeElements = document.querySelectorAll('.fade-in-element');
  fadeElements.forEach(element => {
    element.classList.add('fade-in');
  });
  
  // Add stagger animation to list items
  const staggerLists = document.querySelectorAll('.stagger-list');
  staggerLists.forEach(list => {
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add('stagger-item');
    }
  });
  
  // Initialize intersection observer for scroll animations
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    scrollElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize MCQs
function initMCQs() {
  const mcqItems = document.querySelectorAll('.mcq-item');
  
  mcqItems.forEach(item => {
    const checkButton = item.querySelector('.mcq-check');
    const answer = item.querySelector('.mcq-answer');
    const options = item.querySelectorAll('input[type="radio"]');
    
    if (checkButton && answer) {
      checkButton.addEventListener('click', () => {
        answer.classList.add('show');
        
        // Check selected answer
        options.forEach(option => {
          if (option.checked && option.dataset.correct === 'true') {
            option.parentElement.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
          } else if (option.checked && option.dataset.correct !== 'true') {
            option.parentElement.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
          }
        });
      });
    }
  });
}

// Initialize code blocks
function initCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    const copyButton = block.querySelector('.copy-button');
    const codeElement = block.querySelector('code');
    
    if (copyButton && codeElement) {
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(codeElement.textContent)
          .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
      });
    }
  });
}

// Page transitions
function navigateTo(url) {
  const transition = document.querySelector('.page-transition');
  
  if (transition) {
    transition.classList.add('active');
    
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  } else {
    window.location.href = url;
  }
}

// If on topics page, set up topic navigation
if (window.location.pathname.includes('topics.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    initTopicsPage();
  });
}

function initTopicsPage() {
  // Add animation to topic cards
  const topicItems = document.querySelectorAll('.topic-item');
  
  topicItems.forEach((item, index) => {
    // Add staggered animation delay
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('slide-in');
  });
}
