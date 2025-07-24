document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('open');
      
      // Toggle menu button appearance to X
      const spans = menuBtn.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
      
      if (nav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize accordion functionality (for subtopic pages)
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      header.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
    
    // Open first accordion item by default
    if (accordionItems[0]) {
      accordionItems[0].classList.add('active');
    }
  }
  
  // Add animation to elements when they become visible
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .topic-card, .application-card, .industry-item, .resource-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  };
  
  // Run on scroll and initial load
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
  
  // Highlight active section in table of contents
  const highlightTableOfContents = function() {
    const toc = document.querySelector('.table-of-contents');
    
    if (!toc) return;
    
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.style.fontWeight = 'normal';
      
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.style.fontWeight = 'bold';
        link.style.color = 'var(--primary-700)';
      } else {
        link.style.color = 'var(--neutral-700)';
      }
    });
  };
  
  // Run on scroll for table of contents highlighting
  window.addEventListener('scroll', highlightTableOfContents);
  highlightTableOfContents();
});
