/**
 * CSS Property Explorer Application JavaScript
 * Handles dynamic content loading, search, filtering, and interactions
 */

// DOM Elements
const categoriesContainer = document.getElementById('categories-container');
const alphabeticalContainer = document.getElementById('alphabetical-container');
const searchInput = document.getElementById('search-input');

// Cache DOM elements and property data
let allTagElements = [];
let categoryCards = [];
let allTagsMap = new Map();

/**
 * Initialize the application
 */
function initApp() {
  createCategories();
  createAlphabeticalList();
  setupSearch();
  setupSmoothScrolling();
  setupIntersectionObserver();
  setupTagClickHandlers();
  setupPageVisibilityHandler();
  clearPageTransitionOnLoad();
}

/**
 * Creates and populates all category cards with properties
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
    
    // Category body with property list
    const categoryBody = document.createElement('div');
    categoryBody.className = 'category-body';
    
    const tagList = document.createElement('ul');
    tagList.className = 'tag-list';
    
    category.tags.forEach(tag => {
      // Store property in global map with references to categories
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
      // Link to local HTML file
      tagLink.href = `${tag.name.toUpperCase()}.html`;
      tagLink.className = 'tag-link';
      tagLink.dataset.tag = tag.name;
      tagLink.dataset.category = category.name;
      tagLink.innerHTML = `<span class="tag-name">${tag.name}</span>`;
      
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
 * Creates alphabetical list of all properties
 */
function createAlphabeticalList() {
  // Extract all unique properties
  const allTags = Array.from(allTagsMap.values());
  
  // Sort alphabetically
  allTags.sort((a, b) => a.name.localeCompare(b.name));
  
  // Ensure tag-list is a <ul> for grid layout
  alphabeticalContainer.className = 'tag-list';
  
  // Create property elements
  allTags.forEach(tag => {
    const tagItem = document.createElement('li');
    const tagElement = document.createElement('a');
    // Link to local HTML file
    tagElement.href = `${tag.name.toUpperCase()}.html`;
    tagElement.className = 'tag-element';
    tagElement.dataset.tag = tag.name;
    tagElement.innerHTML = `${tag.name}`;
    
    tagItem.appendChild(tagElement);
    alphabeticalContainer.appendChild(tagItem);
    allTagElements.push(tagElement);
  });
}

/**
 * Sets up search functionality
 */
function setupSearch() {
  searchInput.addEventListener('input', debounce(handleSearch, 200));
}

/**
 * Handle search input and filter properties
 */
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  // Hide or show properties in alphabetical list
  let matchFound = false;
  
  // Filter alphabetical properties
  allTagElements.forEach(tagEl => {
    const tagName = tagEl.dataset.tag.toLowerCase();
    const isVisible = tagName.includes(searchTerm);
    tagEl.parentElement.style.display = isVisible ? 'block' : 'none';
    if (isVisible) matchFound = true;
  });
  
  // Filter category cards and their properties
  categoryCards.forEach(card => {
    const tagLinks = card.querySelectorAll('.tag-item');
    let hasVisibleTags = false;
    
    tagLinks.forEach(item => {
      const link = item.querySelector('.tag-link');
      const tagName = link.dataset.tag.toLowerCase();
      if (tagName.includes(searchTerm)) {
        item.style.display = 'block';
        hasVisibleTags = true;
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show/hide the category based on whether it has visible properties
    card.style.display = hasVisibleTags ? 'block' : 'none';
  });
  
  // Check if we need to show a "no results" message in alphabetical section
  const alphabeticalNoResults = document.getElementById('alphabetical-no-results');
  if (!matchFound) {
    if (!alphabeticalNoResults) {
      const noResults = document.createElement('div');
      noResults.id = 'alphabetical-no-results';
      noResults.className = 'no-results';
      noResults.textContent = `No properties found matching "${searchInput.value}"`;
      alphabeticalContainer.appendChild(noResults);
    }
  } else if (alphabeticalNoResults) {
    alphabeticalNoResults.remove();
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
            behavior: 'smooth'
          });
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
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

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

// Create page transition element
function createPageTransition() {
  // Check if it already exists
  if (!document.querySelector('.page-transition')) {
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
  }
}

// Clear page transition on page load
function clearPageTransitionOnLoad() {
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    pageTransition.classList.remove('active');
  }
}

// Set up page visibility handler to clear transition on back button
function setupPageVisibilityHandler() {
  // Handle browser back/forward navigation
  window.addEventListener('pageshow', function(event) {
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
      pageTransition.classList.remove('active');
    }
  });

  // Handle visibility change (when user comes back to tab)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      const pageTransition = document.querySelector('.page-transition');
      if (pageTransition) {
        pageTransition.classList.remove('active');
      }
    }
  });

  // Handle focus event (when user comes back to window)
  window.addEventListener('focus', function() {
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
      pageTransition.classList.remove('active');
    }
  });

  // Handle popstate (back/forward buttons)
  window.addEventListener('popstate', function() {
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
      pageTransition.classList.remove('active');
    }
  });
}

// Set up property link click handlers
function setupTagClickHandlers() {
  // Create the transition element
  createPageTransition();
  
  // Get all property links
  const tagLinks = document.querySelectorAll('.tag-link, .tag-element');
  
  tagLinks.forEach(link => {
    // Remove any existing listeners first to prevent duplicates
    link.removeEventListener('click', handleTagClick);
    // Add new click listener
    link.addEventListener('click', handleTagClick);
  });
}

// Handle property click event
function handleTagClick(e) {
  const href = this.getAttribute('href');
  
  // Only handle links to HTML files (not external links)
  if (href && !href.startsWith('http') && href.endsWith('.html')) {
    e.preventDefault();
    
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

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// If the page is already loaded, set up the handlers immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    setupTagClickHandlers();
    clearPageTransitionOnLoad();
  }, 1);
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    setupTagClickHandlers();
    clearPageTransitionOnLoad();
  });
}
