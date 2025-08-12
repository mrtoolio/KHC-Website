// ---
// KHC Global Services - Interactive Script
// Coded by CC
// ---

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Mobile Navigation (Hamburger Menu)
     * Toggles the 'active' class on the navigation links panel.
     */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and close (X)
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburgerMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });


    /**
     * On-Scroll Animations
     * Uses IntersectionObserver for high performance.
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });


    /**
     * "Before & After" Interactive Comparison Slider
     */
    const slider = document.querySelector('.comparison-slider .slider');
    if (slider) { // Check if the slider exists on the page
        const afterImage = document.querySelector('.comparison-slider .after-image');
        const sliderLine = document.querySelector('.comparison-slider .slider-line');
        const sliderButton = document.querySelector('.comparison-slider .slider-button');

        function updateSlider(value) {
            const percentage = value + '%';
            afterImage.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
            sliderLine.style.left = percentage;
            sliderButton.style.left = percentage;
        }

        slider.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });
        
        // Initialize slider position
        updateSlider(slider.value);
    }

});
