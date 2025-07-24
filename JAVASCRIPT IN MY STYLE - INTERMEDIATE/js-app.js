/**
 * JavaScript Explorer Application JavaScript
 * Enhanced with skin and black theme support
 * Handles dynamic content loading, search, filtering, and interactions
 */

// DOM Elements
const categoriesContainer = document.getElementById('categories-container');
const alphabeticalContainer = document.getElementById('alphabetical-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Cache DOM elements and tag data
let allTagElements = [];
let categoryCards = [];
let allTagsMap = new Map();

/**
 * Initialize the application
 */
function initApp() {
  initTheme();
  createCategories();
  createAlphabeticalList();
  setupSearch();
  setupSmoothScrolling();
  setupIntersectionObserver();
  setupTagClickHandlers();
  setupBackButtonHandler();
  setupThemeToggle();
}

/**
 * Initialize theme system
 */
function initTheme() {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update theme toggle icon
  updateThemeToggleIcon(savedTheme);
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply theme with smooth transition
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update toggle icon
    updateThemeToggleIcon(newTheme);
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = '';
      document.documentElement.style.transition = '';
    }, 300);
  });
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeToggleIcon(theme) {
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

/**
 * Creates and populates all category cards with tags
 */
function createCategories() {
  tagData.categories.forEach((category, index) => {
    // Create category card
    const categoryCard = document.createElement('div');
    categoryCard.className = `category-card fade-in delay-${(index % 4) * 100}`;
    categoryCard.dataset.category = category.name;
    
    // Category header
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    categoryHeader.innerHTML = `
      <h3>${category.name}</h3>
      <p>${category.description}</p>
    `;
    
    // Category body with tag list
    const categoryBody = document.createElement('div');
    categoryBody.className = 'category-body';
    
    const tagList = document.createElement('ul');
    tagList.className = 'tag-list';
    
    category.tags.forEach(tag => {
      // Store tag in global map with references to categories
      if (!allTagsMap.has(tag.name)) {
        allTagsMap.set(tag.name, {
          ...tag,
          categories: [category.name]
        });
      } else {
        allTagsMap.get(tag.name).categories.push(category.name);
      }
      
      const tagItem = document.createElement('li');
      tagItem.className = 'tag-item';
      
      const tagLink = document.createElement('a');
      // Link to local JavaScript file
      tagLink.href = `${tag.name}.html`;
      tagLink.className = 'tag-link';
      tagLink.dataset.tag = tag.name;
      tagLink.dataset.category = category.name;
      tagLink.innerHTML = `<span class="tag-name">${tag.name}</span>`;
      
      // Add hover effect
      tagLink.addEventListener('mouseenter', () => {
        tagLink.style.transform = 'translateX(4px)';
      });
      
      tagLink.addEventListener('mouseleave', () => {
        tagLink.style.transform = '';
      });
      
      tagItem.appendChild(tagLink);
      tagList.appendChild(tagItem);
    });
    
    categoryBody.appendChild(tagList);
    categoryCard.appendChild(categoryHeader);
    categoryCard.appendChild(categoryBody);
    categoriesContainer.appendChild(categoryCard);
    
    // Store reference to category card
    categoryCards.push(categoryCard);
  });
}

/**
 * Creates alphabetical list of all tags
 */
function createAlphabeticalList() {
  // Extract all unique tags
  const allTags = Array.from(allTagsMap.values());
  
  // Sort alphabetically
  allTags.sort((a, b) => a.name.localeCompare(b.name));
  
  // Ensure tag-list is a <ul> for grid layout
  alphabeticalContainer.className = 'tag-list';
  
  // Create tag elements
  allTags.forEach((tag, index) => {
    const tagItem = document.createElement('li');
    const tagElement = document.createElement('a');
    // Link to local JavaScript file
    tagElement.href = `${tag.name}.html`;
    tagElement.className = 'tag-element';
    tagElement.dataset.tag = tag.name;
    tagElement.innerHTML = `${tag.name}`;
    
    // Add staggered animation delay
    tagElement.style.animationDelay = `${index * 10}ms`;
    
    tagItem.appendChild(tagElement);
    alphabeticalContainer.appendChild(tagItem);
    allTagElements.push(tagElement);
  });
}

/**
 * Sets up search functionality with enhanced UX
 */
function setupSearch() {
  searchInput.addEventListener('input', debounce(handleSearch, 200));
  
  // Add search focus effects
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.transform = 'scale(1.02)';
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.transform = '';
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
      searchInput.value = '';
      handleSearch();
    }
  });
}

/**
 * Handle search input and filter tags with improved feedback
 */
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  // Hide or show tags in alphabetical list
  let matchFound = false;
  let visibleCount = 0;
  
  // Filter alphabetical tags
  allTagElements.forEach(tagEl => {
    const tagName = tagEl.dataset.tag.toLowerCase();
    const isVisible = !searchTerm || tagName.includes(searchTerm);
    
    tagEl.parentElement.style.display = isVisible ? 'block' : 'none';
    
    if (isVisible) {
      matchFound = true;
      visibleCount++;
      
      // Highlight matching text
      if (searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = tagEl.dataset.tag.replace(regex, '<mark>$1</mark>');
        tagEl.innerHTML = highlightedText;
      } else {
        tagEl.innerHTML = tagEl.dataset.tag;
      }
    }
  });
  
  // Filter category cards and their tags
  categoryCards.forEach(card => {
    const tagLinks = card.querySelectorAll('.tag-item');
    let hasVisibleTags = false;
    
    tagLinks.forEach(item => {
      const link = item.querySelector('.tag-link');
      const tagName = link.dataset.tag.toLowerCase();
      const isVisible = !searchTerm || tagName.includes(searchTerm);
      
      item.style.display = isVisible ? 'block' : 'none';
      
      if (isVisible) {
        hasVisibleTags = true;
        
        // Highlight matching text in category tags
        const tagNameSpan = link.querySelector('.tag-name');
        if (searchTerm) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlightedText = tagNameSpan.textContent.replace(regex, '<mark>$1</mark>');
          tagNameSpan.innerHTML = highlightedText;
        } else {
          tagNameSpan.innerHTML = tagNameSpan.textContent;
        }
      }
    });
    
    // Show/hide the category based on whether it has visible tags
    card.style.display = hasVisibleTags ? 'block' : 'none';
  });
  
  // Update search results feedback
  updateSearchFeedback(searchTerm, matchFound, visibleCount);
}

/**
 * Update search feedback and results count
 */
function updateSearchFeedback(searchTerm, matchFound, visibleCount) {
  // Remove existing feedback
  const existingFeedback = document.getElementById('search-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  // Add search feedback
  if (searchTerm) {
    const feedback = document.createElement('div');
    feedback.id = 'search-feedback';
    feedback.className = 'search-feedback';
    
    if (matchFound) {
      feedback.innerHTML = `
        <p>Found <strong>${visibleCount}</strong> concept${visibleCount !== 1 ? 's' : ''} matching "<strong>${searchTerm}</strong>"</p>
      `;
      feedback.style.color = 'var(--color-success)';
    } else {
      feedback.innerHTML = `
        <p>No concepts found matching "<strong>${searchTerm}</strong>"</p>
        <p><small>Try a different search term or browse by category</small></p>
      `;
      feedback.style.color = 'var(--text-muted)';
    }
    
    feedback.style.textAlign = 'center';
    feedback.style.padding = 'var(--space-3)';
    feedback.style.marginBottom = 'var(--space-4)';
    feedback.style.borderRadius = 'var(--border-radius-md)';
    feedback.style.backgroundColor = 'var(--bg-secondary)';
    feedback.style.border = '1px solid var(--border-color)';
    
    // Insert after search container
    const searchContainer = document.querySelector('.search-container').closest('.header-content');
    searchContainer.parentNode.insertBefore(feedback, searchContainer.nextSibling);
  }
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').length > 1) { // Skip if it's just "#"
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Add visual feedback
          targetElement.style.transform = 'scale(1.02)';
          setTimeout(() => {
            targetElement.style.transform = '';
          }, 300);
        }
      }
    });
  });
}

/**
 * Sets up intersection observer for animation on scroll
 */
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation for category cards
        if (entry.target.classList.contains('category-card')) {
          const cards = document.querySelectorAll('.category-card');
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 100}ms`;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Create page transition element with enhanced styling
 */
function createPageTransition() {
  // Check if it already exists
  if (!document.querySelector('.page-transition')) {
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
  }
}

/**
 * Set up tag link click handlers with improved UX
 */
function setupTagClickHandlers() {
  // Create the transition element
  createPageTransition();
  
  // Get all tag links
  const tagLinks = document.querySelectorAll('.tag-link, .tag-element');
  
  tagLinks.forEach(link => {
    // Remove any existing listeners first to prevent duplicates
    link.removeEventListener('click', handleTagClick);
    // Add new click listener
    link.addEventListener('click', handleTagClick);
    
    // Add enhanced hover effects
    link.addEventListener('mouseenter', () => {
      link.style.transform = link.classList.contains('tag-element') ? 'translateY(-2px)' : 'translateX(4px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });
}

/**
 * Handle tag click event with smooth transition
 */
function handleTagClick(e) {
  const href = this.getAttribute('href');
  
  // Only handle links to HTML files (not external links)
  if (href && !href.startsWith('http') && href.endsWith('.html')) {
    e.preventDefault();
    
    // Add click feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
    
    // Get the transition element
    const pageTransition = document.querySelector('.page-transition');
    
    // Activate the transition
    if (pageTransition) {
      pageTransition.classList.add('active');
      
      // Navigate after transition completes
      setTimeout(() => {
        window.location.href = href;
      }, 500); // Match this to your CSS transition time
    } else {
      // Fallback if transition element doesn't exist
      window.location.href = href;
    }
  }
}

/**
 * Handle page transition removal
 */
function handlePageTransition() {
  const pageTransition = document.querySelector('.page-transition');
  
  if (pageTransition) {
    // Remove the active class when the page becomes visible
    pageTransition.classList.remove('active');
    
    // Force a reflow to ensure the transition takes effect
    pageTransition.offsetHeight;
  }
}

/**
 * Set up back button and page visibility handlers
 */
function setupBackButtonHandler() {
  // Handle back/forward navigation
  window.addEventListener('pageshow', function(event) {
    // This fires when the page is shown, including back button navigation
    handlePageTransition();
  });

  // Handle visibility change (when user switches tabs and comes back)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      handlePageTransition();
    }
  });

  // Handle focus event as a fallback
  window.addEventListener('focus', function() {
    handlePageTransition();
  });

  // Ensure transition is cleared on page load
  window.addEventListener('load', function() {
    handlePageTransition();
  });
}

/**
 * Add keyboard navigation support
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Navigate through tag elements with arrow keys
    if (document.activeElement && document.activeElement.classList.contains('tag-element')) {
      const allVisible = Array.from(document.querySelectorAll('.tag-element')).filter(el => 
        el.parentElement.style.display !== 'none'
      );
      const currentIndex = allVisible.indexOf(document.activeElement);
      
      let nextIndex = currentIndex;
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % allVisible.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = currentIndex > 0 ? currentIndex - 1 : allVisible.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          document.activeElement.click();
          return;
      }
      
      if (nextIndex !== currentIndex) {
        e.preventDefault();
        allVisible[nextIndex].focus();
      }
    }
  });
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupKeyboardNavigation();
  
  // Ensure any existing transition is cleared immediately
  setTimeout(handlePageTransition, 50);
});

// If the page is already loaded, set up the handlers immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    setupTagClickHandlers();
    handlePageTransition();
  }, 1);
}
