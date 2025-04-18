document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
    
    if (!track || slides.length === 0) return;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Arrange slides next to each other
    const setSlidePosition = () => {
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
    };
    
    setSlidePosition();
    
    // Move to slide
    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
        
        // Update indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[currentIndex].classList.add('active');
    };
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) {
            moveToSlide(0);
        } else {
            moveToSlide(currentIndex + 1);
        }
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex === 0) {
            moveToSlide(slides.length - 1);
        } else {
            moveToSlide(currentIndex - 1);
        }
    });
    
    // Indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            moveToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
    
    // Auto-advance (optional)
    let autoSlideInterval = setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    // Pause auto-advance on hover
    track.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.parentElement.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${newSlideWidth * currentIndex}px)`;
        
        slides.forEach((slide, index) => {
            slide.style.left = `${newSlideWidth * index}px`;
        });
    });
});