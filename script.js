// ========== THEME SWITCHER ==========
const themeToggle = document.getElementById('themeToggle');
const themePanel = document.getElementById('themePanel');
const themeOpts = document.querySelectorAll('.theme-opt');

function applyTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('phany-theme', name);
    themeOpts.forEach(o => o.classList.toggle('active', o.dataset.themeName === name));
}

if (themeToggle && themePanel) {
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themePanel.classList.toggle('open');
    });

    themeOpts.forEach(o => o.addEventListener('click', () => {
        applyTheme(o.dataset.themeName);
        themePanel.classList.remove('open');
    }));

    document.addEventListener('click', (e) => {
        if (!themePanel.contains(e.target) && !themeToggle.contains(e.target)) {
            themePanel.classList.remove('open');
        }
    });
}

const savedTheme = localStorage.getItem('phany-theme');
if (savedTheme) applyTheme(savedTheme);

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => nav.classList.remove('open'));
    });
}

// ========== SCROLLSPY: highlight active menu item ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNav a');

function setActive() {
    const pos = window.scrollY + 140;
    let current = 'home';
    sections.forEach(sec => {
        if (pos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);
setActive();

// ========== SKILL BARS: animate when visible ==========
const skillBars = document.querySelectorAll('.bar span');

const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width') || '0';
            entry.target.style.width = width;
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

skillBars.forEach(bar => barObserver.observe(bar));

// ========== ABOUT STATS: count up when visible ==========
const statEls = document.querySelectorAll('.stat h3');

const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'), 10) || 0;
            let current = 0;
            const step = Math.max(1, Math.round(target / 60));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = current;
            }, 16);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statEls.forEach(el => countObserver.observe(el));

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ========== DALALI PREVIEW MODAL ==========
const dalaliCard = document.getElementById('dalaliCard');
const previewModal = document.getElementById('previewModal');
const modalClose = document.getElementById('modalClose');

if (dalaliCard && previewModal) {
    dalaliCard.addEventListener('click', () => {
        previewModal.classList.add('open');
    });
    modalClose.addEventListener('click', () => {
        previewModal.classList.remove('open');
    });
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.classList.remove('open');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            previewModal.classList.remove('open');
        }
    });
}

// ========== YEAR ==========
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
