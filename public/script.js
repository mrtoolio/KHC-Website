// ---
// KHC Global Services - Interactive Script
// Stable V2 Foundation with Re-Engineered Slider
// ---

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Mobile Navigation (Hamburger Menu)
     */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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
     * On-Scroll Animations (IntersectionObserver)
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
     * RE-ENGINEERED: "Before & After" Slider with Smooth Drag
     * This replaces the default input range with a custom drag listener.
     */
    const sliderContainer = document.querySelector('.comparison-slider');
    if (sliderContainer) {
        // We no longer need the <input> slider, this is a direct drag implementation.
        const afterImage = sliderContainer.querySelector('.after-image');
        const sliderLine = sliderContainer.querySelector('.slider-line');
        const sliderButton = sliderContainer.querySelector('.slider-button');
        let isDragging = false;

        // Function to update the visuals based on cursor/finger position
        const setSliderPosition = (x) => {
            const containerRect = sliderContainer.getBoundingClientRect();
            let position = (x - containerRect.left) / containerRect.width;
            
            // Clamp position between 0 and 1 (0% and 100%)
            position = Math.max(0, Math.min(1, position));

            const percentage = position * 100 + '%';
            afterImage.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
            sliderLine.style.left = percentage;
            sliderButton.style.left = percentage;
        };

        // Mouse Events for Desktop
        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault(); // Prevents text selection while dragging
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                setSliderPosition(e.clientX);
            }
        });

        // Touch Events for Mobile
        sliderContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length > 0) {
                setSliderPosition(e.touches[0].clientX);
            }
        });
    }

    /**
     * About Us Image Carousel
     */
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        let currentIndex = 0;

        const moveToSlide = (index) => {
            carouselTrack.style.transform = 'translateX(-' + 100 * index + '%)';
            currentIndex = index;
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            moveToSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            moveToSlide(prevIndex);
        });
    }

});
