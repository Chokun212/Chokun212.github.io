/**
 * ================================
 * Personal Portfolio JavaScript
 * ================================
 * Features:
 * - Smooth scrolling navigation
 * - Active navigation link highlighting
 * - Scroll-to-top functionality
 * - Intersection Observer for scroll animations
 */

// ================================
// Smooth Scrolling for Navigation
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close any open mobile menu if exists
                const navbarToggle = document.querySelector('.navbar-toggle');
                if (navbarToggle && navbarToggle.classList.contains('active')) {
                    navbarToggle.classList.remove('active');
                    document.querySelector('.nav-links').classList.remove('active');
                }
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink();
            }
        });
    });
});

// ================================
// Highlight Active Navigation Link
// ================================
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// ================================
// Add Fade-in Animation on Scroll
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation (add class to elements you want to animate)
document.addEventListener('DOMContentLoaded', function() {
    const educationItems = document.querySelectorAll('.education-item');
    const experienceItems = document.querySelectorAll('.experience-item');
    const contactItems = document.querySelectorAll('.contact-item');
    const skillsCategories = document.querySelectorAll('.skills-category');
    const blogCards = document.querySelectorAll('.blog-card');
    
    const elementsToObserve = [
        ...educationItems,
        ...experienceItems,
        ...contactItems,
        ...skillsCategories,
        ...blogCards
    ];
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ================================
// Skill Progress Animation
// ================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                if (skillProgress) {
                    const width = skillProgress.style.width;
                    skillProgress.style.width = '0';
                    
                    setTimeout(() => {
                        skillProgress.style.width = width;
                    }, 100);
                }
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

document.addEventListener('DOMContentLoaded', animateSkillBars);

// ================================
// Scroll to Top Button
// ================================
function createScrollToTopButton() {
    // Create button element
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑ Top';
    scrollTopBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; display: none; background-color: #0066cc; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 14px; z-index: 999; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#003399';
        this.style.transform = 'translateY(-3px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#0066cc';
        this.style.transform = 'translateY(0)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ================================
// Contact Links Handler
// ================================
function setupContactLinks() {
    const emailLink = document.querySelector('.email');
    const phoneItems = document.querySelectorAll('.contact-item p');
    
    // Make email clickable (optional)
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            const email = this.textContent;
            window.location.href = 'mailto:' + email;
        });
    }
}

document.addEventListener('DOMContentLoaded', setupContactLinks);

// ================================
// Blog Card Interactions
// ================================
function setupBlogCards() {
    const blogLinks = document.querySelectorAll('.read-more');
    
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is a demo link. In a real portfolio, this would navigate to the full article.');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupBlogCards);

// ================================
// Social Links Security
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// ================================
// Add Loading Animation
// ================================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ================================
// Keyboard Navigation
// ================================
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K or / to focus search (can be extended)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Arrow keys for section navigation
    if (event.key === 'ArrowDown') {
        const sections = document.querySelectorAll('section');
        const currentScroll = window.scrollY;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }
});

// ================================
// Mobile Navigation Toggle (if needed)
// ================================
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'navbar-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.style.display = 'none';
    toggleBtn.style.backgroundColor = 'transparent';
    toggleBtn.style.border = 'none';
    toggleBtn.style.fontSize = '1.5rem';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.color = '#0066cc';
    
    // Only show on small screens
    function handleResize() {
        if (window.innerWidth <= 768 && toggleBtn.style.display === 'none') {
            toggleBtn.style.display = 'block';
            navbar.appendChild(toggleBtn);
        } else if (window.innerWidth > 768) {
            toggleBtn.style.display = 'none';
            navLinks.classList.remove('active');
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Toggle menu
    toggleBtn.addEventListener('click', function() {
        navLinks.style.maxHeight = navLinks.style.maxHeight ? null : '500px';
    });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);

// ================================
// Form Validation Helper
// ================================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// Console Welcome Message
// ================================
console.log('%cWelcome to My Portfolio!', 'font-size: 20px; color: #0066cc; font-weight: bold;');
console.log('%cFeel free to explore the code and get in touch!', 'font-size: 14px; color: #333;');
console.log('%cVersion: 1.0.0', 'font-size: 12px; color: #999;');
