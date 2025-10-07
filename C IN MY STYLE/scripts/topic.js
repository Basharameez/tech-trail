// Topic page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Copy code functionality
    window.copyCode = function(button) {
        const codeBlock = button.closest('.code-example').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(function() {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.style.color = 'var(--success-color)';
            
            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.color = '';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy code: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.style.color = 'var(--success-color)';
            
            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.color = '';
            }, 2000);
        });
    };

    // Toggle interview question answers
    window.toggleAnswer = function(header) {
        const questionItem = header.closest('.question-item');
        const isActive = questionItem.classList.contains('active');
        
        // Close all other questions
        document.querySelectorAll('.question-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current question
        if (!isActive) {
            questionItem.classList.add('active');
        }
    };

    // Smooth scrolling for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active sidebar link
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        }
    });

    // Progress tracking
    function updateProgress() {
        const sections = document.querySelectorAll('.content-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (!progressBar || !progressText) return;
        
        let visibleSections = 0;
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                visibleSections++;
            }
        });
        
        const progress = Math.min((visibleSections / sections.length) * 100, 100);
        progressBar.style.width = `${progress}%`;
        
        const completedLessons = Math.floor((progress / 100) * sidebarLinks.length);
        progressText.textContent = `${completedLessons} of ${sidebarLinks.length} completed`;
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    // Highlight active sections on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update sidebar active link if exists
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    document.querySelectorAll('.sidebar-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Navigate with arrow keys
        if (e.key === 'ArrowLeft') {
            const prevButton = document.querySelector('.nav-prev:not(.disabled)');
            if (prevButton) {
                prevButton.click();
            }
        } else if (e.key === 'ArrowRight') {
            const nextButton = document.querySelector('.nav-next:not(.disabled)');
            if (nextButton) {
                nextButton.click();
            }
        }
        
        // Toggle questions with Enter/Space
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.question-header')) {
            e.preventDefault();
            toggleAnswer(e.target.closest('.question-header'));
        }
    });

    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation .question-header:focus,
        .keyboard-navigation .sidebar-link:focus,
        .keyboard-navigation .nav-item:focus {
            outline: 2px solid var(--secondary-color);
            outline-offset: 2px;
        }
        
        .question-header {
            outline: none;
        }
        
        .question-header:focus-visible {
            outline: 2px solid var(--secondary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);

    // Make question headers focusable
    document.querySelectorAll('.question-header').forEach(header => {
        header.setAttribute('tabindex', '0');
    });

    // Reading time estimation
    function estimateReadingTime() {
        const article = document.querySelector('.content-article');
        if (!article) return;
        
        const text = article.textContent || article.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const timeElement = document.querySelector('.meta-item i.fa-clock').parentElement;
        if (timeElement) {
            timeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
        }
    }

    estimateReadingTime();

    // Table of contents generation (if needed)
    function generateTableOfContents() {
        const headings = document.querySelectorAll('.content-article h2, .content-article h3');
        if (headings.length < 3) return; // Don't show TOC for short articles
        
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents glass-card';
        tocContainer.innerHTML = '<h4><i class="fas fa-list"></i> Table of Contents</h4>';
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            listItem.className = heading.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    const offsetTop = target.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        tocContainer.appendChild(tocList);
        
        // Insert TOC after the first paragraph
        const firstParagraph = document.querySelector('.content-article p');
        if (firstParagraph) {
            firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph.nextSibling);
        }
    }

    // Add TOC styles
    const tocStyles = document.createElement('style');
    tocStyles.textContent = `
        .table-of-contents {
            margin: var(--spacing-xl) 0;
            padding: var(--spacing-lg);
            border-radius: var(--radius-lg);
        }
        
        .table-of-contents h4 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .table-of-contents i {
            color: var(--accent-color);
        }
        
        .toc-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .toc-list li {
            margin-bottom: var(--spacing-sm);
        }
        
        .toc-list a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: var(--transition-fast);
            display: block;
            padding: var(--spacing-xs) 0;
        }
        
        .toc-list a:hover {
            color: var(--text-primary);
            padding-left: var(--spacing-sm);
        }
        
        .toc-h3 a {
            padding-left: var(--spacing-md);
            font-size: 0.9em;
        }
        
        .toc-h3 a:hover {
            padding-left: var(--spacing-lg);
        }
    `;
    document.head.appendChild(tocStyles);

    // Generate TOC if there are enough headings
    generateTableOfContents();

    // Search within page content
    function initPageSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'page-search';
        searchContainer.innerHTML = `
            <div class="search-box glass-card">
                <input type="text" placeholder="Search in this page..." class="search-input glass-input">
                <button class="search-clear" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results" style="display: none;"></div>
        `;
        
        // Insert search after content header
        const contentHeader = document.querySelector('.content-header');
        if (contentHeader) {
            contentHeader.parentNode.insertBefore(searchContainer, contentHeader.nextSibling);
        }
        
        const searchInput = searchContainer.querySelector('.search-input');
        const searchClear = searchContainer.querySelector('.search-clear');
        const searchResults = searchContainer.querySelector('.search-results');
        
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    performSearch(query, searchResults);
                    searchClear.style.display = 'block';
                } else {
                    clearSearch(searchResults);
                    searchClear.style.display = 'none';
                }
            }, 300);
        });
        
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            clearSearch(searchResults);
            this.style.display = 'none';
            searchInput.focus();
        });
    }

    function performSearch(query, resultsContainer) {
        const content = document.querySelector('.content-article');
        const sections = content.querySelectorAll('.content-section');
        const results = [];
        
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            const text = section.textContent.toLowerCase();
            
            if (text.includes(query)) {
                const headingText = heading ? heading.textContent : 'Section';
                const snippet = extractSnippet(section.textContent, query);
                results.push({
                    heading: headingText,
                    snippet: snippet,
                    element: section
                });
            }
        });
        
        displaySearchResults(results, resultsContainer);
    }
    
    function extractSnippet(text, query) {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + query.length + 50);
        
        let snippet = text.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        // Highlight the search term
        const regex = new RegExp(`(${query})`, 'gi');
        snippet = snippet.replace(regex, '<mark>$1</mark>');
        
        return snippet;
    }
    
    function displaySearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="no-results">No results found</div>';
            container.style.display = 'block';
            return;
        }
        
        const resultHtml = results.map(result => `
            <div class="search-result" onclick="scrollToElement(this)" data-section="${result.element.id || ''}">
                <h5>${result.heading}</h5>
                <p>${result.snippet}</p>
            </div>
        `).join('');
        
        container.innerHTML = resultHtml;
        container.style.display = 'block';
    }
    
    function clearSearch(container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }
    
    window.scrollToElement = function(resultElement) {
        const sectionId = resultElement.dataset.section;
        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Initialize page search
    if (document.querySelector('.content-article')) {
        // Uncomment to enable in-page search
        // initPageSearch();
    }

    // Add print functionality
    function initPrintButton() {
        const printButton = document.createElement('button');
        printButton.className = 'print-btn glass-btn';
        printButton.innerHTML = '<i class="fas fa-print"></i> Print';
        printButton.onclick = () => window.print();
        
        const contentHeader = document.querySelector('.content-header');
        if (contentHeader) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'header-actions';
            buttonContainer.appendChild(printButton);
            contentHeader.appendChild(buttonContainer);
        }
    }

    initPrintButton();

    // Performance monitoring for topic pages
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Topic page loaded in ${loadTime}ms`);
            
            // Track time spent on page
            let startTime = Date.now();
            window.addEventListener('beforeunload', function() {
                const timeSpent = Date.now() - startTime;
                console.log(`Time spent on page: ${Math.round(timeSpent / 1000)}s`);
            });
        });
    }
});
