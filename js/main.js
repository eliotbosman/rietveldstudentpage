/**
 * Exhibition Site - Main JavaScript
 * Handles dynamic footer content and section navigation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll behavior
  initScrollBehavior();
  
  // Initialize the main section navigation
  initSectionNavigation();
  
  // Initialize student gallery if on student page
  if (document.querySelector('.student-gallery')) {
    initStudentGallery();
  }
  
  // Initialize student profile if on student page
  if (document.querySelector('.student-page')) {
    initStudentProfile();
    initDynamicSecondaryFooter();
  }
  
  // Initialize program items to be always open
  initProgramItems();
  
  // Initialize menu overlay
  initMenuOverlay();
});

/**
 * Initialize scroll behavior and dynamic footer content
 */
function initScrollBehavior() {
  // Register ScrollTrigger plugin if GSAP is available
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  const main = document.querySelector('main');
  const footer = document.querySelector('.sticky-footer');
  const sections = document.querySelectorAll('.section');
  const footerLeft = document.querySelector('.footer-left');
  const footerCenter = document.querySelector('.footer-center');
  const footerRight = document.querySelector('.footer-right');
  
  if (!main || !footer || !sections.length || !footerLeft || !footerCenter || !footerRight) {
    return;
  }
  
  // Update footer content based on current section
  function updateFooterContent() {
    // Get the current section in view
    const scrollPosition = main.scrollTop;
    let currentSectionIndex = 0;
    
    // Determine which section is currently in view
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop - 100 && 
          scrollPosition < sectionTop + sectionHeight - 100) {
        currentSectionIndex = index;
      }
    });
    
    // Update footer content based on current section
    switch(currentSectionIndex) {
      case 0: // First section
        footerLeft.textContent = 'MENU';
        footerCenter.textContent = 'WWW.RIETVELD.GRAPHICDE';
        footerRight.innerHTML = '<a href="#" class="scroll-up-link">SCROLL UP</a>';
        break;
      case 1: // Second section
        footerLeft.textContent = 'MENU';
        footerCenter.textContent = 'EXHIBITION';
        footerRight.innerHTML = '<a href="#" class="scroll-up-link">SCROLL UP</a>';
        break;
      case 2: // Third section
        footerLeft.textContent = 'MENU';
        footerCenter.textContent = 'PUBLIC PROGRAM';
        footerRight.innerHTML = '<a href="#" class="scroll-up-link">SCROLL UP</a>';
        break;
      case 3: // Fourth section
        footerLeft.textContent = 'MENU';
        footerCenter.textContent = 'STUDENTS';
        footerRight.innerHTML = '<a href="#" class="scroll-up-link">SCROLL UP</a>';
        break;
      default:
        footerLeft.textContent = 'MENU';
        footerCenter.textContent = 'SITE TITLE';
        footerRight.innerHTML = '<a href="#" class="scroll-up-link">SCROLL UP</a>';
    }
  }
  
  // Listen for scroll events
  main.addEventListener('scroll', updateFooterContent);
  
  // Initial update
  updateFooterContent();
  
  // Handle scroll up link
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('scroll-up-link')) {
      e.preventDefault();
      main.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}

/**
 * Initialize program items to be always open
 */
function initProgramItems() {
  const programItems = document.querySelectorAll('.program-item');
  
  if (!programItems.length) {
    return;
  }
  
  // Make sure all program items are displayed as expanded
  programItems.forEach(item => {
    // Add expanded class to all items to ensure they're open
    if (!item.classList.contains('expanded')) {
      item.classList.add('expanded');
    }
  });
}

/**
 * Initialize menu overlay
 */
function initMenuOverlay() {
  // Try both the class selector and a more general selector
  const menuLink = document.querySelector('.menu-link') || document.querySelector('.footer-left a');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuClose = document.querySelector('.menu-close');
  const body = document.body;
  
  if (!menuLink || !menuOverlay) {
    console.log('Menu elements not found, will be handled by menu-fix.js if available');
    return;
  }
  
  console.log('Menu initialization started');
  
  // Original menu text
  const originalMenuText = menuLink.textContent;
  
  // Function to close the menu
  function closeMenu() {
    console.log('Closing menu');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    // Restore original menu text
    menuLink.textContent = originalMenuText;
  }
  
  // Function to open the menu
  function openMenu() {
    console.log('Opening menu');
    menuOverlay.classList.add('active');
    body.classList.add('menu-open');
    // Change menu text to CLOSE
    menuLink.textContent = 'CLOSE';
  }
  
  // Toggle menu on click
  menuLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Menu link clicked, current state:', menuOverlay.classList.contains('active'));
    
    if (menuOverlay.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu when clicking the close button
  if (menuClose) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  } else {
    console.warn('Menu close button not found');
  }
  
  // Close menu when clicking on a link (except the close button)
  const menuLinks = menuOverlay.querySelectorAll('a:not(.menu-close)');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  console.log('Menu initialization completed');
}

/**
 * Initialize dynamic secondary footer on student page
 * This function changes the content of the secondary footer when scrolling down
 */
function initDynamicSecondaryFooter() {
  const secondaryFooter = document.querySelector('.secondary-footer');
  const studentContent = document.querySelector('.student-content');
  const galleryContent = document.querySelector('.gallery-content');
  const studentDescription = document.querySelector('.student-description');
  const graduationQuote = document.querySelector('.graduation-quote');
  
  if (!secondaryFooter || !studentContent || !galleryContent) {
    return;
  }
  
  // Create alternative footer content for when user scrolls down
  const galleryFooterContent = `
    <div class="footer-left gallery-prev">&lt;</div>
    <div class="footer-center">
      <span class="pagination-current">1</span>/<span class="pagination-total">4</span>
    </div>
    <div class="footer-right gallery-next">&gt;</div>
  `;
  
  const infoFooterContent = `
    <div class="footer-left">
      <a href="#" class="back-to-gallery">INSTAGRAM</a>
    </div>
    <div class="footer-center">
      <span>WEBSITE</span>
    </div>
    <div class="footer-right">
      <a href="#" class="scroll-up-link">CONTACT</a>
    </div>
  `;
  
  // Store original content
  const originalContent = secondaryFooter.innerHTML;
  
  // Function to check scroll position and update footer
  function updateSecondaryFooter() {
    const galleryBottom = galleryContent.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    // If gallery is no longer visible (scrolled past)
    if (galleryBottom < windowHeight / 2) {
      // Switch to info footer content
      if (secondaryFooter.innerHTML !== infoFooterContent) {
        secondaryFooter.innerHTML = infoFooterContent;
        
        // Add event listener to "Back to Gallery" button
        const backToGalleryBtn = secondaryFooter.querySelector('.back-to-gallery');
        if (backToGalleryBtn) {
          backToGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            galleryContent.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }
    } else {
      // Switch back to gallery footer content
      if (secondaryFooter.innerHTML !== galleryFooterContent) {
        secondaryFooter.innerHTML = galleryFooterContent;
        
        // Reinitialize gallery navigation
        const prevBtn = secondaryFooter.querySelector('.gallery-prev');
        const nextBtn = secondaryFooter.querySelector('.gallery-next');
        
        if (prevBtn && nextBtn) {
          const imageContainers = galleryContent.querySelectorAll('.gallery-image-container');
          const paginationCurrent = secondaryFooter.querySelector('.pagination-current');
          const paginationTotal = secondaryFooter.querySelector('.pagination-total');
          
          if (paginationTotal) {
            paginationTotal.textContent = imageContainers.length;
          }
          
          prevBtn.addEventListener('click', () => {
            const currentIndex = parseInt(paginationCurrent.textContent) - 1;
            const newIndex = currentIndex > 0 ? currentIndex - 1 : imageContainers.length - 1;
            scrollToGalleryImage(newIndex);
          });
          
          nextBtn.addEventListener('click', () => {
            const currentIndex = parseInt(paginationCurrent.textContent) - 1;
            const newIndex = currentIndex < imageContainers.length - 1 ? currentIndex + 1 : 0;
            scrollToGalleryImage(newIndex);
          });
          
          function scrollToGalleryImage(index) {
            paginationCurrent.textContent = index + 1;
            imageContainers[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          }
        }
      }
    }
  }
  
  // Initial update
  updateSecondaryFooter();
  
  // Listen for scroll events
  window.addEventListener('scroll', updateSecondaryFooter);
  studentContent.addEventListener('scroll', updateSecondaryFooter);
}

/**
 * Initialize the student gallery
 * This function sets up the horizontal scrolling gallery with navigation controls
 */
function initStudentGallery() {
  const galleryContent = document.querySelector('.gallery-content');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const paginationCurrent = document.querySelector('.pagination-current');
  const paginationTotal = document.querySelector('.pagination-total');
  
  if (!galleryContent || !prevBtn || !nextBtn) return;
  
  const imageContainers = galleryContent.querySelectorAll('.gallery-image-container');
  const galleryImages = galleryContent.querySelectorAll('.gallery-image');
  const totalImages = imageContainers.length;
  let currentIndex = 0;
  
  // Set total count in pagination
  if (paginationTotal) {
    paginationTotal.textContent = totalImages;
  }
  
  // Function to update image sources based on screen width
  function updateImageSources() {
    const isMobile = window.innerWidth <= 768;
    
    galleryImages.forEach((image) => {
      // Get the appropriate image URL based on device
      const imageUrl = isMobile ? 
        image.getAttribute('data-mobile') : 
        image.getAttribute('data-desktop');
      
      // Set the background image
      if (imageUrl) {
        image.style.backgroundImage = `url('${imageUrl}')`;
        console.log(`Set image: ${imageUrl} for ${isMobile ? 'mobile' : 'desktop'}`);
        
        // Set aspect ratio class based on device
        if (isMobile) {
          image.classList.add('mobile-ratio');
          image.classList.remove('desktop-ratio');
        } else {
          image.classList.add('desktop-ratio');
          image.classList.remove('mobile-ratio');
        }
      } else {
        console.error('No image URL found for gallery image');
      }
    });
  }
  
  // Function to scroll to a specific image
  function scrollToImage(index) {
    if (index < 0) index = totalImages - 1; // Loop back to the end
    if (index >= totalImages) index = 0; // Loop back to the beginning
    
    currentIndex = index;
    
    // Update pagination
    if (paginationCurrent) {
      paginationCurrent.textContent = currentIndex + 1;
    }
    
    // Scroll to the image
    imageContainers[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
  
  // Initialize with first image active and correct aspect ratio
  updateImageSources();
  scrollToImage(0);
  
  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToImage(currentIndex + 1);
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      scrollToImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      scrollToImage(currentIndex + 1);
    }
  });
  
  // Detect when scrolling stops to update the pagination
  let isScrolling;
  galleryContent.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // Find the current visible image
      const containerWidth = galleryContent.clientWidth;
      const scrollLeft = galleryContent.scrollLeft;
      const closestIndex = Math.round(scrollLeft / containerWidth);
      
      // Update current index and pagination
      currentIndex = Math.min(Math.max(closestIndex, 0), totalImages - 1);
      if (paginationCurrent) {
        paginationCurrent.textContent = currentIndex + 1;
      }
    }, 100);
  });
  
  // Add swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  galleryContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  galleryContent.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      scrollToImage(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      scrollToImage(currentIndex - 1);
    }
  }
  
  // Update image sources when window is resized
  window.addEventListener('resize', updateImageSources);
}

/**
 * Initialize the main section navigation
 */
function initSectionNavigation() {
  const columns = document.querySelectorAll('.column');
  const sections = document.querySelectorAll('.section');
  
  if (!columns.length || !sections.length) {
    return;
  }
  
  // Initialize exhibition info gallery
  initExhibitionInfoGallery();
  
  // Add click event listeners to columns
  columns.forEach((column, index) => {
    column.addEventListener('click', () => {
      // Navigate to corresponding section
      if (sections[index + 1]) {
        sections[index + 1].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Make the columns interactive with hover effects
  columns.forEach(column => {
    column.style.cursor = 'pointer';
    
    column.addEventListener('mouseenter', () => {
      gsap.to(column, {
        opacity: 0.8,
        duration: 0.3
      });
    });
    
    column.addEventListener('mouseleave', () => {
      gsap.to(column, {
        opacity: 1,
        duration: 0.3
      });
    });
  });
}

/**
 * Initialize the exhibition info gallery
 */
function initExhibitionInfoGallery() {
  const gallerySection = document.getElementById('exhibition-info-section');
  if (!gallerySection) return;
  
  const galleryContent = gallerySection.querySelector('.gallery-content');
  const prevBtn = gallerySection.querySelector('.gallery-prev');
  const nextBtn = gallerySection.querySelector('.gallery-next');
  const paginationCurrent = gallerySection.querySelector('.pagination-current');
  const paginationTotal = gallerySection.querySelector('.pagination-total');
  
  if (!galleryContent || !prevBtn || !nextBtn) return;
  
  const imageContainers = galleryContent.querySelectorAll('.gallery-image-container');
  const totalImages = imageContainers.length;
  let currentIndex = 0;
  
  // Set total count in pagination
  if (paginationTotal) {
    paginationTotal.textContent = totalImages;
  }
  
  // Function to scroll to a specific image
  function scrollToImage(index) {
    if (index < 0) index = totalImages - 1; // Loop back to the end
    if (index >= totalImages) index = 0; // Loop back to the beginning
    
    currentIndex = index;
    
    // Update pagination
    if (paginationCurrent) {
      paginationCurrent.textContent = currentIndex + 1;
    }
    
    // Scroll to the image
    imageContainers[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
  
  // Initialize with first image active
  scrollToImage(0);
  
  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToImage(currentIndex + 1);
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      scrollToImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      scrollToImage(currentIndex + 1);
    }
  });
  
  // Detect when scrolling stops to update the pagination
  let isScrolling;
  galleryContent.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // Find the current visible image
      const containerWidth = galleryContent.clientWidth;
      const scrollLeft = galleryContent.scrollLeft;
      const closestIndex = Math.round(scrollLeft / containerWidth);
      
      // Update current index and pagination
      currentIndex = Math.min(Math.max(closestIndex, 0), totalImages - 1);
      if (paginationCurrent) {
        paginationCurrent.textContent = currentIndex + 1;
      }
    }, 100);
  });
}

// Column interactivity is now handled inside initSectionNavigation function

/**
 * Initialize the student profile page
 * This function handles the dynamic content loading based on URL parameters
 */
function initStudentProfile() {
  // Mock student data (would be loaded from a database in a real implementation)
  const students = {
    '1': {
      name: 'Emma Johnson',
      program: 'Web Design',
      year: '2025',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      bio: 'Emma is a passionate web designer with a focus on creating intuitive and accessible user interfaces. She has experience working with various design tools and front-end technologies. Her approach combines aesthetic sensibility with technical knowledge to create engaging digital experiences.',
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 75 },
        { name: 'UI Design', level: 85 },
        { name: 'Responsive Design', level: 95 }
      ],
      projects: [
        {
          title: 'E-commerce Redesign',
          description: 'A complete overhaul of an e-commerce platform focusing on user experience and conversion optimization.',
          image: 'https://picsum.photos/400/300?random=10'
        },
        {
          title: 'Portfolio Template',
          description: 'A customizable portfolio template for creative professionals using modern CSS techniques.',
          image: 'https://picsum.photos/400/300?random=11'
        },
        {
          title: 'Mobile App Interface',
          description: 'UI/UX design for a fitness tracking mobile application with a focus on accessibility.',
          image: 'https://picsum.photos/400/300?random=12'
        }
      ]
    },
    '2': {
      name: 'James Smith',
      program: 'UX Design',
      year: '2025',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'James is a UX designer with a background in psychology. He specializes in user research, wireframing, and prototyping. His designs are focused on creating meaningful and intuitive user experiences that solve real problems for people.',
      skills: [
        { name: 'User Research', level: 95 },
        { name: 'Wireframing', level: 90 },
        { name: 'Prototyping', level: 85 },
        { name: 'Usability Testing', level: 80 }
      ],
      projects: [
        {
          title: 'Banking App Redesign',
          description: 'A user-centered redesign of a mobile banking application to improve accessibility and user satisfaction.',
          image: 'https://picsum.photos/400/300?random=13'
        },
        {
          title: 'Healthcare Portal',
          description: 'A patient portal for a healthcare provider with a focus on simplifying complex medical information.',
          image: 'https://picsum.photos/400/300?random=14'
        },
        {
          title: 'Smart Home Interface',
          description: 'A control interface for smart home devices that prioritizes ease of use and accessibility.',
          image: 'https://picsum.photos/400/300?random=15'
        }
      ]
    },
    '3': {
      name: 'Sophia Chen',
      program: 'Graphic Design',
      year: '2025',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Sophia is a graphic designer with a passion for branding and typography. She combines traditional design principles with modern techniques to create visually striking and meaningful designs.',
      skills: [
        { name: 'Typography', level: 95 },
        { name: 'Branding', level: 90 },
        { name: 'Illustration', level: 85 },
        { name: 'Adobe Creative Suite', level: 95 }
      ],
      projects: [
        {
          title: 'Brand Identity System',
          description: 'A comprehensive brand identity system for a sustainable fashion company.',
          image: 'https://picsum.photos/400/300?random=16'
        },
        {
          title: 'Editorial Design',
          description: 'Layout and design for a quarterly arts and culture magazine.',
          image: 'https://picsum.photos/400/300?random=17'
        },
        {
          title: 'Packaging Design',
          description: 'Sustainable packaging design for an organic food company.',
          image: 'https://picsum.photos/400/300?random=18'
        }
      ]
    },
    '4': {
      name: 'Michael Brown',
      program: 'Digital Media',
      year: '2025',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      bio: 'Michael is a digital media artist exploring the intersection of technology and traditional art forms. His work often incorporates interactive elements and explores themes of identity and memory.',
      skills: [
        { name: 'Digital Art', level: 90 },
        { name: 'Motion Graphics', level: 85 },
        { name: 'Interactive Media', level: 80 },
        { name: '3D Modeling', level: 75 }
      ],
      projects: [
        {
          title: 'Interactive Installation',
          description: 'A responsive light and sound installation that reacts to viewer movement.',
          image: 'https://picsum.photos/400/300?random=19'
        },
        {
          title: 'Animated Short Film',
          description: 'A 3-minute animated short exploring themes of isolation and connection.',
          image: 'https://picsum.photos/400/300?random=20'
        },
        {
          title: 'Augmented Reality Experience',
          description: 'An AR application that overlays historical information on urban environments.',
          image: 'https://picsum.photos/400/300?random=21'
        }
      ]
    }
  };
  
  // Get the student ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || '1'; // Default to first student if no ID provided
  
  // Get the student data
  const student = students[id];
  
  // If student data exists, update the profile
  if (student) {
    updateStudentProfile(student);
    
    // Initialize secondary footer navigation
    initSecondaryFooterNav(id, Object.keys(students).length, students);
  } else {
    console.error(`Student with ID ${id} not found.`);
  }
  
  // Initialize bookmarking functionality
  initBookmarkFunctionality();
}

/**
 * Initialize the secondary footer navigation
 */
function initSecondaryFooterNav(currentId, totalStudents, students) {
  const prevButton = document.querySelector('.secondary-footer .footer-left');
  const nextButton = document.querySelector('.secondary-footer .footer-right');
  
  if (!prevButton || !nextButton) return;
  
  // Convert currentId to number for calculations
  const currentIdNum = parseInt(currentId);
  
  // Calculate previous and next student IDs
  const prevId = currentIdNum > 1 ? currentIdNum - 1 : totalStudents;
  const nextId = currentIdNum < totalStudents ? currentIdNum + 1 : 1;
  
  // Add event listeners for navigation
  prevButton.addEventListener('click', () => {
    window.location.href = `student.html?id=${prevId}`;
  });
  
  nextButton.addEventListener('click', () => {
    window.location.href = `student.html?id=${nextId}`;
  });
}

/**
 * Initialize bookmarking functionality
 */
function initBookmarkFunctionality() {
  const bookmarkButton = document.querySelector('.secondary-footer .footer-center');
  if (!bookmarkButton) return;
  
  // Get current URL for bookmarking
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id') || '1';
  
  // Check if this student is already bookmarked
  const bookmarkedStudents = JSON.parse(localStorage.getItem('bookmarkedStudents') || '[]');
  const isBookmarked = bookmarkedStudents.includes(studentId);
  
  // Update bookmark button appearance if already bookmarked
  if (isBookmarked) {
    bookmarkButton.classList.add('bookmarked');
  }
  
  // Add click event to toggle bookmark status
  bookmarkButton.addEventListener('click', () => {
    const bookmarkedStudents = JSON.parse(localStorage.getItem('bookmarkedStudents') || '[]');
    
    if (bookmarkedStudents.includes(studentId)) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedStudents.filter(id => id !== studentId);
      localStorage.setItem('bookmarkedStudents', JSON.stringify(updatedBookmarks));
      bookmarkButton.classList.remove('bookmarked');
    } else {
      // Add to bookmarks
      bookmarkedStudents.push(studentId);
      localStorage.setItem('bookmarkedStudents', JSON.stringify(bookmarkedStudents));
      bookmarkButton.classList.add('bookmarked');
    }
  });
}

/**
 * Update the student profile with the given student data
 */
function updateStudentProfile(student) {
  // Update basic info
  document.getElementById('student-name').textContent = student.name;
  document.getElementById('student-program').textContent = student.program;
  document.getElementById('student-year').textContent = student.year;
  
  // Update profile image
  const profileImage = document.querySelector('.student-profile-image img');
  if (profileImage) {
    profileImage.src = student.image;
    profileImage.alt = `${student.name}'s profile picture`;
  }
  
  // Update bio
  const bioElement = document.querySelector('.student-bio');
  if (bioElement) {
    bioElement.textContent = student.bio;
  }
  
  // Update skills
  const skillsContainer = document.querySelector('.student-skills');
  if (skillsContainer && student.skills) {
    skillsContainer.innerHTML = '';
    
    student.skills.forEach(skill => {
      const skillElement = document.createElement('div');
      skillElement.className = 'skill';
      
      const skillName = document.createElement('div');
      skillName.className = 'skill-name';
      skillName.textContent = skill.name;
      
      const skillBar = document.createElement('div');
      skillBar.className = 'skill-bar';
      
      const skillLevel = document.createElement('div');
      skillLevel.className = 'skill-level';
      skillLevel.style.width = `${skill.level}%`;
      
      skillBar.appendChild(skillLevel);
      skillElement.appendChild(skillName);
      skillElement.appendChild(skillBar);
      
      skillsContainer.appendChild(skillElement);
    });
  }
  
  // Update projects
  const projectsContainer = document.querySelector('.student-projects');
  if (projectsContainer && student.projects) {
    projectsContainer.innerHTML = '';
    
    student.projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      
      const projectImage = document.createElement('img');
      projectImage.src = project.image;
      projectImage.alt = project.title;
      
      const projectInfo = document.createElement('div');
      projectInfo.className = 'project-info';
      
      const projectTitle = document.createElement('h3');
      projectTitle.textContent = project.title;
      
      const projectDescription = document.createElement('p');
      projectDescription.textContent = project.description;
      
      projectInfo.appendChild(projectTitle);
      projectInfo.appendChild(projectDescription);
      
      projectElement.appendChild(projectImage);
      projectElement.appendChild(projectInfo);
      
      projectsContainer.appendChild(projectElement);
    });
  }
  
  // Initialize horizontal gallery for student projects
  initStudentGallery();
}

/**
 * Initialize horizontal gallery for student projects
 */
function initStudentGallery() {
  const studentGallery = document.querySelector('.student-gallery');
  if (!studentGallery) return;
  
  const galleryImages = studentGallery.querySelectorAll('.gallery-image');
  const pagination = studentGallery.querySelector('.gallery-pagination');
  const prevBtn = studentGallery.querySelector('.gallery-prev');
  const nextBtn = studentGallery.querySelector('.gallery-next');
  
  if (!galleryImages.length || !pagination || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const totalImages = galleryImages.length;
  
  // Update pagination display
  function updatePagination() {
    pagination.textContent = `${currentIndex + 1}/${totalImages}`;
  }
  
  // Show current image
  function showImage(index) {
    galleryImages.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
    updatePagination();
  }
  
  // Initialize
  updatePagination();
  showImage(currentIndex);
  
  // Previous button
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
  });
  
  // Next button
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
  });
}

/**
 * Add smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const main = document.querySelector('main');
      if (main) {
        main.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});
