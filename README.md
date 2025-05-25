# Modern CSS Site

This project is a modern CSS exhibition site showcasing advanced CSS techniques and responsive design. It features a clean, minimalist design with a focus on typography and user experience.

## Features

- Modern CSS techniques (clamp, grid, dynamic viewport units)
- CSS variables for global styling
- GSAP animations for smooth transitions
- Responsive design optimized for both mobile and desktop
- Interactive menu overlay with custom styling
- Student gallery with specific aspect ratios for different devices
- Dynamic secondary footer that changes content based on scroll position

## Project Structure

```
modern-css-site/
├── css/
│   └── style.css          # All CSS in one file
├── js/
│   └── main.js            # All JavaScript in one file
├── images/                # For project images (currently using placeholder URLs)
├── pages/
│   └── student.html       # Generic student profile page template
└── index.html             # Main homepage
```

## CSS Approach

The project uses a "root variables" approach where global styles are defined as CSS custom properties in the `:root` selector. This allows for quick global changes to:

- Colors
- Typography (font families, sizes)
- Spacing
- Borders
- Shadows
- Transitions

## Animations

The site uses GSAP (GreenSock Animation Platform) for:

- Fade-in animations
- Scroll-triggered animations
- Staggered animations
- Element transitions

## Running the Project

This is a static site, so you can simply open the `index.html` file in your browser to view it. For the best experience:

1. Use a modern browser that supports all CSS features (Chrome, Firefox, Safari, Edge)
2. For local development, you can use a simple HTTP server:

```bash
# If you have Python installed
python -m http.server

# If you have Node.js installed
npx serve
```

## Future Development

This static site is designed to be evolved into a CMS website. Potential next steps include:

1. Integrating with a headless CMS
2. Converting to a static site generator (11ty, Astro, etc.)
3. Adding a backend for dynamic content
4. Implementing user authentication for student profiles
5. Creating an admin interface for content management

## Browser Compatibility

This project uses modern CSS features and may not work correctly in older browsers. It's recommended to use the latest versions of Chrome, Firefox, Safari, or Edge.
