/**
 * CARS TOWN — Loader Animation Controller
 * animations/loader.js
 *
 * This file is reserved for extending loader & intro animations.
 * Core loader logic lives in script.js.
 * GSAP-powered premium animations can be added here.
 */

'use strict';

// Note: This module is loaded after script.js.
// Any GSAP timeline enhancements go here.

if (window.gsap) {
    const tl = gsap.timeline({ delay: 0.2 });

    // Subtle shimmer on loader logo
    tl.to('.loader-logo', {
        textShadow: '0 0 30px rgba(0,212,255,0.8)',
        duration: 0.6,
        repeat: 2,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
    });
}
