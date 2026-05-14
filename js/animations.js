/**
 * CRAFTED MATRIX - Animation & Interaction Library
 * Handles scroll animations, counters, and interactive effects
 */

(function() {
  'use strict';

  // ============================================
  // Scroll Animation Observer
  // ============================================
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Handle stagger children
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 80}ms`;
          });
        }
        
        // Trigger counter animation if present
        const counters = entry.target.querySelectorAll('.counter[data-target]');
        counters.forEach(counter => animateCounter(counter));
        
        // Unobserve after animation (optional - remove for repeat animations)
        // animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Initialize scroll animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .stagger-children, .fade-in-left, .fade-in-right, .fade-in-scale'
    );
    
    animatedElements.forEach(el => animationObserver.observe(el));
  }

  // ============================================
  // Counter Animation
  // ============================================
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
      
      counter.textContent = prefix + currentValue.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  function initNavbarScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add shadow on scroll
      if (currentScroll > 50) {
        nav.classList.add('shadow-lg');
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        nav.classList.remove('shadow-lg');
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
      }
      
      // Hide/show on scroll direction
      if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
    
    // Smooth transition for navbar
    nav.style.transition = 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
  }

  // ============================================
  // Parallax Effect for Hero
  // ============================================
  function initParallax() {
    const heroGlow = document.querySelector('.hero-bg-glow');
    if (!heroGlow) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroGlow.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

  // ============================================
  // Magnetic Button Effect
  // ============================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============================================
  // Typewriter Effect
  // ============================================
  function initTypewriter() {
    const elements = document.querySelectorAll('.typewriter');
    
    elements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid currentColor';
      
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50 + Math.random() * 50);
        } else {
          el.style.borderRight = 'none';
        }
      };
      
      // Start when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(el);
          }
        });
      });
      
      observer.observe(el);
    });
  }

  // ============================================
  // Reveal on Scroll (for elements without classes)
  // ============================================
  function initRevealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => revealObserver.observe(el));
  }

  // ============================================
  // Performance: Disable animations on touch devices
  // ============================================
  function checkTouchDevice() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      document.body.classList.add('touch-device');
    }
  }

  // ============================================
  // Initialize Everything
  // ============================================
  function init() {
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
    initParallax();
    initMagneticButtons();
    initTypewriter();
    initRevealOnScroll();
    checkTouchDevice();
    
    console.log('🎨 Crafted Matrix animations initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize for dynamically added content
  window.CraftedMatrix = {
    refreshAnimations: initScrollAnimations,
    animateCounter: animateCounter
  };

})();
