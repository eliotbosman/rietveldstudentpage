/**
 * Direct Menu Fix
 * This script directly handles the menu functionality without relying on other scripts
 */

// Execute immediately when loaded
(function() {
  console.log('Direct menu fix loaded');
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Get the menu elements directly
    const menuButton = document.querySelector('.footer-left a');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.menu-close');
    
    console.log('Direct menu fix - Menu button found:', menuButton ? 'Yes' : 'No');
    console.log('Direct menu fix - Menu overlay found:', menuOverlay ? 'Yes' : 'No');
    console.log('Direct menu fix - Close button found:', closeButton ? 'Yes' : 'No');
    
    if (menuButton && menuOverlay) {
      // Store original text
      const originalText = menuButton.textContent;
      
      // Function to open menu
      function openMenu() {
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        menuButton.textContent = 'CLOSE';
        console.log('Menu opened');
      }
      
      // Function to close menu
      function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuButton.textContent = originalText;
        console.log('Menu closed');
      }
      
      // Add click handler to menu button
      menuButton.onclick = function(e) {
        e.preventDefault();
        console.log('Menu button clicked');
        
        if (menuOverlay.classList.contains('active')) {
          closeMenu();
        } else {
          openMenu();
        }
      };
      
      // Add click handler to close button if it exists
      if (closeButton) {
        closeButton.onclick = function(e) {
          e.preventDefault();
          closeMenu();
        };
      }
      
      console.log('Direct menu handlers attached');
    } else {
      console.error('Critical menu elements not found for direct fix');
    }
  });
})();
