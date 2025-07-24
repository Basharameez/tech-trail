// Main JavaScript file

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Navbar transparency on scroll for landing page
    const navbar = document.querySelector('.navbar');
    if (navbar && window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('transparent');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('transparent');
            }
        });
        
        // Initial check
        if (window.scrollY <= 50) {
            navbar.classList.add('transparent');
        }
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    if (animatedElements.length > 0) {
        // Create IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe each element
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
});
