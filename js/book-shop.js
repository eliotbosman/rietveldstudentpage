/**
 * Book Shop Functionality
 * Handles the interactive price buttons in the book shop section
 */

// Initialize the book shop functionality
function initBookShop() {
  const priceButtons = document.querySelectorAll('.price-button');
  
  if (!priceButtons.length) {
    console.log('No price buttons found in book shop');
    return;
  }
  
  console.log('Book shop initialization started');
  
  // Add click event listener to each price button
  priceButtons.forEach(button => {
    // Store the original price text
    const originalPrice = button.textContent;
    
    button.addEventListener('click', function() {
      // Check if button has already been clicked
      if (this.classList.contains('requested')) {
        // Revert back to original price
        this.textContent = originalPrice;
        this.classList.remove('requested');
      } else {
        // Change to "Request a copy" text
        this.textContent = 'Request a copy';
        this.classList.add('requested');
      }
    });
  });
  
  console.log('Book shop initialization completed');
}

// Export the function if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initBookShop };
}
