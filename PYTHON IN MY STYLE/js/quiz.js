
    // main.js (optimized for menu, scrolling, animations)
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile menu toggle
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const nav = document.querySelector('.nav');
      const body = document.body;

      if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent immediate close from outside click
          mobileMenuBtn.classList.toggle('active');
          nav.classList.toggle('nav-open');
          body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
          if (nav.classList.contains('nav-open') && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('nav-open');
            body.style.overflow = '';
          }
        });

        // Close menu when clicking a nav link
        nav.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('nav-open');
            body.style.overflow = '';
          });
        });
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
              const yOffset = -80; // Adjust for header height
              const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        });
      });

      // Animate elements when they come into view
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.topic-card, .feature, .content-section');
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementPosition < windowHeight - 50) {
            element.classList.add('visible');
          }
        });
      };

      // Initial check and scroll listener
      animateOnScroll();
      window.addEventListener('scroll', animateOnScroll);
    });

    // quiz.js (placeholder - replace with your actual quiz logic if available)
    document.addEventListener('DOMContentLoaded', () => {
      // Example quiz functionality for #interview-questions section
      const questions = document.querySelectorAll('#interview-questions p');
      questions.forEach((q, index) => {
        q.style.cursor = 'pointer';
        q.addEventListener('click', () => {
          alert(`Question ${index + 1}: ${q.textContent}\n(Click to reveal answer or implement full quiz here)`);
        });
      });
    });
  
