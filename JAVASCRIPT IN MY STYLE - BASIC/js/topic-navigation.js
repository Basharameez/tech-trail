// Topic navigation for JS Basics in My Style

// Learning path organized by section and topic
const learningPath = {
  fundamentals: [
    {
      id: 'introduction',
      title: 'Introduction to JavaScript',
      file: 'fundamentals/introduction.html'
    },
    {
      id: 'variables',
      title: 'Variables (var, let, const)',
      file: 'fundamentals/variables.html'
    },
    {
      id: 'data-types',
      title: 'Data Types',
      file: 'fundamentals/data-types.html'
    },
    {
      id: 'operators',
      title: 'Operators',
      file: 'fundamentals/operators.html'
    },
    {
      id: 'conditionals',
      title: 'Conditionals',
      file: 'fundamentals/conditionals.html'
    },
    {
      id: 'loops',
      title: 'Loops',
      file: 'fundamentals/loops.html'
    },
    {
      id: 'functions',
      title: 'Functions',
      file: 'fundamentals/functions.html'
    },
    {
      id: 'scope',
      title: 'Scope',
      file: 'fundamentals/scope.html'
    },
    {
      id: 'events-dom',
      title: 'Events & DOM Manipulation',
      file: 'fundamentals/events-dom.html'
    }
  ],
  intermediate: [
    {
      id: 'arrays',
      title: 'Arrays & Methods',
      file: 'arrays.html'
    },
    {
      id: 'objects',
      title: 'Objects & JSON',
      file: 'intermediate/objects.html'
    },
    {
      id: 'es6-features',
      title: 'ES6 Features',
      file: 'es6-features.html'
    },
    {
      id: 'dom',
      title: 'DOM (Document Object Model)',
      file: 'dom.html'
    },
    {
      id: 'event-listeners',
      title: 'Event Listeners',
      file: 'event-listeners.html'
    },
    {
      id: 'timing-functions',
      title: 'Timing Functions',
      file: 'timing-functions.html'
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      file: 'error-handling.html'
    }
  ],
  advanced: [
    {
      id: 'classes',
      title: 'Classes and Inheritance',
      file: 'classes.html'
    },
    {
      id: 'promises',
      title: 'Promises and Async/Await',
      file: 'promises.html'
    },
    {
      id: 'fetch-ajax',
      title: 'Fetch API and AJAX',
      file: 'fetch-ajax.html'
    },
    {
      id: 'modules',
      title: 'Modules',
      file: 'modules.html'
    },
    {
      id: 'closures',
      title: 'Closures & Callback Functions',
      file: 'closures.html'
    },
    {
      id: 'storage',
      title: 'Local Storage & Session Storage',
      file: 'storage.html'
    },
    {
      id: 'web-apis',
      title: 'Web APIs',
      file: 'web-apis.html'
    }
  ]
};

// Initialize subtopic navigation on page load
document.addEventListener('DOMContentLoaded', () => {
  setupTopicNavigation();
});

// Setup topic navigation
function setupTopicNavigation() {
  // Setup navigation buttons if on a subtopic page
  if (window.location.pathname.includes('/fundamentals/') || 
      window.location.pathname.includes('/intermediate/') || 
      window.location.pathname.includes('/advanced/')) {
    setupNavigationButtons();
  }
  
  // Setup progress tracking
  trackProgress();
}

// Setup previous and next navigation buttons
function setupNavigationButtons() {
  const navButtons = document.querySelector('.navigation-buttons');
  if (!navButtons) return;
  
  // Get current path
  const currentPath = window.location.pathname;
  
  // Find current topic in learning path
  let currentTopic = null;
  let currentSection = null;
  let currentIndex = -1;
  
  // Search in all sections
  for (const section in learningPath) {
    const topics = learningPath[section];
    const foundIndex = topics.findIndex(topic => currentPath.includes(topic.file));
    
    if (foundIndex !== -1) {
      currentTopic = topics[foundIndex];
      currentSection = section;
      currentIndex = foundIndex;
      break;
    }
  }
  
  if (currentTopic) {
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    // Setup previous button
    if (prevButton) {
      if (currentIndex > 0) {
        // Previous topic in the same section
        const prevTopic = learningPath[currentSection][currentIndex - 1];
        prevButton.href = `../${prevTopic.file}`;
        prevButton.innerHTML = `<i class="fas fa-arrow-left"></i> ${prevTopic.title}`;
      } else if (currentSection === 'intermediate') {
        // Last topic from fundamentals
        const fundamentalsTopics = learningPath.fundamentals;
        const lastFundamentalTopic = fundamentalsTopics[fundamentalsTopics.length - 1];
        prevButton.href = `../fundamentals/${lastFundamentalTopic.file}`;
        prevButton.innerHTML = `<i class="fas fa-arrow-left"></i> ${lastFundamentalTopic.title}`;
      } else if (currentSection === 'advanced') {
        // Last topic from intermediate
        const intermediateTopics = learningPath.intermediate;
        const lastIntermediateTopic = intermediateTopics[intermediateTopics.length - 1];
        prevButton.href = `../intermediate/${lastIntermediateTopic.file}`;
        prevButton.innerHTML = `<i class="fas fa-arrow-left"></i> ${lastIntermediateTopic.title}`;
      } else {
        // No previous topic
        prevButton.style.display = 'none';
      }
    }
    
    // Setup next button
    if (nextButton) {
      const currentSectionTopics = learningPath[currentSection];
      if (currentIndex < currentSectionTopics.length - 1) {
        // Next topic in the same section
        const nextTopic = currentSectionTopics[currentIndex + 1];
        nextButton.href = `../${nextTopic.file}`;
        nextButton.innerHTML = `${nextTopic.title} <i class="fas fa-arrow-right"></i>`;
      } else if (currentSection === 'fundamentals') {
        // First topic from intermediate
        const firstIntermediateTopic = learningPath.intermediate[0];
        nextButton.href = `../intermediate/${firstIntermediateTopic.file}`;
        nextButton.innerHTML = `${firstIntermediateTopic.title} <i class="fas fa-arrow-right"></i>`;
      } else if (currentSection === 'intermediate') {
        // First topic from advanced
        const firstAdvancedTopic = learningPath.advanced[0];
        nextButton.href = `../advanced/${firstAdvancedTopic.file}`;
        nextButton.innerHTML = `${firstAdvancedTopic.title} <i class="fas fa-arrow-right"></i>`;
      } else {
        // No next topic
        nextButton.style.display = 'none';
      }
    }
  }
}

// Track user progress
function trackProgress() {
  // Check if on a subtopic page
  if (window.location.pathname.includes('/fundamentals/') || 
      window.location.pathname.includes('/intermediate/') || 
      window.location.pathname.includes('/advanced/')) {
    
    // Get current path
    const currentPath = window.location.pathname;
    
    // Get completed topics from local storage
    let completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || [];
    
    // Mark current topic as viewed
    if (!completedTopics.includes(currentPath)) {
      completedTopics.push(currentPath);
      localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
    }
    
    // Update progress if on topics page
  } else if (window.location.pathname.includes('topics.html')) {
    updateTopicsProgress();
  }
}

// Update progress indicators on topics page
function updateTopicsProgress() {
  // Get completed topics from local storage
  const completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || [];
  
  // Get all topic links
  const topicLinks = document.querySelectorAll('.subtopic-list a');
  
  // Update each link
  topicLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (completedTopics.some(path => path.includes(href))) {
      // Add completed class
      link.classList.add('completed');
      // Add check icon
      link.innerHTML += ' <i class="fas fa-check-circle"></i>';
    }
  });
  
  // Calculate and display overall progress
  if (topicLinks.length > 0) {
    const totalTopics = topicLinks.length;
    const completedCount = document.querySelectorAll('.subtopic-list a.completed').length;
    const progressPercent = Math.round((completedCount / totalTopics) * 100);
    
    const progressElement = document.querySelector('.progress-bar');
    if (progressElement) {
      progressElement.style.width = `${progressPercent}%`;
      progressElement.setAttribute('aria-valuenow', progressPercent);
    }
    
    const progressTextElement = document.querySelector('.progress-text');
    if (progressTextElement) {
      progressTextElement.textContent = `${completedCount}/${totalTopics} (${progressPercent}%)`;
    }
  }
}
