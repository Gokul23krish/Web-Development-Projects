// =================================
// Enhanced Portfolio JavaScript
// Features: Dynamic Navbar, Form Validation, Dark Mode
// =================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio JavaScript Loading...');
    
    // Initialize all features with error handling
    try {
        initDynamicNavbar();
        initDarkModeToggle();
        initContactFormValidation();
        initMobileMenu();
        initScrollAnimations();
        
        console.log('✅ All features initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing features:', error);
    }
});

// =================================
// 1. Dynamic Navigation Bar
// =================================
function initDynamicNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Change navbar background on scroll (optimized)
    const navbarScrollHandler = throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active menu item based on current section
        updateActiveNavLink();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', navbarScrollHandler);

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 200; // Offset for better UX

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Update active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =================================
// 2. Dark Mode Toggle with localStorage
// =================================
function initDarkModeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// =================================
// 3. Contact Form Validation
// =================================
function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, 'nameError', 'Name is required');
        const isEmailValid = validateEmail(emailInput);
        const isSubjectValid = validateField(subjectInput, 'subjectError', 'Subject is required');
        const isMessageValid = validateField(messageInput, 'messageError', 'Message is required');

        // If all validations pass
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                form.reset();
                clearAllErrors();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        }
    });

    // Real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', 'Name is required'));
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subjectError', 'Subject is required'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError', 'Message is required'));

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Validation functions
    function validateField(input, errorId, errorMessage) {
        const errorElement = document.getElementById(errorId);
        
        if (input.value.trim() === '') {
            showError(input, errorElement, errorMessage);
            return false;
        } else {
            showSuccess(input, errorElement);
            return true;
        }
    }

    function validateEmail(emailInput) {
        const errorElement = document.getElementById('emailError');
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.classList.remove('show');
    }

    function clearError(input) {
        input.classList.remove('error', 'success');
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    function clearAllErrors() {
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            clearError(input);
        });
    }
}

// =================================
// 4. Mobile Menu
// =================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// =================================
// 5. Scroll Animations
// =================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// =================================
// Utility Functions
// =================================

// Throttle function for performance optimization
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Console welcome message
console.log(`
%c🚀 Portfolio Website Loaded Successfully! 
%c
✨ Features:
• Dynamic Navigation Bar
• Form Validation
• Dark Mode Toggle
• Responsive Design
• Smooth Animations

Built with HTML, CSS & Vanilla JavaScript
`, 
'font-size: 16px; font-weight: bold; color: #3498db;',
'font-size: 12px; color: #666;'
);

// =================================
// Error Handling
// =================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// =================================
// Additional Features & Enhancements
// =================================

// Add scroll-to-top button
function createScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide on scroll (optimized with throttle)
    const throttledScrollHandler = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize scroll-to-top button
createScrollToTopButton();
