/**
 * Gallery Fix Script
 * This script ensures gallery images are properly displayed
 */

document.addEventListener('DOMContentLoaded', function() {
  // Force update of gallery images
  function forceUpdateGalleryImages() {
    console.log('Forcing gallery image update');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length === 0) {
      console.log('No gallery images found');
      return;
    }
    
    console.log(`Found ${galleryImages.length} gallery images`);
    
    // Get the appropriate image URL based on device
    const isMobile = window.innerWidth <= 768;
    
    galleryImages.forEach((image, index) => {
      const imageUrl = isMobile ? 
        image.getAttribute('data-mobile') : 
        image.getAttribute('data-desktop');
      
      console.log(`Image ${index + 1}: ${imageUrl}`);
      
      // Set the background image
      if (imageUrl) {
        image.style.backgroundImage = `url('${imageUrl}')`;
        console.log(`Set background image for image ${index + 1}`);
      } else {
        console.log(`No image URL for image ${index + 1}`);
      }
    });
  }
  
  // Run immediately and after a short delay to ensure images are loaded
  forceUpdateGalleryImages();
  setTimeout(forceUpdateGalleryImages, 500);
});
