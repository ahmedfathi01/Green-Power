/**
 * Green Power - Main JavaScript File
 * -----------------------------------
 * Modern, interactive functionality for Green Power website
 * تأثيرات حديثة ومتطورة للموقع
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50
    });

    // Navbar Color Change on Scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Run on page load
    updateNavbar();

    // Listen for scroll
    window.addEventListener('scroll', updateNavbar);

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar links smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            if (this.getAttribute('href') !== '#') {
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close navbar collapse on mobile
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${current}`) {
                navLink.classList.add('active');
            }
        });
    });

    // Animated counter for stat values in hero
    const animateCounter = (element, targetValue) => {
        let currentValue = 0;
        const duration = 1500; // Total animation time in ms
        const steps = 50; // Total number of steps
        const stepTime = duration / steps;
        const increment = targetValue / steps;

        const counter = setInterval(() => {
            currentValue += increment;

            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, stepTime);
    };

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElements = document.querySelectorAll('.counter');
                counterElements.forEach(counter => {
                    const targetValue = parseInt(counter.textContent);
                    animateCounter(counter, targetValue);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // Hero particles animation (modern effect)
    const createParticles = () => {
        const particles = document.querySelector('.hero-particles');
        if (!particles) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Randomize particle properties
            const size = Math.random() * 10 + 3; // 3-13px
            const posX = Math.random() * 100; // 0-100%
            const posY = Math.random() * 100; // 0-100%
            const duration = Math.random() * 20 + 10; // 10-30s
            const delay = Math.random() * 5; // 0-5s

            // Apply random styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particles.appendChild(particle);
        }
    };

    // Create floating particles in hero section
    createParticles();

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea, select');

            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                // For demonstration, we'll just show a success message
                const formElements = contactForm.querySelector('.row');
                formElements.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i>
                            تم إرسال رسالتك بنجاح! سيتم التواصل معك قريبًا.
                        </div>
                    </div>
                `;
            }
        });

        // Remove invalid class on input
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('is-invalid');
                }
            });
        });
    }

    // Hero image float animation effect
    const heroImageAnimation = () => {
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (!heroImage) return;

        let yPosition = 0;
        let direction = 1; // 1 for up, -1 for down

        setInterval(() => {
            yPosition += 0.2 * direction;

            if (yPosition >= 15) {
                direction = -1;
            } else if (yPosition <= 0) {
                direction = 1;
            }

            heroImage.style.transform = `translateY(${yPosition}px)`;
        }, 50);
    };

    // Initialize hero image animation
    heroImageAnimation();

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.2;
                document.querySelector('.hero-background-wrapper').style.transform = `translateY(${translateY}px)`;
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
                // Here you would typically send the email to a server
                // For demonstration, we'll just update the form
                const formGroup = newsletterForm.querySelector('.input-group');
                formGroup.innerHTML = `
                    <div class="alert alert-success m-0 w-100">
                        <i class="fas fa-check-circle me-2"></i>
                        تم تسجيلك بنجاح في النشرة البريدية!
                    </div>
                `;
            } else {
                emailInput.classList.add('is-invalid');
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // RTL language support enhancement
    document.body.setAttribute('dir', 'rtl');

    // Add hover effect to buttons
    const addButtonHoverEffects = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '';
            });
        });
    };

    // Initialize button hover effects
    addButtonHoverEffects();

    // Add animation to footer social icons
    const socialLinks = document.querySelectorAll('.social-link-2');
    if (socialLinks.length) {
        socialLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;

            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) rotate(10deg)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) rotate(0)';
            });
        });
    }

    // Add page load animation
    const pageLoadAnimation = () => {
        document.body.classList.add('page-loaded');

        // Animate navbar elements
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });

        // Animate hero content with delay
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 300);

        // Animate hero image with delay
        setTimeout(() => {
            const heroImage = document.querySelector('.hero-image-wrapper');
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }
        }, 600);
    };

    // Run page load animation
    setTimeout(pageLoadAnimation, 200);

    // 3D Card Rotation Effect for Service Cards - Futuristic 2025 Effect
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            // 3D tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                // Calculate rotation based on mouse position
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Calculate rotation angle (limited to small range for subtle effect)
                const rotateY = ((mouseX - cardCenterX) / 25);
                const rotateX = -((mouseY - cardCenterY) / 25);

                // Apply rotation transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Add a subtle shadow effect based on rotation
                const shadowX = rotateY / 2;
                const shadowY = rotateX / 2;
                card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.1)`;

                // Add a subtle light reflection effect
                const glareX = ((mouseX - cardCenterX) / cardRect.width) * 100 + 50;
                const glareY = ((mouseY - cardCenterY) / cardRect.height) * 100 + 50;

                // Get the after element
                const afterElement = card.querySelector('::after');
                if (afterElement) {
                    afterElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 80%)`;
                }
            });

            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });

            // Interactive click effect
            card.addEventListener('click', () => {
                // Short press effect
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }

    // Animated particles for service hero section
    const createServiceParticles = () => {
        const servicesHero = document.querySelector('.services-hero');
        if (!servicesHero) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('service-particle');

            // Randomize particle properties
            const size = Math.random() * 6 + 2; // 2-8px
            const posX = Math.random() * 100; // 0-100%
            const posY = Math.random() * 100; // 0-100%
            const delay = Math.random() * 4; // 0-4s
            const duration = Math.random() * 10 + 8; // 8-18s

            // Apply random styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            // Append to the services hero
            servicesHero.appendChild(particle);
        }
    };

    // Initialize service particles if on services page
    if (document.querySelector('.services-hero')) {
        createServiceParticles();
    }

    // Process timeline animation for services page
    const animateProcessTimeline = () => {
        const processItems = document.querySelectorAll('.process-item');
        if (processItems.length === 0) return;

        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 200); // Staggered animation

                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        processItems.forEach(item => {
            processObserver.observe(item);
        });
    };

    // Initialize process timeline animation if on services page
    if (document.querySelector('.process-timeline')) {
        animateProcessTimeline();
    }

    // Modern Products Section Interactions
    const initProductsInteractions = () => {
        const productItems = document.querySelectorAll('.product-item');
        if (productItems.length === 0) return;

        productItems.forEach((item, index) => {
            const productContent = item.querySelector('.product-content');
            const productImage = item.querySelector('.product-image');
            const productBadge = item.querySelector('.product-badge');

            if (!productContent) return;

            // 3D tilt effect on mouse move
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Calculate rotation angles (subtle effect)
                const rotateY = ((mouseX - centerX) / 30);
                const rotateX = -((mouseY - centerY) / 30);

                // Apply 3D transform
                productContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Parallax effect for image
                if (productImage) {
                    const moveX = (mouseX - centerX) / 20;
                    const moveY = (mouseY - centerY) / 20;
                    productImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }

                // Badge animation
                if (productBadge) {
                    productBadge.style.transform = `translate(-50%, -50%) scale(1.1) rotate(${rotateY / 2}deg)`;
                }
            });

            // Reset transforms on mouse leave
            item.addEventListener('mouseleave', () => {
                productContent.style.transform = '';
                if (productImage) {
                    productImage.style.transform = '';
                }
                if (productBadge) {
                    productBadge.style.transform = '';
                }
            });

            // Click animation
            item.addEventListener('click', () => {
                productContent.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    productContent.style.transform = '';
                }, 150);
            });
        });

        // Parallax effect for product numbers
        const handleProductParallax = () => {
            const productNumbers = document.querySelectorAll('.product-number');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            productNumbers.forEach((number, index) => {
                const speed = 0.3 + (index * 0.1);
                number.style.transform = `translateY(${rate * speed}px)`;
            });
        };

        // Throttled scroll handler for performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleProductParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler);
    };

    // Initialize products interactions
    initProductsInteractions();

    // Enhanced product features animation
    const animateProductFeatures = () => {
        const productItems = document.querySelectorAll('.product-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const features = entry.target.querySelectorAll('.product-features-list li');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        productItems.forEach(item => {
            const features = item.querySelectorAll('.product-features-list li');
            features.forEach(feature => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(20px)';
                feature.style.transition = 'all 0.4s ease';
            });
            observer.observe(item);
        });
    };

    // Initialize feature animations
    animateProductFeatures();
});