document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission with loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Simulate successful submission
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset the form
      contactForm.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }, 1500);
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to show notifications
  function showNotification(message, type) {
    // Check if notification already exists and remove it
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type === 'success' ? 'form-success' : 'form-error'}`;
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Insert notification before the form
    contactForm.parentNode.insertBefore(notification, contactForm);
    
    // Add animation
    notification.style.animation = 'fadeIn 0.3s forwards';
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
  
  // Add visual feedback on form inputs
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      
      // Validate on blur
      if (this.value.trim() === '') {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
        
        // Special check for email
        if (this.type === 'email' && !isValidEmail(this.value.trim())) {
          this.classList.add('error');
        }
      }
    });
    
    // Remove error class when typing
    input.addEventListener('input', function() {
      this.classList.remove('error');
    });
  });
  
  // Add some animations
  const formGroups = contactForm.querySelectorAll('.form-group');
  
  formGroups.forEach((group, index) => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      group.style.transition = 'all 0.3s ease-out';
      group.style.opacity = '1';
      group.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
