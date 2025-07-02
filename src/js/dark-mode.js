/**
 * Dark Mode Toggle Functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved user preference, if any
  const currentTheme = localStorage.getItem('theme');
  
  // If the user has explicitly chosen a theme, use it
  if (currentTheme) {
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  } 
  // Otherwise, use system preference
  else if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update local storage
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}); 