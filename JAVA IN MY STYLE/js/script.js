// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Topic Card Toggles
    const topicHeaders = document.querySelectorAll('.topic-header');
    
    if (topicHeaders.length > 0) {
        topicHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const topicCard = this.parentElement;
                topicCard.classList.toggle('active');
                
                // Close other topic cards
                document.querySelectorAll('.topic-card').forEach(card => {
                    if (card !== topicCard) {
                        card.classList.remove('active');
                    }
                });
            });
        });
        
        // Open the first topic by default
        topicHeaders[0].click();
    }
    
    // MCQ Check Answer Buttons
    const checkButtons = document.querySelectorAll('.check-btn');
    
    if (checkButtons.length > 0) {
        checkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const answer = this.previousElementSibling;
                
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    this.textContent = 'Check Answer';
                } else {
                    answer.style.display = 'block';
                    this.textContent = 'Hide Answer';
                }
            });
        });
    }
    
    // Interview Question Toggles
    const answerToggles = document.querySelectorAll('.answer-toggle');
    
    if (answerToggles.length > 0) {
        answerToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const question = this.parentElement;
                question.classList.toggle('active');
                
                // Update toggle text
                const toggleText = this.querySelector('span');
                if (question.classList.contains('active')) {
                    toggleText.textContent = 'Hide Answer';
                } else {
                    toggleText.textContent = 'Show Answer';
                }
            });
        });
    }
    
    // Code highlighting (if using highlight.js)
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current nav link
    const currentLocation = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animation on scroll
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .application-card, .video-card').forEach(el => {
        observer.observe(el);
    });
}
