// ========== LOADER: typing + progress ==========
const loader = document.getElementById('loader');
const typingEl = document.getElementById('typing');
const progressEl = document.querySelector('#loader .progress');

const bootLines = [
    '> Initializing system...',
    '> Loading modules ............ OK',
    '> Establishing secure link ... OK',
    '> Rendering interface ........ OK',
    '> Access granted. Welcome, Epiphany.'
];

const totalChars = bootLines.join('').length;
let line = 0;
let char = 0;
let typed = 0;

function updateProgress() {
    if (!progressEl) return;
    const pct = Math.min(100, Math.round((typed / totalChars) * 100));
    progressEl.style.width = pct + '%';
}

function typeLine() {
    if (line >= bootLines.length) {
        updateProgress();
        finishBoot();
        return;
    }
    const current = bootLines[line];
    if (char <= current.length) {
        typingEl.textContent = current.slice(0, char);
        char++;
        typed++;
        updateProgress();
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

// ========== VIEW NAVIGATION ==========
const views = document.querySelectorAll('.view');
const tiles = document.querySelectorAll('.tile');
const backBtn = document.getElementById('backBtn');
const crumb = document.getElementById('crumb');

function showView(id) {
    views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (backBtn) backBtn.classList.add('show');
    if (crumb) {
        crumb.textContent = id.replace('view-', '').toUpperCase() + ' MODULE';
    }
    if (id === 'view-home') {
        if (backBtn) backBtn.classList.remove('show');
        if (crumb) crumb.textContent = '';
    }
    animateBars();
    animateReveals();
}

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const target = tile.getAttribute('data-view');
        if (target) showView(target);
    });
});

if (backBtn) {
    backBtn.addEventListener('click', () => showView('view-home'));
}

// ========== SKILL BARS ==========
function animateBars() {
    const bars = document.querySelectorAll('.view.active .bar span');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0';
        requestAnimationFrame(() => {
            bar.style.width = width;
        });
    });
}

// ========== REVEAL ==========
function animateReveals() {
    const els = document.querySelectorAll('.view.active .card, .view.active .member, .view.active .box');
    els.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity .5s ease, transform .5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + i * 80);
    });
}

// ========== YEAR ==========
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// ========== JOIN CREW MODAL ==========
const joinCard = document.getElementById('joinCard');
const joinModal = document.getElementById('joinModal');
const joinClose = document.getElementById('joinClose');
const joinForm = document.getElementById('joinForm');
const joinMsg = document.getElementById('joinMsg');

function openJoin() {
    joinMsg.textContent = '';
    joinModal.classList.add('open');
}

function closeJoin() {
    joinModal.classList.remove('open');
}

if (joinCard && joinModal) {
    joinCard.addEventListener('click', openJoin);
    joinClose.addEventListener('click', closeJoin);
    joinModal.addEventListener('click', (e) => {
        if (e.target === joinModal) closeJoin();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeJoin();
    });

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('joinName').value;
            const email = document.getElementById('joinEmail').value;
            joinMsg.textContent = 'Request sent, ' + name + '! The crew will contact you at ' + email + '.';
            joinForm.reset();
        });
    }
}
