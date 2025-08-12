// ---
// KHC Global Services - Interactive Script
// Coded by Maestro
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
     * "Before & After" Interactive Comparison Slider
     */
    const slider = document.querySelector('.comparison-slider .slider');
    if (slider) {
        const afterImage = document.querySelector('.comparison-slider .after-image');
        const sliderLine = document.querySelector('.comparison-slider .slider-line');
        const sliderButton = document.querySelector('.comparison-slider .slider-button');

        function updateSlider(value) {
            const percentage = value + '%';
            afterImage.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
            sliderLine.style.left = percentage;
            sliderButton.style.left = percentage;
        }
        slider.addEventListener('input', (e) => updateSlider(e.target.value));
        updateSlider(slider.value); // Initialize
    }

    /**
     * Accordion Logic for Services Section
     */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const panel = item.querySelector('.accordion-panel');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.accordion-panel').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

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
