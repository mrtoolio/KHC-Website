// ---
// KHC Global Services - Interactive Script
// Coded by CC - The Masterpiece Edition
// ---

document.addEventListener('DOMContentLoaded', () => {

    // [ The Mobile Navigation, On-Scroll Animations, Accordion, and Carousel code from the previous version goes here. It is unchanged. ]
    // ...

    /**
     * RE-ENGINEERED: Before & After Interactive Comparison Slider
     * Custom drag logic for a smooth, tactile experience.
     */
    const sliderContainer = document.getElementById('comparison-slider');
    if (sliderContainer) {
        const afterImage = sliderContainer.querySelector('.after-image');
        const sliderLine = sliderContainer.querySelector('.slider-line');
        const sliderButton = sliderContainer.querySelector('.slider-button');
        let isDragging = false;

        const setSliderPosition = (x) => {
            const containerRect = sliderContainer.getBoundingClientRect();
            let position = (x - containerRect.left) / containerRect.width;
            
            // Clamp position between 0 and 1
            position = Math.max(0, Math.min(1, position));

            const percentage = position * 100 + '%';
            afterImage.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
            sliderLine.style.left = percentage;
            sliderButton.style.left = percentage;
        };

        // Mouse Events
        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                setSliderPosition(e.clientX);
            }
        });

        // Touch Events
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

    // [ The About Us Image Carousel code from the previous version goes here. It is unchanged. ]
    // ...

});
