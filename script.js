// ========== LOADER: typing + progress ==========
const loader = document.getElementById('loader');
const typingEl = document.getElementById('typing');

const bootLines = [
    '> Initializing system...',
    '> Loading modules ............ OK',
    '> Establishing secure link ... OK',
    '> Rendering interface ........ OK',
    '> Access granted. Welcome, Epiphany.'
];

let line = 0;
let char = 0;

function typeLine() {
    if (line >= bootLines.length) {
        finishBoot();
        return;
    }
    const current = bootLines[line];
    if (char <= current.length) {
        typingEl.textContent = current.slice(0, char);
        char++;
        setTimeout(typeLine, 28);
    } else {
        char = 0;
        line++;
        setTimeout(typeLine, 260);
    }
}

function finishBoot() {
    setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    }, 350);
}

window.addEventListener('load', () => {
    setTimeout(typeLine, 400);
    setTimeout(finishBoot, 4500);
});

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
    let index = sections.length - 1;
    while (index >= 0 && window.scrollY < sections[index].offsetTop - 120) {
        index--;
    }
    navLinks.forEach(link => link.classList.remove('active'));
    if (index >= 0) {
        const id = sections[index].getAttribute('id');
        const active = document.querySelector(`#mainNav a[href="#${id}"]`);
        if (active) active.classList.add('active');
    }
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

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ========== YEAR ==========
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
