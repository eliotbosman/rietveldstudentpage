/**
 * Menu Debug Script
 * This script helps debug and fix menu issues on index.html
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Menu debug script loaded');
  
  // Check if menu elements exist
  const menuLink = document.querySelector('.menu-link');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuClose = document.querySelector('.menu-close');
  
  console.log('Menu link found:', menuLink ? 'Yes' : 'No');
  console.log('Menu overlay found:', menuOverlay ? 'Yes' : 'No');
  console.log('Menu close button found:', menuClose ? 'Yes' : 'No');
  
  // Force initialize menu functionality
  if (menuLink && menuOverlay) {
    console.log('Setting up menu functionality directly');
    
    // Original menu text
    const originalMenuText = menuLink.textContent;
    
    // Function to close the menu
    function closeMenu() {
      console.log('Closing menu');
      menuOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      // Restore original menu text
      menuLink.textContent = originalMenuText;
    }
    
    // Function to open the menu
    function openMenu() {
      console.log('Opening menu');
      menuOverlay.classList.add('active');
      document.body.classList.add('menu-open');
      // Change menu text to CLOSE
      menuLink.textContent = 'CLOSE';
    }
    
    // Remove any existing event listeners (as best as possible)
    menuLink.outerHTML = menuLink.outerHTML;
    
    // Re-get the element after removing event listeners
    const newMenuLink = document.querySelector('.menu-link');
    
    // Add new event listener
    newMenuLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Menu link clicked, current state:', menuOverlay.classList.contains('active'));
      
      if (menuOverlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Setup close button if it exists
    if (menuClose) {
      // Remove any existing event listeners
      menuClose.outerHTML = menuClose.outerHTML;
      
      // Re-get the element
      const newMenuClose = document.querySelector('.menu-close');
      
      // Add new event listener
      newMenuClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }
  } else {
    console.error('Critical menu elements not found!');
  }
});
