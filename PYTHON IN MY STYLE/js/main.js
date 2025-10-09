document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (
      nav && nav.classList.contains('active') &&
      !event.target.closest('.nav') &&
      !event.target.closest('.mobile-menu-btn')
    ) {
      nav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const yOffset = -80;
        const y = document.querySelector(href).getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.topic-card, .feature, .content-section');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight - 50) {
        element.classList.add('visible');
      }
    });
  };

  animateOnScroll(); // on load
  window.addEventListener('scroll', animateOnScroll); // on scroll
});

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') && 
        !event.target.closest('.nav') && 
        !event.target.closest('.mobile-menu-btn')) {
      nav.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
      }
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.topic-card, .feature, .content-section');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('visible');
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Check for elements on scroll
  window.addEventListener('scroll', animateOnScroll);
});
