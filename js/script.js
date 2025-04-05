// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
const accordionItems = document.querySelectorAll('.accordion-item');
const billingToggle = document.getElementById('billing-toggle');

// Theme Toggle
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    themeSwitch.checked = true;
    document.body.setAttribute('data-theme', 'dark');
}

// Mobile Menu Toggle
menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (this.classList.contains('active')) {
        this.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        this.children[1].style.opacity = '0';
        this.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        this.children[0].style.transform = 'none';
        this.children[1].style.opacity = '1';
        this.children[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            menuToggle.click();
        }
    });
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(n) {
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonialSlides[n].classList.add('active');
    dots[n].classList.add('active');
    currentSlide = n;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
}

// Add event listeners to testimonial controls if they exist
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Accordion
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        
        item.classList.toggle('active');
    });
});

// Billing Toggle
if (billingToggle) {
    billingToggle.addEventListener('change', function() {
        const monthlyPrices = document.querySelectorAll('.plan-price.monthly');
        const annualPrices = document.querySelectorAll('.plan-price.annual');
        
        if (this.checked) {
            // Show annual prices
            monthlyPrices.forEach(price => {
                price.style.display = 'none';
            });
            
            annualPrices.forEach(price => {
                price.style.display = 'block';
            });
        } else {
            // Show monthly prices
            monthlyPrices.forEach(price => {
                price.style.display = 'block';
            });
            
            annualPrices.forEach(price => {
                price.style.display = 'none';
            });
        }
    });
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .plan-card, .section-title');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.feature-card, .plan-card, .section-title').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);