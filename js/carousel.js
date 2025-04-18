class InteractiveCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
        
        if (!this.track || this.slides.length === 0) return;
        
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        this.setSlidePosition();
        this.addEventListeners();
        this.moveToSlide(this.currentIndex);
    }

    setSlidePosition() {
        this.slides.forEach((slide, index) => {
            slide.style.left = `${this.slideWidth * index}px`;
        });
    }

    addEventListeners() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Indicators
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.getAttribute('data-index'));
                this.moveToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
        });
        
        // Auto-advance
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
        
        // Pause on hover
        this.track.parentElement.addEventListener('mouseenter', () => {
            clearInterval(this.autoSlideInterval);
        });
        
        this.track.parentElement.addEventListener('mouseleave', () => {
            this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
        });
        
        // Resize
        window.addEventListener('resize', () => {
            this.slideWidth = this.slides[0].getBoundingClientRect().width;
            this.setSlidePosition();
            this.moveToSlide(this.currentIndex);
        });
    }

    nextSlide() {
        if (this.currentIndex === this.slides.length - 1) {
            this.moveToSlide(0);
        } else {
            this.moveToSlide(this.currentIndex + 1);
        }
    }

    prevSlide() {
        if (this.currentIndex === 0) {
            this.moveToSlide(this.slides.length - 1);
        } else {
            this.moveToSlide(this.currentIndex - 1);
        }
    }

    moveToSlide(index) {
        this.currentIndex = index;
        this.track.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
        this.updateIndicators();
    }

    updateIndicators() {
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        this.indicators[this.currentIndex].classList.add('active');
    }
}

new InteractiveCarousel();