// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6366f1'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Topic expansion functionality
    const topicHeaders = document.querySelectorAll('.topic-header');
    topicHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const topicCard = this.closest('.topic-card');
            topicCard.classList.toggle('expanded');
        });
    });

    // Answer toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-answer');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const answer = questionCard.querySelector('.answer');
            const icon = this.querySelector('i');

            questionCard.classList.toggle('expanded');
            
            if (questionCard.classList.contains('expanded')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                this.innerHTML = 'Hide Answer <i class="fas fa-chevron-up"></i>';
            } else {
                answer.style.maxHeight = '0';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                this.innerHTML = 'Show Answer <i class="fas fa-chevron-down"></i>';
            }
        });
    });
});

// Add scrolling animation to elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
