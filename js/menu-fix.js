/**
 * Menu Fix Script
 * This script directly fixes menu issues on index.html
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Menu fix script loaded');
  
  // Force setup menu functionality
  const menuLink = document.querySelector('.footer-left a');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuClose = document.querySelector('.menu-close');
  
  console.log('Menu link found (by alternate selector):', menuLink ? 'Yes' : 'No');
  console.log('Menu overlay found:', menuOverlay ? 'Yes' : 'No');
  console.log('Menu close button found:', menuClose ? 'Yes' : 'No');
  
  if (menuLink && menuOverlay) {
    console.log('Setting up menu functionality with alternate selector');
    
    // Add the correct class if it's missing
    if (!menuLink.classList.contains('menu-link')) {
      menuLink.classList.add('menu-link');
    }
    
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
    
    // Add direct click handler
    menuLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Menu link clicked directly');
      
      if (menuOverlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Setup close button if it exists
    if (menuClose) {
      menuClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }
  } else {
    console.error('Critical menu elements still not found with alternate selector!');
  }
});
