document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(18, 18, 18, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(18, 18, 18, 0.9)';
            }
        });
    }
    
    // Topic search functionality
    const searchInput = document.getElementById('topic-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const topicCards = document.querySelectorAll('.topic-card');
            
            topicCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const subtopics = Array.from(card.querySelectorAll('.subtopics a'))
                                      .map(a => a.textContent.toLowerCase());
                
                const titleMatch = title.includes(searchTerm);
                const subtopicMatch = subtopics.some(text => text.includes(searchTerm));
                
                if (titleMatch || subtopicMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Accordion functionality for interview questions
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
        animateOnScroll(featureCards, 'fade-in-up');
    }
    
    // Animation for topic cards
    const topicCards = document.querySelectorAll('.topic-card');
    if (topicCards.length) {
        animateOnScroll(topicCards, 'fade-in-up');
    }
    
    // Animation helper function
    function animateOnScroll(elements, className) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .feature-card, .topic-card {
            opacity: 0;
        }
        
        .feature-card:nth-child(1), .topic-card:nth-child(1) {
            animation-delay: 0.1s;
        }
        
        .feature-card:nth-child(2), .topic-card:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .topic-card:nth-child(3) {
            animation-delay: 0.3s;
        }
        
        .feature-card:nth-child(4), .topic-card:nth-child(4) {
            animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
});
