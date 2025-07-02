/**
 * Main JavaScript for Ed Thomson's Website
 */
document.addEventListener('DOMContentLoaded', () => {
  // Handle mobile menu toggling
  setupMobileMenu();
  
  // Generate table of contents
  generateTableOfContents();
  
  // Lazy load images
  lazyLoadImages();

  // Add copy button to code blocks
  addCopyButtonsToCodeBlocks();
});

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

/**
 * Generate table of contents from headings in the content
 */
function generateTableOfContents() {
  const tocContainer = document.getElementById('toc-container');
  const content = document.querySelector('.markdown-content');
  const yearsToc = document.getElementById('years-toc');

  if (yearsToc) {
    // This is the homepage with the years TOC, so don't generate another one.
    return;
  }
  
  if (!tocContainer || !content) return;
  
  // Find all headings
  const headings = content.querySelectorAll('h2, h3, h4');
  
  if (headings.length < 3) {
    // If there are fewer than 3 headings, don't show TOC
    return;
  }
  
  // Create TOC title
  const tocTitle = document.createElement('h2');
  tocTitle.classList.add('toc-title');
  tocTitle.textContent = 'Table of Contents';
  tocContainer.appendChild(tocTitle);
  
  // Create TOC list
  const tocList = document.createElement('ul');
  tocList.classList.add('toc-list');
  tocContainer.appendChild(tocList);
  
  // Loop through headings and add them to TOC
  headings.forEach((heading, index) => {
    // Create ID if heading doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const listItem = document.createElement('li');
    listItem.classList.add('toc-list-item');
    
    // Determine heading level and add appropriate class
    const headingLevel = parseInt(heading.tagName.charAt(1));
    listItem.classList.add(`toc-level-${headingLevel}`);
    
    // Create link
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    
    // Add indentation based on heading level
    if (headingLevel > 2) {
      listItem.style.paddingLeft = `${(headingLevel - 2) * 1}rem`;
    }
    
    listItem.appendChild(link);
    tocList.appendChild(listItem);
    
    // Add click event to smooth scroll
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Make TOC visible
  tocContainer.classList.add('visible');
  
  // Add active class to current heading in view
  highlightActiveTocItem();
  
  // Update active TOC item on scroll
  window.addEventListener('scroll', debounce(highlightActiveTocItem, 100));
}

/**
 * Highlight the active TOC item based on scroll position
 */
function highlightActiveTocItem() {
  const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3, .markdown-content h4');
  const tocLinks = document.querySelectorAll('.toc-list-item a');
  const yearsToc = document.getElementById('years-toc');

  if (yearsToc) {
    // No highlighting needed for the years TOC
    return;
  }
  
  if (!headings.length || !tocLinks.length) return;
  
  // Get current scroll position
  const scrollPosition = window.scrollY;
  
  // Find the current heading
  let currentHeadingIndex = 0;
  
  headings.forEach((heading, index) => {
    if (heading.offsetTop <= scrollPosition + 100) {
      currentHeadingIndex = index;
    }
  });
  
  // Remove active class from all TOC links
  tocLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current TOC link
  tocLinks[currentHeadingIndex].classList.add('active');
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if (!lazyImages.length) return;
    
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy-image');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  }
}

/**
 * Add copy button to code blocks
 */
function addCopyButtonsToCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentNode;
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';
    
    // Position the button
    pre.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '0.5rem';
    copyButton.style.right = '0.5rem';
    
    pre.appendChild(copyButton);
    
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
        copyButton.textContent = 'Failed to copy';
      });
    });
  });
}

/**
 * Debounce function to limit function call frequency
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 