document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Typewriter Effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const phrases = [
            "Building elegant solutions with technical excellence",
            "Crafting digital experiences with precision",
            "Bridging design and development seamlessly"
        ];
        
        let currentPhraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;
        
        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                charIndex--;
                heroSubtitle.textContent = currentPhrase.substring(0, charIndex);
            } else {
                charIndex++;
                heroSubtitle.textContent = currentPhrase.substring(0, charIndex);
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                const speed = isDeleting ? 40 : typingSpeed;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Custom Cursor
    class CustomCursor {
        constructor() {
            this.cursor = document.querySelector('.custom-cursor');
            
            if (this.cursor) {
                this.init();
            }
        }
        
        init() {
            document.addEventListener('mousemove', this.moveCursor.bind(this));
            document.addEventListener('mousedown', this.activateCursor.bind(this));
            document.addEventListener('mouseup', this.deactivateCursor.bind(this));
            
            const interactiveElements = document.querySelectorAll('a, button, [data-cursor-effect]');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('active');
                });
                
                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('active');
                });
            });
        }
        
        moveCursor(e) {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        }
        
        activateCursor() {
            this.cursor.classList.add('clicking');
        }
        
        deactivateCursor() {
            this.cursor.classList.remove('clicking');
        }
    }
    
    new CustomCursor();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-category, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});