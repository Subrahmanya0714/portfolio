// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
const typingTexts = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Creative Problem Solver',
    'Tech Enthusiast'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingElement = document.getElementById('typing-text');
const navbar = document.getElementById('navbar');

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeHeroInteraction();
    initializeBubblePhysics();
});

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add transition effect
    document.documentElement.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Navigation Management
function initializeNavigation() {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Typing Animation
function initializeTypingAnimation() {
    if (!typingElement) return;
    
    typeText();
}

function typeText() {
    const currentText = typingTexts[typingIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger specific animations
                if (entry.target.classList.contains('skill')) {
                    animateSkillBar(entry.target);
                } else if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                } else if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(`
        .hero-content,
        .hero-image,
        .about-text,
        .about-skills,
        .skill,
        .stat,
        .project-card,
        .service-card,
        .contact-info,
        .contact-form-container
    `);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBar(skillElement) {
    const progressBar = skillElement.querySelector('.skill-progress');
    const targetWidth = progressBar.getAttribute('data-width');
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
    }, 300);
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// Service Card Animation
function animateServiceCard(card) {
    const icon = card.querySelector('.service-icon');
    
    setTimeout(() => {
        icon.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 600);
    }, 200);
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Add floating label effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                label.style.transform = 'translateY(-25px) scale(0.8)';
            }
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.transform = '';
            label.style.color = '';
        });
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project Cards Interaction
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Hero Interactive Elements
function initializeHeroInteraction() {
    const heroSection = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (!heroSection || floatingElements.length === 0) return;
    
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        floatingElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();
            
            // Get element center relative to hero section
            const elementCenterX = elementRect.left - heroRect.left + elementRect.width / 2;
            const elementCenterY = elementRect.top - heroRect.top + elementRect.height / 2;
            
            // Calculate distance from cursor to element center
            const deltaX = mouseX - elementCenterX;
            const deltaY = mouseY - elementCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Get the speed multiplier from data attribute
            const speed = parseFloat(element.getAttribute('data-speed')) || 1;
            
            // Only move if cursor is within 150px of the element
            if (distance < 150) {
                // Calculate repulsion force (stronger when closer)
                const force = Math.max(0, (150 - distance) / 150);
                const moveDistance = force * 40 * speed; // Max movement of 40px
                
                // Calculate direction (away from cursor)
                const angle = Math.atan2(-deltaY, -deltaX);
                const moveX = Math.cos(angle) * moveDistance;
                const moveY = Math.sin(angle) * moveDistance;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveDistance * 2}deg)`;
            } else {
                // Reset position when cursor is far away
                element.style.transform = '';
            }
        });
    });
    
    // Reset all positions when mouse leaves hero section
    heroSection.addEventListener('mouseleave', () => {
        floatingElements.forEach(element => {
            element.style.transform = '';
        });
    });
}

// Bubble Physics System
function initializeBubblePhysics() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create bubble container
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'physics-bubbles';
    bubbleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
    `;
    heroSection.appendChild(bubbleContainer);
    
    // Bubble physics properties
    let bubbles = [];
    let fragments = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Create initial bubbles
    function createBubble(x, y, size = 40) {
        const bubble = {
            element: document.createElement('div'),
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: size,
            life: 1,
            type: 'bubble'
        };
        
        bubble.element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.5));
            border-radius: 50%;
            border: none;
            backdrop-filter: blur(10px);
            box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.3), 0 4px 15px rgba(99, 102, 241, 0.3);
            opacity: 0.6;
            transition: none;
        `;
        
        bubbleContainer.appendChild(bubble.element);
        return bubble;
    }
    
    function createFragment(x, y) {
        const fragment = {
            element: document.createElement('div'),
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            size: Math.random() * 6 + 3,
            originalSize: Math.random() * 6 + 3,
            targetSize: Math.random() * 6 + 3,
            life: 1,
            coalescenceTimer: Math.random() * 120 + 180,
            growthPhase: 'initial',
            type: 'fragment'
        };
        
        fragment.targetSize = fragment.size;
        
        fragment.element.style.cssText = `
            position: absolute;
            width: ${fragment.size}px;
            height: ${fragment.size}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.7));
            border-radius: 50%;
            border: none;
            backdrop-filter: blur(5px);
            box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(99, 102, 241, 0.4);
            opacity: 0.7;
            transition: none;
        `;
        
        bubbleContainer.appendChild(fragment.element);
        return fragment;
    }
    
    // Initialize with 2 bubbles on each side
    // Right side bubbles (around profile)
    bubbles.push(createBubble(heroSection.offsetWidth * 0.7, heroSection.offsetHeight * 0.3, 45));
    bubbles.push(createBubble(heroSection.offsetWidth * 0.8, heroSection.offsetHeight * 0.7, 40));
    
    // Left side bubbles (around content)
    bubbles.push(createBubble(heroSection.offsetWidth * 0.2, heroSection.offsetHeight * 0.25, 42));
    bubbles.push(createBubble(heroSection.offsetWidth * 0.15, heroSection.offsetHeight * 0.65, 38));
    
    // Track mouse for interaction
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Collision detection
    function checkCollision(b1, b2) {
        const dx = b1.x - b2.x;
        const dy = b1.y - b2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (b1.size + b2.size) / 2;
    }
    
    // Create fragments from collision
    function explodeBubbles(b1, b2) {
        const centerX = (b1.x + b2.x) / 2;
        const centerY = (b1.y + b2.y) / 2;
        
        // Create 8-12 fragments
        const fragmentCount = Math.floor(Math.random() * 5) + 8;
        for (let i = 0; i < fragmentCount; i++) {
            fragments.push(createFragment(
                centerX + (Math.random() - 0.5) * 20,
                centerY + (Math.random() - 0.5) * 20
            ));
        }
        
        // Remove original bubbles
        bubbleContainer.removeChild(b1.element);
        bubbleContainer.removeChild(b2.element);
        bubbles = bubbles.filter(b => b !== b1 && b !== b2);
    }
    
    // Coalesce fragments into new bubbles
    function coalesceFragments() {
        if (fragments.length < 4) return;
        
        // Group fragments that are close together and ready
        const groups = [];
        const processed = new Set();
        
        fragments.forEach((frag, index) => {
            if (processed.has(index)) return;
            if (frag.coalescenceTimer > 0) return;
            
            const group = [index];
            processed.add(index);
            
            // Find nearby fragments that are also ready
            fragments.forEach((otherFrag, otherIndex) => {
                if (processed.has(otherIndex)) return;
                if (otherFrag.coalescenceTimer > 0) return;
                
                const dx = frag.x - otherFrag.x;
                const dy = frag.y - otherFrag.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Use size-based collision detection for grouping
                const collisionDistance = (frag.size + otherFrag.size) / 2 + 20;
                
                if (distance < collisionDistance) {
                    group.push(otherIndex);
                    processed.add(otherIndex);
                }
            });
            
            if (group.length >= 3) {
                groups.push(group);
            }
        });
        
        // Create new bubbles from groups (limit to 2 new bubbles)
        groups.slice(0, 2).forEach(group => {
            const centerX = group.reduce((sum, i) => sum + fragments[i].x, 0) / group.length;
            const centerY = group.reduce((sum, i) => sum + fragments[i].y, 0) / group.length;
            
            // New bubble size based on fragments that combined
            const totalMass = group.reduce((sum, i) => sum + (fragments[i].size * fragments[i].size), 0);
            const newSize = Math.min(55, Math.max(35, Math.sqrt(totalMass) * 1.2));
            
            bubbles.push(createBubble(centerX, centerY, newSize));
            
            // Remove fragments with visual effect
            group.forEach(i => {
                const fragment = fragments[i];
                // Quick shrink animation before removal
                fragment.element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                fragment.element.style.transform = 'scale(2)';
                fragment.element.style.opacity = '0';
                
                setTimeout(() => {
                    if (fragment.element.parentNode) {
                        bubbleContainer.removeChild(fragment.element);
                    }
                }, 300);
            });
        });
        
        // Remove processed fragments from array
        const toRemove = groups.flat().sort((a, b) => b - a);
        toRemove.forEach(index => {
            fragments.splice(index, 1);
        });
    }
    
    // Animation loop
    function animate() {
        const bounds = heroSection.getBoundingClientRect();
        
        // Update bubbles
        bubbles.forEach(bubble => {
            // Mouse interaction
            const dx = mouseX - bubble.x;
            const dy = mouseY - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                bubble.vx -= (dx / distance) * force * 0.5;
                bubble.vy -= (dy / distance) * force * 0.5;
            }
            
            // Natural movement
            bubble.vx += (Math.random() - 0.5) * 0.1;
            bubble.vy += (Math.random() - 0.5) * 0.1;
            
            // Velocity damping
            bubble.vx *= 0.98;
            bubble.vy *= 0.98;
            
            // Update position
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            
            // Boundary collision
            if (bubble.x < bubble.size/2) {
                bubble.x = bubble.size/2;
                bubble.vx *= -0.8;
            }
            if (bubble.x > bounds.width - bubble.size/2) {
                bubble.x = bounds.width - bubble.size/2;
                bubble.vx *= -0.8;
            }
            if (bubble.y < bubble.size/2) {
                bubble.y = bubble.size/2;
                bubble.vy *= -0.8;
            }
            if (bubble.y > bounds.height - bubble.size/2) {
                bubble.y = bounds.height - bubble.size/2;
                bubble.vy *= -0.8;
            }
            
            // Update DOM
            bubble.element.style.left = (bubble.x - bubble.size/2) + 'px';
            bubble.element.style.top = (bubble.y - bubble.size/2) + 'px';
        });
        
        // Update fragments
        fragments.forEach(fragment => {
            // Coalescence timer and growth phases
            fragment.coalescenceTimer--;
            
            if (fragment.coalescenceTimer > 100) {
                // Initial scatter phase - move away from collision point
                fragment.growthPhase = 'scatter';
                fragment.targetSize = fragment.originalSize;
            } else if (fragment.coalescenceTimer > 50) {
                // Floating phase - random movement
                fragment.growthPhase = 'floating';
                fragment.vx += (Math.random() - 0.5) * 0.3;
                fragment.vy += (Math.random() - 0.5) * 0.3;
                fragment.targetSize = fragment.originalSize * 1.2;
            } else if (fragment.coalescenceTimer > 0) {
                // Pre-coalescence phase - start growing and moving toward others
                fragment.growthPhase = 'approaching';
                fragment.targetSize = fragment.originalSize * 1.8;
            } else {
                // Ready for coalescence
                fragment.growthPhase = 'ready';
                fragment.targetSize = fragment.originalSize * 2.2;
            }
            
            // Smooth size transition
            const sizeDiff = fragment.targetSize - fragment.size;
            fragment.size += sizeDiff * 0.05;
            
            // Gravity towards other fragments (coalescence behavior)
            fragments.forEach(other => {
                if (fragment === other) return;
                
                const dx = other.x - fragment.x;
                const dy = other.y - fragment.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0 && distance < 100) {
                    if (fragment.coalescenceTimer <= 30 && other.coalescenceTimer <= 30) {
                        // Strong attraction when ready to coalesce
                        const force = 0.08;
                        fragment.vx += (dx / distance) * force;
                        fragment.vy += (dy / distance) * force;
                    } else if (fragment.coalescenceTimer <= 80 && other.coalescenceTimer <= 80) {
                        // Weak attraction during approach phase
                        const force = 0.02;
                        fragment.vx += (dx / distance) * force;
                        fragment.vy += (dy / distance) * force;
                    }
                }
            });
            
            // Add some random movement for natural floating
            if (fragment.growthPhase === 'floating' || fragment.growthPhase === 'approaching') {
                fragment.vx += (Math.random() - 0.5) * 0.2;
                fragment.vy += (Math.random() - 0.5) * 0.2;
            }
            
            // Velocity damping (less damping for more movement)
            fragment.vx *= 0.92;
            fragment.vy *= 0.92;
            
            // Update position
            fragment.x += fragment.vx;
            fragment.y += fragment.vy;
            
            // Boundary collision with bounce
            if (fragment.x < fragment.size/2) {
                fragment.x = fragment.size/2;
                fragment.vx *= -0.6;
            }
            if (fragment.x > bounds.width - fragment.size/2) {
                fragment.x = bounds.width - fragment.size/2;
                fragment.vx *= -0.6;
            }
            if (fragment.y < fragment.size/2) {
                fragment.y = fragment.size/2;
                fragment.vy *= -0.6;
            }
            if (fragment.y > bounds.height - fragment.size/2) {
                fragment.y = bounds.height - fragment.size/2;
                fragment.vy *= -0.6;
            }
            
            // Update DOM with new size
            fragment.element.style.width = fragment.size + 'px';
            fragment.element.style.height = fragment.size + 'px';
            fragment.element.style.left = (fragment.x - fragment.size/2) + 'px';
            fragment.element.style.top = (fragment.y - fragment.size/2) + 'px';
            
            // Update opacity based on growth phase
            const baseOpacity = 0.7;
            const growthOpacity = Math.min(1.0, baseOpacity + (fragment.size / fragment.originalSize - 1) * 0.3);
            fragment.element.style.opacity = growthOpacity;
        });
        
        // Check bubble collisions
        for (let i = 0; i < bubbles.length; i++) {
            for (let j = i + 1; j < bubbles.length; j++) {
                if (checkCollision(bubbles[i], bubbles[j])) {
                    explodeBubbles(bubbles[i], bubbles[j]);
                    break;
                }
            }
        }
        
        // Try to coalesce fragments into exactly 2 bubbles
        if (Math.random() < 0.02) {
            coalesceFragments();
        }
        
        // Ensure we always have some bubbles
        if (bubbles.length === 0 && fragments.length < 3) {
            setTimeout(() => {
                // Respawn bubbles on both sides
                bubbles.push(createBubble(bounds.width * 0.7, bounds.height * 0.3, 45));
                bubbles.push(createBubble(bounds.width * 0.8, bounds.height * 0.7, 40));
                bubbles.push(createBubble(bounds.width * 0.2, bounds.height * 0.25, 42));
                bubbles.push(createBubble(bounds.width * 0.15, bounds.height * 0.65, 38));
            }, 2000);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Intersection Observer for better performance
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Lazy loading for images
const imageObserver = createObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Apply lazy loading to images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Service cards hover effect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Error handling for failed operations
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Handle visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        } else {
            // Swipe right - could open menu or navigate
            // Implementation depends on requirements
        }
    }
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Console welcome message
console.log(`
%c🚀 Portfolio Website Loaded Successfully! 
%cBuilt with ❤️ using vanilla JavaScript, CSS, and HTML
%cFeatures: Dark/Light mode, Responsive design, Smooth animations
`, 
'color: #6366f1; font-size: 16px; font-weight: bold;',
'color: #10b981; font-size: 12px;',
'color: #6b7280; font-size: 10px;'
);