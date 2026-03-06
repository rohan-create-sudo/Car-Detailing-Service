/**
 * CARS TOWN — Premium Car Detailing Website
 * script.js — Main JavaScript (Redesigned)
 */
'use strict';

/* ============================================================
   LOADER
   ============================================================ */
document.body.classList.add('no-scroll');

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.body.classList.remove('no-scroll');
        initAOS();
        initCounters();
    }, 3700);
});

function initAOS() {
    if (window.AOS) {
        AOS.init({ duration: 750, easing: 'ease-out-quart', once: true, offset: 70 });
    }
}

/* ============================================================
   PARTICLES
   ============================================================ */
(function spawnParticles() {
    const c = document.getElementById('particles-container');
    if (!c) return;
    const n = window.innerWidth > 768 ? 28 : 12;
    const colors = ['#c8102e', '#e8294a', '#1a6fff', '#05b07a'];
    for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const s = Math.random() * 2.5 + 1;
        const col = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${s}px; height:${s}px;
      background:${col};
      box-shadow:0 0 5px ${col};
      animation-duration:${Math.random() * 20 + 12}s;
      animation-delay:${Math.random() * 14}s;
    `;
        c.appendChild(p);
    }
})();

/* ============================================================
   NAVBAR
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

const openMob = () => { mobMenu.classList.add('open'); hamburger.classList.add('active'); document.body.classList.add('no-scroll'); };
const closeMob = () => { mobMenu.classList.remove('open'); hamburger.classList.remove('active'); document.body.classList.remove('no-scroll'); };

hamburger.addEventListener('click', openMob);
mobClose.addEventListener('click', closeMob);
document.querySelectorAll('.mob-link, .mob-cta').forEach(l => l.addEventListener('click', closeMob));

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 78, behavior: 'smooth' }); }
    });
});

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounters() {
    const els = document.querySelectorAll('.wval[data-count]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
        });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
}

function countUp(el) {
    const end = +el.dataset.count;
    const dur = 1600;
    const inc = Math.ceil(dur / end);
    let cur = 0;
    const t = setInterval(() => { cur++; el.textContent = cur; if (cur >= end) clearInterval(t); }, inc);
}

/* ============================================================
   GALLERY FILTER
   ============================================================ */
const fBtns = document.querySelectorAll('.f-btn');
const gItems = document.querySelectorAll('.gal-item');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const fil = btn.dataset.filter;
        gItems.forEach(item => {
            const show = fil === 'all' || item.dataset.category === fil;
            if (show) {
                item.style.display = '';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.92)';
                requestAnimationFrame(() => {
                    item.style.transition = 'opacity .4s, transform .4s';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
            } else {
                item.style.transition = 'opacity .28s';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.92)';
                setTimeout(() => { item.style.display = 'none'; }, 290);
            }
        });
    });
});

/* ============================================================
   LIGHTBOX
   ============================================================ */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbSrcs = [...gItems].map(i => ({ src: i.querySelector('img').src, alt: i.querySelector('img').alt }));
let lbIdx = 0;

gItems.forEach((item, i) => item.addEventListener('click', () => { lbIdx = i; lbOpen(i); }));

function lbOpen(i) { lbImg.src = lbSrcs[i].src; lbImg.alt = lbSrcs[i].alt; lightbox.classList.add('open'); document.body.classList.add('no-scroll'); }
function lbCloseF() { lightbox.classList.remove('open'); document.body.classList.remove('no-scroll'); }

lbClose.addEventListener('click', lbCloseF);
lightbox.addEventListener('click', e => { if (e.target === lightbox) lbCloseF(); });
lbPrev.addEventListener('click', () => { lbIdx = (lbIdx - 1 + lbSrcs.length) % lbSrcs.length; lbOpen(lbIdx); });
lbNext.addEventListener('click', () => { lbIdx = (lbIdx + 1) % lbSrcs.length; lbOpen(lbIdx); });
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lbCloseF();
    if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + lbSrcs.length) % lbSrcs.length; lbOpen(lbIdx); }
    if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbSrcs.length; lbOpen(lbIdx); }
});

/* ============================================================
   BEFORE / AFTER SLIDER
   ============================================================ */
const baSlider = document.getElementById('baSlider');
const baBefore = document.getElementById('baBefore');
const baHandle = document.getElementById('baHandle');
let baDrag = false;

function baPos(e) {
    const r = baSlider.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.max(0, Math.min(((cx - r.left) / r.width) * 100, 100));
}
function baDo(p) { baBefore.style.width = p + '%'; baHandle.style.left = p + '%'; }

if (baSlider) {
    baSlider.addEventListener('mousedown', e => { baDrag = true; baDo(baPos(e)); });
    window.addEventListener('mousemove', e => { if (baDrag) baDo(baPos(e)); });
    window.addEventListener('mouseup', () => { baDrag = false; });
    baSlider.addEventListener('touchstart', e => { baDrag = true; baDo(baPos(e)); }, { passive: true });
    window.addEventListener('touchmove', e => { if (baDrag) baDo(baPos(e)); }, { passive: true });
    window.addEventListener('touchend', () => { baDrag = false; });
}

/* ============================================================
   REVIEWS SLIDER
   ============================================================ */
const rvTrack = document.getElementById('rvTrack');
const rvDots = document.getElementById('rvDots');
const rvPrev = document.getElementById('rvPrev');
const rvNext = document.getElementById('rvNext');

let rvIdx = 0, rvPer = 3, rvTotal = 0, rvAuto;
let rvDragStart = 0, rvDragging = false;

function rvCalc() {
    rvPer = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3;
    rvTotal = Math.ceil(rvTrack.querySelectorAll('.rv-card').length / rvPer);
    buildDots();
    rvGo(0);
}

function buildDots() {
    rvDots.innerHTML = '';
    for (let i = 0; i < rvTotal; i++) {
        const d = document.createElement('div');
        d.className = 'rv-dot' + (i === 0 ? ' active' : '');
        d.onclick = () => rvGo(i);
        rvDots.appendChild(d);
    }
}

function rvGo(i) {
    rvIdx = Math.max(0, Math.min(i, rvTotal - 1));
    const cards = rvTrack.querySelectorAll('.rv-card');
    const w = cards[0] ? cards[0].offsetWidth + 18 : 0;
    rvTrack.style.transform = `translateX(-${rvIdx * rvPer * w}px)`;
    document.querySelectorAll('.rv-dot').forEach((d, j) => d.classList.toggle('active', j === rvIdx));
}

rvPrev.onclick = () => { rvGo(rvIdx - 1); resetAuto(); };
rvNext.onclick = () => { rvGo(rvIdx + 1); resetAuto(); };

function startAuto() { rvAuto = setInterval(() => rvGo((rvIdx + 1) % rvTotal), 4800); }
function resetAuto() { clearInterval(rvAuto); startAuto(); }

rvTrack.addEventListener('touchstart', e => { rvDragging = true; rvDragStart = e.touches[0].clientX; }, { passive: true });
rvTrack.addEventListener('touchend', e => {
    if (!rvDragging) return;
    const d = e.changedTouches[0].clientX - rvDragStart;
    if (Math.abs(d) > 48) rvGo(d < 0 ? rvIdx + 1 : rvIdx - 1);
    rvDragging = false; resetAuto();
});

rvCalc();
startAuto();
window.addEventListener('resize', rvCalc);

/* ============================================================
   CONTACT FORM
   ============================================================ */
const cForm = document.getElementById('contactForm');
const cBtn = document.getElementById('formBtn');

if (cForm) {
    cForm.addEventListener('submit', e => {
        e.preventDefault();
        const bt = cBtn.querySelector('.bt');
        const bi = cBtn.querySelector('.bi');
        const bs = cBtn.querySelector('.bs');
        cBtn.disabled = true;
        bt.style.display = 'none'; bi.style.display = 'none';
        bs.style.display = 'inline-flex';
        cBtn.style.background = 'linear-gradient(135deg,#05b07a,#07d494)';
        setTimeout(() => {
            bt.style.display = ''; bi.style.display = '';
            bs.style.display = 'none'; cBtn.style.background = '';
            cBtn.disabled = false; cForm.reset();
        }, 3000);
    });
}

/* ============================================================
   GSAP — Parallax & Organic Animations
   ============================================================ */
if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero bg subtle parallax
    gsap.to('.hero-bg', {
        yPercent: 22, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });

    // Floating icons
    gsap.to('.fl-1', { y: -24, rotation: 8, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.fl-2', { y: -18, rotation: -6, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 });
    gsap.to('.fl-3', { y: -28, rotation: 5, duration: 6.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });

    // Service cards — stagger on scroll
    gsap.utils.toArray('.svc-card').forEach((c, i) => {
        gsap.fromTo(c, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, duration: .65, delay: i * .06, ease: 'power2.out',
            scrollTrigger: { trigger: c, start: 'top 90%', once: true }
        });
    });

    // Feature items slide-in
    gsap.utils.toArray('.feat').forEach((f, i) => {
        gsap.fromTo(f, { opacity: 0, x: -22 }, {
            opacity: 1, x: 0, duration: .55, delay: i * .1, ease: 'power2.out',
            scrollTrigger: { trigger: f, start: 'top 90%', once: true }
        });
    });
}

/* ============================================================
   SERVICE CARD MOUSE SHIMMER
   ============================================================ */
document.querySelectorAll('.svc-card').forEach(card => {
    const shimmer = card.querySelector('.svc-shimmer');
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        if (shimmer) shimmer.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(26,111,255,.1) 0%, transparent 65%)`;
    });
    card.addEventListener('mouseleave', () => {
        if (shimmer) shimmer.style.background = '';
    });
});

/* ============================================================
   HERO GLOW FOLLOW
   ============================================================ */
const hero = document.querySelector('.hero');
if (hero) {
    const g = document.createElement('div');
    g.style.cssText = 'position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(200,16,46,.1) 0%,transparent 70%);pointer-events:none;z-index:1;opacity:0;transition:opacity .4s';
    hero.appendChild(g);
    hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        g.style.left = (e.clientX - r.left - 160) + 'px';
        g.style.top = (e.clientY - r.top - 160) + 'px';
        g.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => { g.style.opacity = '0'; });
}

/* ============================================================
   RIPPLE ON BUTTONS
   ============================================================ */
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rpl = document.createElement('span');
        const rect = this.getBoundingClientRect();
        rpl.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      background:rgba(255,255,255,.25);
      width:80px; height:80px;
      left:${e.clientX - rect.left - 40}px;
      top:${e.clientY - rect.top - 40}px;
      transform:scale(0); animation:rpl .5s ease forwards;
    `;
        if (!document.head.querySelector('#rplStyle')) {
            const s = document.createElement('style');
            s.id = 'rplStyle'; s.textContent = '@keyframes rpl{to{transform:scale(4);opacity:0}}';
            document.head.appendChild(s);
        }
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(rpl);
        setTimeout(() => rpl.remove(), 500);
    });
});

/* ============================================================
   LOGO & BACK-TO-TOP
   ============================================================ */
document.querySelector('.nav-logo')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('backTop')?.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
