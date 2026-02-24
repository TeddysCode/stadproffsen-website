/* ===================================================
   Städproffsen i Skåne AB — JavaScript
   Handles: Navbar scroll, Mobile menu, FAQ accordion,
   Sticky CTA, Scroll reveal animations
   =================================================== */

(function () {
    'use strict';

    // ───── DOM REFERENCES ─────
    const navbar = document.getElementById('navbar');
    const stickyCta = document.getElementById('stickyCta');
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const revealElements = document.querySelectorAll('.reveal');
    const mobileLinks = document.querySelectorAll('#mobileMenu a');

    // ───── NAVBAR SCROLL EFFECT ─────
    function handleScroll() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);

        // Show/hide sticky CTA
        if (stickyCta) {
            stickyCta.classList.toggle('visible', window.scrollY > 500);
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on load in case the page is already scrolled
    handleScroll();

    // ───── MOBILE MENU ─────
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('open');
            mobileBtn.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
            mobileBtn.textContent = isOpen ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                mobileBtn.setAttribute('aria-label', 'Öppna meny');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // ───── FAQ ACCORDION ─────
    faqQuestions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(function (faq) {
                faq.classList.remove('open');
            });

            // If this one wasn't open, open it
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });

    // ───── SCROLL REVEAL (Intersection Observer) ─────
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -60px 0px',
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: just show everything
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ───── SMOOTH SCROLL for anchor links ─────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 16;
                var targetPosition =
                    targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ───── CONTACT FORM HANDLER ─────
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = contactForm.querySelector('.btn-submit');
            var originalText = submitBtn.innerHTML;

            // Simple loading state
            submitBtn.innerHTML = 'Skickar... ⏳';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate form submission (replace with real endpoint)
            setTimeout(function () {
                submitBtn.innerHTML = 'Skickat! ✓';
                submitBtn.style.background = '#4CAF50';

                // Reset after 3 seconds
                setTimeout(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ───── CALLBACK FORM HANDLER ─────
    var callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', function () {
            var input = document.getElementById('callbackInput');
            if (input && input.value.trim()) {
                var originalText = callbackBtn.textContent;
                callbackBtn.textContent = 'Tack! ✓';
                callbackBtn.style.background = '#4CAF50';

                setTimeout(function () {
                    callbackBtn.textContent = originalText;
                    callbackBtn.style.background = '';
                    input.value = '';
                }, 3000);
            } else if (input) {
                input.style.borderColor = '#e74c3c';
                input.focus();
                setTimeout(function () {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // ───── NAVBAR ACTIVE LINK HIGHLIGHTING ─────
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    function highlightNav() {
        var scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            navLinks.forEach(function (link) {
                if (
                    link.getAttribute('href') === '#' + id &&
                    scrollPos >= top &&
                    scrollPos < bottom
                ) {
                    link.style.color = '';
                    link.style.fontWeight = '700';
                } else {
                    link.style.fontWeight = '';
                }
            });
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

})();
