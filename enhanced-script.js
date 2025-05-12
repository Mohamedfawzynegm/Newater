document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.getElementById('navbar');
    const body = document.body;

    // Initialize mobile menu state
    let isMenuOpen = false;

    function toggleMenu(show) {
        isMenuOpen = show;
        if (show) {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
            mobileMenuBtn.querySelector('i').classList.remove('fa-bars');
            mobileMenuBtn.querySelector('i').classList.add('fa-times');
        } else {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    }

    // Toggle menu on mobile menu button click
    mobileMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(!isMenuOpen);
    });

    // Handle close button click
    const closeBtn = document.querySelector('.close-menu');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Close button clicked');
            toggleMenu(false);
        });
    }

    // Close menu when clicking on links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu(false);
        }
    });

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Debugging: Ensure scroll-indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const rect = scrollIndicator.getBoundingClientRect();
            console.log('Scroll Indicator Position:', rect);

            // Ensure visibility
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                console.warn('Scroll Indicator is out of view.');
            }
        });
    }

    // Debugging: Log visibility of sections
    const sections = ['team', 'why-us', 'technologies'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            console.log(`${sectionId} section position:`, rect);
            if (rect.height === 0 || rect.width === 0) {
                console.warn(`${sectionId} section is not visible.`);
            }
        } else {
            console.error(`${sectionId} section not found.`);
        }
    });

    // Fallback: Ensure all sections are visible after a delay
    setTimeout(() => {
        const sections = document.querySelectorAll('.team-section, .why-us-section, .technologies-section');
        sections.forEach(section => {
            if (!section.classList.contains('revealed')) { // Skip if already revealed
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                console.log(`Fallback: Ensured visibility of section: ${section.className}`);
            }
        });
    }, 2000);

    // Guide tab functionality with accessibility improvements
    const guideTabs = document.querySelectorAll('.guide-tab');
    const guidePanels = document.querySelectorAll('.guide-panel');

    function showPanel(panelId) {
        guidePanels.forEach(panel => {
            if (panel.id === panelId) {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    }

    if (guideTabs.length > 0) {
        guideTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Update tab states
                guideTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });

                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // Show corresponding panel
                const panelId = this.getAttribute('data-tab');
                showPanel(panelId);
            });
        });

        // Show initial panel
        showPanel('installation');
    }

    // Form validation enhancement
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        // Basic validation - can be expanded for region-specific formats
        return phone.length >= 10 && /^[0-9+\-\s()]*$/.test(phone);
    }

    // Purchase form submission handling with enhanced validation
    const purchaseForm = document.getElementById('purchase-form');
    if (purchaseForm) {
        const formInputs = purchaseForm.querySelectorAll('input, textarea');

        // Add validation feedback on input
        formInputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');

                    // Create error message if it doesn't exist
                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                    input.classList.add('error');

                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Please enter a valid email address';
                } else if (input.id === 'phone' && input.value && !validatePhone(input.value)) {
                    input.classList.add('error');

                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Please enter a valid phone number';
                } else {
                    input.classList.remove('error');
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }
                }
            });

            // Clear error on input
            input.addEventListener('input', function () {
                if (input.classList.contains('error')) {
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }

                    if (input.value.trim() ||
                        (input.type === 'email' && validateEmail(input.value)) ||
                        (input.id === 'phone' && validatePhone(input.value))) {
                        input.classList.remove('error');
                    }
                }
            });
        });

        purchaseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Enhanced validation
            let hasErrors = false;

            formInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');
                    hasErrors = true;

                    // Create error message if it doesn't exist
                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                }
            });

            const email = document.getElementById('email').value;
            if (email && !validateEmail(email)) {
                document.getElementById('email').classList.add('error');
                hasErrors = true;

                let errorMsg = document.getElementById('email').parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginTop = '5px';
                    document.getElementById('email').parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please enter a valid email address';
            }

            const phone = document.getElementById('phone').value;
            if (phone && !validatePhone(phone)) {
                document.getElementById('phone').classList.add('error');
                hasErrors = true;

                let errorMsg = document.getElementById('phone').parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginTop = '5px';
                    document.getElementById('phone').parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please enter a valid phone number';
            }

            if (hasErrors) {
                return;
            }

            // Submit form if validation passes
            purchaseForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h3>Order Submitted!</h3>
                    <p>Thank you for your order. We'll contact you shortly with further details.</p>
                </div>
            `;
        });
    }

    // Contact form submission with enhanced validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const contactInputs = contactForm.querySelectorAll('input, textarea');

        // Add validation feedback on input
        contactInputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');

                    // Create error message if it doesn't exist
                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                    input.classList.add('error');

                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Please enter a valid email address';
                } else {
                    input.classList.remove('error');
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }
                }
            });

            // Clear error on input
            input.addEventListener('input', function () {
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Enhanced validation
            let hasErrors = false;

            contactInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');
                    hasErrors = true;

                    // Create error message if it doesn't exist
                    let errorMsg = input.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                }
            });

            const contactEmail = document.getElementById('contact-email').value;
            if (contactEmail && !validateEmail(contactEmail)) {
                document.getElementById('contact-email').classList.add('error');
                hasErrors = true;

                let errorMsg = document.getElementById('contact-email').parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginTop = '5px';
                    document.getElementById('contact-email').parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please enter a valid email address';
            }

            if (hasErrors) {
                return;
            }

            // Submit form if validation passes
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                </div>
            `;
        });
    }

    // Enhanced hotspot functionality
    const hotspots = document.querySelectorAll('.hotspot');
    const modelContainer = document.querySelector('.model-container');

    hotspots.forEach(hotspot => {
        // Desktop interaction
        hotspot.addEventListener('mouseenter', () => {
            hotspot.querySelector('.hotspot-dot').style.transform = 'scale(1.5)';
            hotspot.querySelector('.hotspot-label').style.opacity = '1';
            hotspot.querySelector('.hotspot-label').style.visibility = 'visible';
        });

        hotspot.addEventListener('mouseleave', () => {
            hotspot.querySelector('.hotspot-dot').style.transform = 'scale(1)';
            hotspot.querySelector('.hotspot-label').style.opacity = '0';
            hotspot.querySelector('.hotspot-label').style.visibility = 'hidden';
        });

        // Mobile interaction (touch)
        hotspot.addEventListener('touchstart', (e) => {
            e.preventDefault();

            // Hide all other hotspot labels first
            hotspots.forEach(h => {
                if (h !== hotspot) {
                    h.querySelector('.hotspot-dot').style.transform = 'scale(1)';
                    h.querySelector('.hotspot-label').style.opacity = '0';
                    h.querySelector('.hotspot-label').style.visibility = 'hidden';
                }
            });

            // Toggle current hotspot
            const dot = hotspot.querySelector('.hotspot-dot');
            const label = hotspot.querySelector('.hotspot-label');

            if (label.style.visibility === 'visible') {
                dot.style.transform = 'scale(1)';
                label.style.opacity = '0';
                label.style.visibility = 'hidden';
            } else {
                dot.style.transform = 'scale(1.5)';
                label.style.opacity = '1';
                label.style.visibility = 'visible';
            }
        });
    });

    // Close hotspot labels when clicking elsewhere on the model
    if (modelContainer) {
        modelContainer.addEventListener('click', (e) => {
            if (!e.target.closest('.hotspot')) {
                hotspots.forEach(hotspot => {
                    hotspot.querySelector('.hotspot-dot').style.transform = 'scale(1)';
                    hotspot.querySelector('.hotspot-label').style.opacity = '0';
                    hotspot.querySelector('.hotspot-label').style.visibility = 'hidden';
                });
            }
        });
    }

    // Removed IntersectionObserver logic to make sections always visible
    const alwaysVisibleSections = document.querySelectorAll('.team-section, .why-us-section, .technologies-section');
    alwaysVisibleSections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        console.log(`Ensured visibility of section: ${section.className}`);
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return; // Skip empty links

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = navbar.offsetHeight;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add responsive image handling
    function handleResponsiveImages() {
        const productImages = document.querySelectorAll('.product-image img, .real-image');

        if (window.innerWidth < 768) {
            productImages.forEach(img => {
                img.setAttribute('loading', 'lazy');

                // Set max width for mobile to prevent overflow
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            });
        }
    }

    // Run on page load and resize
    handleResponsiveImages();
    window.addEventListener('resize', handleResponsiveImages);

    // Handle initial page load state
    window.dispatchEvent(new Event('resize'));
});